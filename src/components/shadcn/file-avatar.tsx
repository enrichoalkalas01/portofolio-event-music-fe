"use client";

import { CircleUserRoundIcon, XIcon, AlertCircleIcon } from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
    FileMetadata,
    FileWithPreview,
    useFileUpload,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

interface IFileAvatar {
    defaultInitialFiles?: FileMetadata[];
    onAvatarChange?: (file: FileWithPreview | null) => void;
    disabled?: boolean;
    showFileName?: boolean;
    maxFileSize?: number;
    allowedTypes?: string[];
    showErrorState?: boolean;
    classNameButton?: string;
    classNameImage?: string;
    classNameWrapper?: string;
    classNameMain?: string;
}

export default function FileAvatar({
    defaultInitialFiles = [],
    onAvatarChange,
    disabled = false,
    showFileName = false,
    maxFileSize = 4 * 1024 * 1024, // 4MB default
    allowedTypes = ["image/*"],
    showErrorState = true,
    classNameButton = "",
    classNameImage = "",
    classNameWrapper = "",
    classNameMain = "",
}: IFileAvatar) {
    // State management
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

    // Ensure defaultInitialFiles is always an array
    const safeInitialFiles = useMemo(() => {
        return Array.isArray(defaultInitialFiles) ? defaultInitialFiles : [];
    }, [defaultInitialFiles]);

    // Reset errors when initial files change
    useEffect(() => {
        setImageError(false);
        setValidationError(null);
        setCurrentUrlIndex(0);
    }, [safeInitialFiles]);

    // File validation
    const validateFile = useCallback(
        (file: File): string | null => {
            if (file.size > maxFileSize) {
                return `File size must be less than ${Math.round(
                    maxFileSize / (1024 * 1024)
                )}MB`;
            }

            if (
                allowedTypes.length > 0 &&
                !allowedTypes.some((type) => {
                    if (type === "image/*")
                        return file.type.startsWith("image/");
                    return file.type === type;
                })
            ) {
                return "Invalid file type. Please select an image file.";
            }

            return null;
        },
        [maxFileSize, allowedTypes]
    );

    // Generate URL variations for fallback (handles CORS and encoding issues)
    const generateUrlVariations = useCallback(
        (originalUrl: string): string[] => {
            if (!originalUrl) return [];

            const variations = [
                originalUrl,
                originalUrl.replace("127.0.0.1", "localhost"),
                originalUrl.replace("localhost", "127.0.0.1"),
                decodeURIComponent(originalUrl),
            ];

            return [...new Set(variations)]; // Remove duplicates
        },
        []
    );

    // Handle files change with validation
    const handleFilesChange = useCallback(
        (files: FileWithPreview[]) => {
            requestAnimationFrame(() => {
                try {
                    const filesArray = Array.isArray(files) ? files : [];
                    const firstFile = filesArray[0] || null;

                    // Validate new file uploads
                    if (firstFile && firstFile.file instanceof File) {
                        const error = validateFile(firstFile.file);
                        if (error) {
                            setValidationError(error);
                            return;
                        }
                    }

                    setValidationError(null);
                    setCurrentUrlIndex(0);
                    onAvatarChange?.(firstFile);
                } catch (error) {
                    console.error("Error in file change handler:", error);
                    setValidationError(
                        "An error occurred while processing the file"
                    );
                }
            });
        },
        [onAvatarChange, validateFile]
    );

    // Initialize file upload hook
    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
        useFileUpload({
            accept: allowedTypes.join(","),
            initialFiles: safeInitialFiles,
            onFilesChange: handleFilesChange,
        });

    // Compute file data with fallback logic
    const fileData = useMemo(() => {
        const filesArray = Array.isArray(files) ? files : [];
        const firstFile = filesArray[0];

        let previewUrl = null;
        let fileName = null;
        let fileId = null;
        let urlVariations: string[] = [];

        if (firstFile) {
            // New uploaded files with blob preview
            if (firstFile.preview) {
                previewUrl = firstFile.preview;
            }
            // Existing files with URL
            else if (
                firstFile.file &&
                typeof firstFile.file === "object" &&
                "url" in firstFile.file
            ) {
                const originalUrl = (firstFile.file as FileMetadata).url;
                urlVariations = generateUrlVariations(originalUrl);
                previewUrl = urlVariations[0];
            }

            // Get filename from File or FileMetadata
            if (firstFile.file instanceof File) {
                fileName = firstFile.file.name;
            } else if (
                firstFile.file &&
                typeof firstFile.file === "object" &&
                "name" in firstFile.file
            ) {
                fileName = (firstFile.file as FileMetadata).name;
            }

            fileId = firstFile.id;
        }
        // Fallback to initial files
        else if (safeInitialFiles.length > 0) {
            const initialFile = safeInitialFiles[0];
            urlVariations = generateUrlVariations(initialFile.url);
            previewUrl = urlVariations[0];
            fileName = initialFile.name;
            fileId = initialFile.id;
        }

        return {
            previewUrl,
            fileName,
            fileId,
            hasFile: !!(firstFile || safeInitialFiles.length > 0),
            urlVariations,
        };
    }, [files, safeInitialFiles, generateUrlVariations]);

    const { previewUrl, fileName, fileId, hasFile, urlVariations } = fileData;

    // Image loading handlers with automatic fallback
    const handleImageLoad = useCallback(() => {
        setImageError(false);
        setIsLoading(false);
    }, []);

    const handleImageError = useCallback(() => {
        // Try next URL variation if available
        if (urlVariations && currentUrlIndex < urlVariations.length - 1) {
            const nextIndex = currentUrlIndex + 1;
            setCurrentUrlIndex(nextIndex);
            setIsLoading(true);
            return;
        }

        // All variations failed
        setImageError(true);
        setIsLoading(false);
    }, [urlVariations, currentUrlIndex]);

    const handleImageLoadStart = useCallback(() => {
        setIsLoading(true);
        setImageError(false);
    }, []);

    // Get current URL to display
    const currentImageUrl = useMemo(() => {
        if (!urlVariations || urlVariations.length === 0) return previewUrl;
        return urlVariations[currentUrlIndex] || previewUrl;
    }, [urlVariations, currentUrlIndex, previewUrl]);

    // User interaction handlers
    const handleRemoveClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (fileId && !disabled) {
                setValidationError(null);
                setImageError(false);
                setCurrentUrlIndex(0);
                removeFile(fileId);
            }
        },
        [fileId, disabled, removeFile]
    );

    const handleUploadClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (!disabled) {
                setValidationError(null);
                openFileDialog();
            }
        },
        [disabled, openFileDialog]
    );

    // Computed states
    const hasError = imageError || !!validationError;
    const showRemoveButton =
        currentImageUrl && fileId && !disabled && !imageError;

    return (
        <div className="w-auto flex flex-col items-start gap-2">
            {/* Avatar Button */}
            <div
                className={cn("w-full relative inline-flex", classNameWrapper)}
            >
                <Button
                    type="button"
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        `relative size-16 overflow-hidden p-0 shadow-none transition-all ${
                            disabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:opacity-80"
                        } ${
                            hasError && showErrorState
                                ? "border-destructive border-2"
                                : ""
                        }`,
                        classNameButton
                    )}
                    onClick={handleUploadClick}
                    aria-label={
                        currentImageUrl ? "Change image" : "Upload image"
                    }
                >
                    {currentImageUrl && !imageError ? (
                        <>
                            {/* Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                </div>
                            )}
                            {/* Image */}
                            <img
                                className={cn(
                                    "size-full object-cover",
                                    classNameImage
                                )}
                                src={currentImageUrl}
                                alt="Preview of uploaded image"
                                width={64}
                                height={64}
                                style={{ objectFit: "cover" }}
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                onLoadStart={handleImageLoadStart}
                                crossOrigin="anonymous"
                            />
                        </>
                    ) : (
                        /* Placeholder Icon */
                        (<div
                            aria-hidden="true"
                            className="flex items-center justify-center size-full"
                        >
                            {hasError && showErrorState ? (
                                <AlertCircleIcon className="size-4 text-destructive" />
                            ) : (
                                <CircleUserRoundIcon className="size-4 opacity-60" />
                            )}
                        </div>)
                    )}
                </Button>

                {/* Remove Button */}
                {showRemoveButton && (
                    <Button
                        type="button"
                        onClick={handleRemoveClick}
                        size="icon"
                        variant="destructive"
                        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none hover:scale-110 transition-transform"
                        aria-label="Remove image"
                    >
                        <XIcon className="size-3.5" />
                    </Button>
                )}

                {/* Hidden File Input */}
                <input
                    {...getInputProps()}
                    className={cn("sr-only", classNameImage)}
                    aria-label="Upload image file"
                    tabIndex={-1}
                    disabled={disabled}
                />
            </div>
            {/* Filename Display */}
            {showFileName && fileName && (
                <p className="text-muted-foreground text-xs truncate max-w-20">
                    {fileName}
                </p>
            )}
            {/* Error Messages */}
            {validationError && showErrorState && (
                <p className="text-destructive text-xs max-w-20 break-words">
                    {validationError}
                </p>
            )}
            {imageError && showErrorState && (
                <p className="text-destructive text-xs">Failed to load image</p>
            )}
            {/* Upload Hints */}
            {!hasFile && !disabled && (
                <div className="text-xs space-y-1">
                    <p className="text-muted-foreground">Click to upload</p>
                    <p className="text-muted-foreground opacity-70">
                        Max {Math.round(maxFileSize / (1024 * 1024))}MB
                    </p>
                </div>
            )}
        </div>
    );
}
