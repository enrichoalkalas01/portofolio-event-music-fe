"use client";
import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import Image from "next/image";
import lodash from "lodash";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import { CloudUpload, Paperclip } from "lucide-react";
import { AddonsProgressBar } from "../addons/addons-progress-bar";
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/shadcn/ui/file-upload";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Progress } from "@/components/shadcn/ui/progress";

const formSchema = z.object({
    name_3294368034: z.string(),
});

interface IFormRegularFileInput {
    readonly form: UseFormReturn<any>;
    readonly defaultFiles?: File[] | any[];
    readonly isClearFiles?: boolean;
    readonly isDisable?: boolean;
    readonly description?: string;
    readonly width?: string;
    readonly height?: string;
    readonly name?: string | undefined;
    readonly labelName?: string;
    readonly propsMessage?: { [key: string]: any };
    readonly propsFormItem?: { [key: string]: any };
    readonly propsFormControl?: { [key: string]: any };
    readonly propsFormLabel?: { [key: string]: any };
    readonly propsFormDescription?: { [key: string]: any };
    readonly propsFormMessage?: { [key: string]: any };
    readonly propsFileUploader?: { [key: string]: any };
    readonly propsFileInput?: { [key: string]: any };
    readonly propsFileUploaderContent?: {
        [key: string]: any;
        type?: "image" | "text";
    };
    readonly onChangesFiles?: (e: any) => void;
}

export function FormRegularFileMultipleInput({
    form,
    defaultFiles = [],
    isClearFiles = false,
    isDisable = false,
    name = "file-input",
    labelName = "Select File",
    description = "Select a file to upload.",
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
    propsFileUploader = {},
    propsFileInput = {},
    propsFileUploaderContent = { type: "image" },
    onChangesFiles = (e: any) => {},
}: IFormRegularFileInput) {
    const [files, setFiles] = useState<File[] | null>(null);

    // Set default values files
    useEffect(() => {
        if (
            !lodash.isEqual(defaultFiles, files) &&
            defaultFiles?.length > 0 &&
            !isClearFiles
        ) {
            setFiles(defaultFiles);
        }
    }, [defaultFiles]);

    // Set clear files
    useEffect(() => {
        if (files && files?.length > 0 && isClearFiles) {
            setFiles([]);
        }
    }, [isClearFiles]);

    // Setting Upload Files
    const dropZoneConfig = {
        maxFiles: 50,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };

    // Watcher for state changes and set into forms
    useEffect(() => {
        if (!lodash.isEqual(files, form.getValues(name))) {
            form.setValue(name, files);
            onChangesFiles(files);
        }
    }, [files]);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({
                field,
                formState,
                fieldState,
            }: {
                field: any;
                formState: any;
                fieldState: any;
            }) => {
                return (
                    <FormItem {...propsFormItem}>
                        <FormLabel {...propsFormLabel}>{labelName}</FormLabel>
                        <FormControl {...propsFormControl}>
                            <FileUploader
                                aria-disabled={isDisable}
                                value={propsFileUploader.files || files}
                                onValueChange={
                                    propsFileUploader.onValueChange || setFiles
                                }
                                dropzoneOptions={
                                    propsFileUploader.dropZoneConfig ||
                                    dropZoneConfig
                                }
                                className={cn(
                                    "relative bg-background rounded-lg p-2",
                                    propsFileUploader.className
                                )}
                                {...propsFileUploader}
                            >
                                <FileInput
                                    id={propsFileInput.id || "fileInput"}
                                    className={cn(
                                        "outline-dashed outline-1 outline-slate-500",
                                        propsFileInput.className
                                    )}
                                    {...propsFileInput}
                                    aria-disabled={isDisable}
                                    propsInput={{ disabled: isDisable }}
                                >
                                    <div className="flex items-center text-center justify-center flex-col p-8 w-full">
                                        <CloudUpload className="text-gray-500 w-10 h-10" />
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>
                                            &nbsp; or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF
                                        </p>
                                    </div>
                                </FileInput>
                                <FileUploaderContent
                                    {...propsFileUploaderContent}
                                >
                                    {files &&
                                        files.length > 0 &&
                                        files.map((file: any, i, arr) => {
                                            return (
                                                <FileUploaderItem
                                                    propsButton={{
                                                        disabled: isDisable,
                                                    }}
                                                    key={i}
                                                    index={i}
                                                    className={cn(
                                                        i !== arr.length - 1
                                                            ? "mb-6"
                                                            : "",
                                                        i === 0 ? "mt-1" : ""
                                                    )}
                                                >
                                                    <div className="w-full flex flex-col gap-4 gap-y-2">
                                                        <div className="w-full flex gap-4 items-center">
                                                            {propsFileUploaderContent.type ===
                                                                "text" && (
                                                                <Paperclip
                                                                    className="h-4 w-4 stroke-current"
                                                                    aria-disabled={
                                                                        isDisable
                                                                    }
                                                                />
                                                            )}

                                                            {propsFileUploaderContent.type ===
                                                                "image" && (
                                                                <Avatar className="bg-slate-400 rounded-sm w-7 h-7">
                                                                    <AvatarImage
                                                                        src={`${URL.createObjectURL(
                                                                            file
                                                                        )}`}
                                                                        alt="swarna-upload-files"
                                                                    />
                                                                    <AvatarFallback>
                                                                        ?
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            )}

                                                            <span>
                                                                {file.name}
                                                            </span>
                                                        </div>
                                                        {/* <div className="w-full">
                                                                <Progress
                                                                    value={90}
                                                                    className="w-full"
                                                                />
                                                            </div> */}
                                                    </div>
                                                </FileUploaderItem>
                                            );
                                        })}
                                </FileUploaderContent>
                            </FileUploader>
                        </FormControl>
                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage {...propsFormMessage} />
                    </FormItem>
                );
            }}
        />
    );
}

