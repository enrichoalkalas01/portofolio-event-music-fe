"use client";

import { useCallback, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import {
    FileMetadata,
    FileWithPreview,
    useFileUpload,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/shadcn/ui/button";
import {
    ImageIcon,
    XIcon,
    StarIcon,
    UploadIcon,
    GripVerticalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ExtendedFileMetadata extends FileMetadata {
    file?: File;
    isPrimary?: boolean;
    order?: number;
}

type FlexibleFileType =
    | File[]
    | ExtendedFileMetadata[]
    | FileWithPreview[]
    | (File | ExtendedFileMetadata)[]
    | null;

interface IFormRegularMultipleImageUpload {
    form: UseFormReturn<any>;
    name?: string;
    labelName?: string;
    description?: string;
    isDisable?: boolean;
    onChangesFiles?: (files: FlexibleFileType) => void;
    maxFiles?: number;
    maxFileSize?: number;
    allowedTypes?: string[];
    showErrorState?: boolean;
    gridCols?: number;
    imageAspectRatio?: "square" | "landscape" | "portrait";
    showPrimarySelector?: boolean;
    enableReordering?: boolean;
    showFileNames?: boolean;
    showImageCount?: boolean;
    emptyStateText?: string;
    uploadButtonText?: string;
    propsFormItem?: Record<string, any>;
    propsFormLabel?: Record<string, any>;
    propsFormControl?: Record<string, any>;
    propsFormDescription?: Record<string, any>;
    propsFormMessage?: Record<string, any>;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FormRegularMultipleImageUpload({
    form,
    name = "images",
    labelName,
    description,
    isDisable = false,
    onChangesFiles,
    maxFiles = 10,
    maxFileSize = 4 * 1024 * 1024,
    allowedTypes = ["image/*"],
    showErrorState = true,
    gridCols = 4,
    imageAspectRatio = "square",
    showPrimarySelector = true,
    enableReordering = true,
    showFileNames = false,
    showImageCount = true,
    emptyStateText,
    uploadButtonText,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
}: IFormRegularMultipleImageUpload) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // ========================================================================
    // UTILITIES
    // ========================================================================

    const isFileMetadata = useCallback(
        (value: any): value is ExtendedFileMetadata => {
            return (
                value &&
                typeof value === "object" &&
                typeof value.id === "string" &&
                typeof value.name === "string" &&
                typeof value.size === "number" &&
                typeof value.type === "string" &&
                typeof value.url === "string"
            );
        },
        []
    );

    const convertToFileMetadata = useCallback(
        (fieldValue: any): ExtendedFileMetadata[] => {
            if (!fieldValue) return [];

            if (Array.isArray(fieldValue)) {
                return fieldValue
                    .map((item, index) => {
                        if (isFileMetadata(item)) {
                            return { ...item, order: item.order ?? index };
                        } else if (item instanceof File) {
                            return {
                                id: `file-${Date.now()}-${index}-${Math.random()
                                    .toString(36)
                                    .substr(2, 9)}`,
                                name: item.name,
                                size: item.size,
                                type: item.type,
                                url: URL.createObjectURL(item),
                                file: item,
                                order: index,
                                isPrimary: index === 0,
                            };
                        } else if (
                            item &&
                            typeof item === "object" &&
                            item.file
                        ) {
                            if (item.file instanceof File) {
                                return {
                                    id:
                                        item.id ||
                                        `file-${Date.now()}-${index}`,
                                    name: item.file.name,
                                    size: item.file.size,
                                    type: item.file.type,
                                    url:
                                        item.preview ||
                                        URL.createObjectURL(item.file),
                                    file: item.file,
                                    order: index,
                                    isPrimary: index === 0,
                                };
                            } else if (isFileMetadata(item.file)) {
                                return { ...item.file, order: index };
                            }
                        }
                        return null;
                    })
                    .filter(Boolean) as ExtendedFileMetadata[];
            }

            if (isFileMetadata(fieldValue)) {
                return [{ ...fieldValue, order: 0 }];
            }

            if (fieldValue instanceof File) {
                return [
                    {
                        id: `file-${Date.now()}`,
                        name: fieldValue.name,
                        size: fieldValue.size,
                        type: fieldValue.type,
                        url: URL.createObjectURL(fieldValue),
                        file: fieldValue,
                        order: 0,
                        isPrimary: true,
                    },
                ];
            }

            return [];
        },
        [isFileMetadata]
    );

    const validateFiles = useCallback(
        (files: FileWithPreview[]): string[] => {
            const errors: string[] = [];

            if (files.length > maxFiles) {
                errors.push(`Maximum ${maxFiles} images allowed`);
            }

            files.forEach((fileData, index) => {
                if (fileData.file instanceof File) {
                    if (fileData.file.size > maxFileSize) {
                        errors.push(
                            `Image ${
                                index + 1
                            }: File size must be less than ${Math.round(
                                maxFileSize / (1024 * 1024)
                            )}MB`
                        );
                    }

                    if (
                        allowedTypes.length > 0 &&
                        !allowedTypes.some((type) => {
                            if (type === "image/*") {
                                return fileData.file.type.startsWith("image/");
                            }
                            return fileData.file.type === type;
                        })
                    ) {
                        errors.push(`Image ${index + 1}: Invalid file type`);
                    }
                }
            });

            return errors;
        },
        [maxFiles, maxFileSize, allowedTypes]
    );

    // ========================================================================
    // STYLING
    // ========================================================================

    const aspectRatioClasses = {
        square: "aspect-square",
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
    };

    const gridColsClasses = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
    };

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                const handleFilesChange = useCallback(
                    (files: FileWithPreview[]) => {
                        setTimeout(() => {
                            try {
                                const errors = validateFiles(files);
                                setValidationErrors(errors);

                                if (errors.length > 0) return;

                                const filesData = files
                                    .map((fileData, index) => {
                                        if (fileData.file instanceof File) {
                                            return {
                                                id: fileData.id,
                                                name: fileData.file.name,
                                                size: fileData.file.size,
                                                type: fileData.file.type,
                                                url:
                                                    fileData.preview ||
                                                    URL.createObjectURL(
                                                        fileData.file
                                                    ),
                                                file: fileData.file,
                                                order: index,
                                                isPrimary: index === 0,
                                            } as ExtendedFileMetadata;
                                        } else if (
                                            isFileMetadata(fileData.file)
                                        ) {
                                            return {
                                                ...fileData.file,
                                                order: index,
                                            } as ExtendedFileMetadata;
                                        }
                                        return null;
                                    })
                                    .filter(Boolean) as ExtendedFileMetadata[];

                                field.onChange(filesData);
                                onChangesFiles?.(filesData);
                            } catch (error) {
                                console.error("Error handling files:", error);
                                setValidationErrors(["Error processing files"]);
                            }
                        }, 0);
                    },
                    [
                        field.onChange,
                        onChangesFiles,
                        validateFiles,
                        isFileMetadata,
                    ]
                );

                const initialFiles = useMemo(() => {
                    return convertToFileMetadata(field.value);
                }, [field.value, convertToFileMetadata]);

                const [
                    { files },
                    { removeFile, openFileDialog, getInputProps },
                ] = useFileUpload({
                    accept: allowedTypes.join(","),
                    multiple: true,
                    maxFiles,
                    initialFiles,
                    onFilesChange: handleFilesChange,
                });

                const handleSetPrimary = useCallback(
                    (targetId: string) => {
                        if (isDisable) return;

                        const currentFiles = convertToFileMetadata(field.value);
                        const updatedFiles = currentFiles.map((file) => ({
                            ...file,
                            isPrimary: file.id === targetId,
                        }));

                        field.onChange(updatedFiles);
                        onChangesFiles?.(updatedFiles);
                    },
                    [
                        field.onChange,
                        onChangesFiles,
                        convertToFileMetadata,
                        isDisable,
                    ]
                );

                const handleDragStart = useCallback(
                    (index: number) => {
                        if (!enableReordering || isDisable) return;
                        setDraggedIndex(index);
                    },
                    [enableReordering, isDisable]
                );

                const handleDrop = useCallback(
                    (e: React.DragEvent, dropIndex: number) => {
                        e.preventDefault();
                        if (
                            draggedIndex === null ||
                            !enableReordering ||
                            isDisable
                        )
                            return;

                        const currentFiles = convertToFileMetadata(field.value);
                        const reorderedFiles = [...currentFiles];
                        const draggedFile = reorderedFiles[draggedIndex];

                        reorderedFiles.splice(draggedIndex, 1);
                        reorderedFiles.splice(dropIndex, 0, draggedFile);

                        const finalFiles = reorderedFiles.map(
                            (file, index) => ({
                                ...file,
                                order: index,
                            })
                        );

                        field.onChange(finalFiles);
                        onChangesFiles?.(finalFiles);
                        setDraggedIndex(null);
                    },
                    [
                        draggedIndex,
                        field.onChange,
                        onChangesFiles,
                        convertToFileMetadata,
                        enableReordering,
                        isDisable,
                    ]
                );

                const currentFiles = Array.isArray(files) ? files : [];
                const currentImagesCount = initialFiles.length;

                return (
                    <FormItem {...propsFormItem}>
                        {labelName && (
                            <FormLabel {...propsFormLabel}>
                                {labelName}
                                {showImageCount && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({currentImagesCount}/{maxFiles})
                                    </span>
                                )}
                            </FormLabel>
                        )}

                        <FormControl {...propsFormControl}>
                            <div className="space-y-4">
                                {/* Upload Area */}
                                <div
                                    className={cn(
                                        "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                                        isDisable
                                            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                            : "border-gray-300 hover:border-gray-400 cursor-pointer"
                                    )}
                                    onClick={
                                        !isDisable ? openFileDialog : undefined
                                    }
                                >
                                    <UploadIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                        {isDisable
                                            ? "View mode - upload disabled"
                                            : emptyStateText ||
                                              `${
                                                  uploadButtonText ||
                                                  "Click to upload images"
                                              } (max ${maxFiles})`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max{" "}
                                        {Math.round(
                                            maxFileSize / (1024 * 1024)
                                        )}
                                        MB per image
                                    </p>
                                </div>

                                {/* Images Grid */}
                                {currentFiles.length > 0 && (
                                    <div
                                        className={cn(
                                            "grid gap-4",
                                            gridColsClasses[
                                                gridCols as keyof typeof gridColsClasses
                                            ] || "grid-cols-4"
                                        )}
                                    >
                                        {currentFiles.map((fileData, index) => {
                                            const metadata =
                                                fileData.file as ExtendedFileMetadata;
                                            const imageUrl =
                                                fileData.preview ||
                                                metadata?.url;
                                            const isPrimary =
                                                metadata?.isPrimary;
                                            const fileName =
                                                metadata?.name ||
                                                fileData.file?.name;

                                            return (
                                                <div
                                                    key={fileData.id}
                                                    className={cn(
                                                        "relative group border rounded-lg overflow-hidden transition-all",
                                                        aspectRatioClasses[
                                                            imageAspectRatio
                                                        ],
                                                        isPrimary &&
                                                            "ring-2 ring-blue-500",
                                                        enableReordering &&
                                                            !isDisable &&
                                                            "cursor-move"
                                                    )}
                                                    draggable={
                                                        enableReordering &&
                                                        !isDisable
                                                    }
                                                    onDragStart={() =>
                                                        handleDragStart(index)
                                                    }
                                                    onDragOver={(e) =>
                                                        e.preventDefault()
                                                    }
                                                    onDrop={(e) =>
                                                        handleDrop(e, index)
                                                    }
                                                >
                                                    {imageUrl ? (
                                                        <img
                                                            crossOrigin="anonymous"
                                                            src={imageUrl}
                                                            alt={
                                                                fileName ||
                                                                `Image ${
                                                                    index + 1
                                                                }`
                                                            }
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <ImageIcon className="h-8 w-8 text-gray-400" />
                                                        </div>
                                                    )}

                                                    {/* Controls Overlay */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
                                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {showPrimarySelector &&
                                                                !isPrimary &&
                                                                !isDisable && (
                                                                    <Button
                                                                        type="button"
                                                                        size="icon"
                                                                        variant="secondary"
                                                                        className="h-6 w-6"
                                                                        onClick={() =>
                                                                            handleSetPrimary(
                                                                                fileData.id
                                                                            )
                                                                        }
                                                                        title="Set as primary"
                                                                    >
                                                                        <StarIcon className="h-3 w-3" />
                                                                    </Button>
                                                                )}

                                                            {!isDisable && (
                                                                <Button
                                                                    type="button"
                                                                    size="icon"
                                                                    variant="destructive"
                                                                    className="h-6 w-6"
                                                                    onClick={() =>
                                                                        removeFile(
                                                                            fileData.id
                                                                        )
                                                                    }
                                                                    title="Remove image"
                                                                >
                                                                    <XIcon className="h-3 w-3" />
                                                                </Button>
                                                            )}
                                                        </div>

                                                        {enableReordering &&
                                                            !isDisable && (
                                                                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <GripVerticalIcon className="h-4 w-4 text-white" />
                                                                </div>
                                                            )}

                                                        {isPrimary && (
                                                            <div className="absolute top-2 left-2">
                                                                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                                    Primary
                                                                </div>
                                                            </div>
                                                        )}

                                                        {showFileNames &&
                                                            fileName && (
                                                                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded max-w-24 truncate">
                                                                        {
                                                                            fileName
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <input
                                    {...getInputProps()}
                                    className="sr-only"
                                    disabled={isDisable}
                                />
                            </div>
                        </FormControl>

                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
                        )}

                        {validationErrors.length > 0 && showErrorState && (
                            <div className="space-y-1">
                                {validationErrors.map((error, index) => (
                                    <p
                                        key={index}
                                        className="text-sm text-destructive"
                                    >
                                        {error}
                                    </p>
                                ))}
                            </div>
                        )}

                        {fieldState.error && (
                            <FormMessage {...propsFormMessage}>
                                {fieldState.error.message}
                            </FormMessage>
                        )}
                    </FormItem>
                );
            }}
        />
    );
}
