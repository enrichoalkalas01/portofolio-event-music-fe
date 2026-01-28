"use client";

import { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import FileAvatar from "@/components/shadcn/file-avatar";
import { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload";

// Extended FileMetadata interface that allows file property
interface ExtendedFileMetadata extends FileMetadata {
    file?: File;
}

// Union type for file handling
type AvatarFileType = File | ExtendedFileMetadata | null;

interface IFormRegularFileAvatar {
    form: UseFormReturn<any>;
    name?: string;
    labelName?: string;
    description?: string;
    isDisable?: boolean;
    onChangesFiles?: (file: AvatarFileType) => void;
    showFileName?: boolean;
    maxFileSize?: number;
    allowedTypes?: string[];
    showErrorState?: boolean;
    propsFormItem?: { [key: string]: any };
    propsFormLabel?: { [key: string]: any };
    propsFormControl?: { [key: string]: any };
    propsFormDescription?: { [key: string]: any };
    propsFormMessage?: { [key: string]: any };
    propsAvatar?: { [key: string]: any };
}

export function FormRegularFileAvatar({
    form,
    name = "avatar",
    labelName,
    description,
    isDisable = false,
    onChangesFiles,
    showFileName = false,
    maxFileSize = 4 * 1024 * 1024,
    allowedTypes = ["image/*"],
    showErrorState = true,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
    propsAvatar = {},
}: IFormRegularFileAvatar) {
    // Type guard for FileMetadata
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

    // Convert form field value to FileMetadata array for FileAvatar component
    const convertToFileMetadata = useCallback(
        (fieldValue: any): ExtendedFileMetadata[] => {
            if (!fieldValue) return [];

            // Handle array of FileMetadata objects
            if (Array.isArray(fieldValue)) {
                return fieldValue.filter(isFileMetadata);
            }

            // Handle single FileMetadata object (existing avatar from server)
            if (isFileMetadata(fieldValue)) {
                return [fieldValue];
            }

            // Handle File object (new upload) - convert to FileMetadata
            if (fieldValue instanceof File) {
                const metadata: ExtendedFileMetadata = {
                    id: `file-${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                    name: fieldValue.name,
                    size: fieldValue.size,
                    type: fieldValue.type,
                    url: URL.createObjectURL(fieldValue),
                    file: fieldValue, // Keep reference to original file
                };
                return [metadata];
            }

            return [];
        },
        [isFileMetadata]
    );

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                // Handle avatar change with proper type handling
                const handleAvatarChange = useCallback(
                    (fileData: FileWithPreview | null) => {
                        // Defer state update to prevent setState during render
                        setTimeout(() => {
                            try {
                                if (fileData?.file) {
                                    let fileToSet: AvatarFileType = null;

                                    if (fileData.file instanceof File) {
                                        // New file upload
                                        fileToSet = fileData.file;
                                    } else if (isFileMetadata(fileData.file)) {
                                        // Existing file metadata
                                        fileToSet =
                                            fileData.file as ExtendedFileMetadata;
                                    }

                                    field.onChange(fileToSet);
                                    onChangesFiles?.(fileToSet);
                                } else {
                                    field.onChange(null);
                                    onChangesFiles?.(null);
                                }
                            } catch (error) {
                                console.error(
                                    "Error handling avatar change:",
                                    error
                                );
                            }
                        }, 0);
                    },
                    [field.onChange, onChangesFiles, isFileMetadata]
                );

                // Convert field value to FileMetadata array for FileAvatar
                const initialFiles = useMemo(() => {
                    return convertToFileMetadata(field.value);
                }, [field.value, convertToFileMetadata]);

                return (
                    <FormItem {...propsFormItem}>
                        {labelName && (
                            <FormLabel {...propsFormLabel}>
                                {labelName}
                            </FormLabel>
                        )}
                        <FormControl {...propsFormControl}>
                            <FileAvatar
                                {...propsAvatar}
                                defaultInitialFiles={initialFiles}
                                onAvatarChange={handleAvatarChange}
                                disabled={isDisable}
                                showFileName={showFileName}
                                maxFileSize={maxFileSize}
                                allowedTypes={allowedTypes}
                                showErrorState={showErrorState}
                            />
                        </FormControl>
                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
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