export function FormRegularFileInput({
    form,
    name = "file-input",
    labelName = "Select File",
    description = "Select a file to upload.",
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
    propsFileUploader = {},
    propsFileInput = {},
    propsFileUploaderContent = { type: "image" },
    width = "full",
    height = "auto",
}: IFormRegularFileInput) {
    const [files, setFiles] = useState<File[] | null>(null);

    const dropZoneConfig = {
        maxFiles: 1,
        maxSize: 1024 * 1024 * 4,
        multiple: false,
    };

    useEffect(() => {
        if (!lodash.isEqual(files, form.getValues(name))) {
            form.setValue(name, files);
        }
    }, [files]);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({
                field,
                formState,
                fieldState,
            }: {
                field: any;
                formState: any;
                fieldState: any;
            }) => {
                return (
                    <FormItem {...propsFormItem}>
                        <FormLabel {...propsFormLabel}>{labelName}</FormLabel>
                        <FormControl {...propsFormControl}>
                            <FileUploader
                                value={propsFileUploader.files || files}
                                onValueChange={
                                    propsFileUploader.onValueChange || setFiles
                                }
                                dropzoneOptions={
                                    propsFileUploader.dropZoneConfig ||
                                    dropZoneConfig
                                }
                                className={cn(
                                    "relative bg-background rounded-lg outline-dashed outline-1 outline-slate-500 p-1 flex items-center",
                                    width ? `w-[${width}]` : "w-full",
                                    height !== "auto"
                                        ? `h-[${height}]`
                                        : height === "auto"
                                        ? "h-[200px]"
                                        : "h-full",
                                    propsFileUploader.className
                                )}
                                {...propsFileUploader}
                            >
                                {!files || files?.length === 0 ? (
                                    <FileInput
                                        id={propsFileInput.id || "fileInput"}
                                        className={cn(
                                            propsFileInput.className,
                                            "h-full"
                                        )}
                                        {...propsFileInput}
                                    >
                                        <div className="flex items-center text-center justify-center flex-col p-2 w-full h-full">
                                            <CloudUpload className="text-gray-500 w-10 h-10" />
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>
                                                &nbsp; or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF
                                            </p>
                                        </div>
                                    </FileInput>
                                ) : (
                                    ""
                                )}

                                {files && files?.length > 0 && (
                                    <div className="flex h-full w-full h-auto px-1 py-2">
                                        <FileUploaderContent
                                            {...propsFileUploaderContent}
                                            className="h-full"
                                        >
                                            {files.map((file: any, i, arr) => {
                                                return (
                                                    <FileUploaderItem
                                                        key={i}
                                                        index={i}
                                                        className={cn("h-full")}
                                                    >
                                                        {propsFileUploaderContent.type ===
                                                            "text" && (
                                                            <>
                                                                <Paperclip className="h-4 w-4 stroke-current" />
                                                                <span>
                                                                    {file.name}
                                                                </span>
                                                            </>
                                                        )}

                                                        {propsFileUploaderContent.type ===
                                                            "image" && (
                                                            <div
                                                                className="w-full h-full bg-center bg-no-repeat bg-cover bg-gray-100 rounded-md"
                                                                style={{
                                                                    backgroundImage: `url('${URL.createObjectURL(
                                                                        file
                                                                    )}')`,
                                                                }}
                                                            ></div>
                                                        )}
                                                    </FileUploaderItem>
                                                );
                                            })}
                                        </FileUploaderContent>
                                    </div>
                                )}
                            </FileUploader>
                        </FormControl>
                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage {...propsFormMessage} />
                    </FormItem>
                );
            }}
        />
    );
}
