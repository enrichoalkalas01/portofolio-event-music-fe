"use client";

// Library
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";

// Components Pages
import { LoadingComponent } from "@/components/generals/loading/loading";

// Icons
import {
    Image as ImageIcon,
    FileImage,
    FileText,
    File,
    MoreVertical,
} from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseImageUrl = "https://files.swarnatactical.com/tester-upload/";

interface IShowFilesItem {
    readonly file: any;
    readonly tootlgeStatus?: boolean;
    readonly checkBoxStatus?: boolean;
    readonly fullMetaData?: boolean;
    readonly onChangeSelected?: (e: any) => void;
    readonly typeCheckbox?: "multiple" | "single";
}

export default function ShowFilesItem({
    file,
    tootlgeStatus = false,
    checkBoxStatus = false,
    fullMetaData = false,
    onChangeSelected = (e: any) => {},
}: IShowFilesItem) {
    const queryClient = useQueryClient();

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isDisableToogle, setIsDisableToogle] = useState<boolean>(false);

    useEffect(() => {
        onChangeSelected({
            status: isSelected,
            file: file,
        });
    }, [isSelected]);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 B";

        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const FileIcon = ({ type }: { type: string }) => {
        if (type?.includes("image")) return <FileImage size={40} />;
        else if (type?.includes("text")) return <FileText size={40} />;
        else return <File size={40} />;
    };

    const handleDeleteClick = async () => {
        setIsDisableToogle(true);
        try {
            let config = {
                url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/files`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer `,
                },
            };

            // const deleteData = await axios(config);
            // queryClient.invalidateQueries({ queryKey: ["files-admin"] });
            setIsDisableToogle(false);
            // toast.success(deleteData.data.message, { position: "top-right" });
        } catch (error: any) {
            console.log(error);
            setIsDisableToogle(false);
            toast.error(error?.response?.data?.message, {
                position: "top-right",
            });
        }
    };

    const handleDropdownTriggerClick = () => {};
    const handleCheckboxClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div
            className={cn(
                "flex flex-col gap-y-2 bg-white rounded-lg border p-2",
                "hover:shadow-md transition-all relative animate-scale-in",
                isSelected ? "ring-2 ring-primary/50" : ""
            )}
            // onClick={handleClick}
        >
            {checkBoxStatus && (
                <div
                    className="absolute top-2 left-2 z-10 bg-white shadow-md flex p-1 rounded-md"
                    onClick={handleCheckboxClick}
                >
                    <Checkbox checked={isSelected} />
                </div>
            )}

            {tootlgeStatus && (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        onClick={handleDropdownTriggerClick}
                        className="bg-white shadow-md"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 absolute top-1 right-1"
                            disabled={isDisableToogle}
                        >
                            {!isDisableToogle ? (
                                <MoreVertical className="h-4 w-4" />
                            ) : (
                                <LoadingComponent type="icon" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={handleDeleteClick}
                            className="text-red-400 cursor-pointer text-xs"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            <div className="flex flex-col items-center">
                {(file?.name || file?.metadata?.object_name) && (
                    <div className="w-full bg-gray-100">
                        <Image
                            width={1280}
                            height={1280}
                            // layout="intrinsic"
                            // layout="responsive"
                            objectFit=""
                            className="w-full h-auto max-h-40 rounded-md object-contain" // Menyesuaikan tinggi dengan konten
                            src={
                                file?.name
                                    ? `${
                                          baseImageUrl +
                                          (file?.name ||
                                              file?.metadata?.object_name)
                                      }`
                                    : ""
                            }
                            alt=""
                            unoptimized={true}
                            crossOrigin="anonymous"
                        />
                    </div>
                )}

                {!file?.metadata?.url_image && (
                    <FileIcon type={file?.contentType} />
                )}
            </div>

            <div className="mt-auto break-words">
                <p className="font-medium truncate text-center text-sm">
                    {file?.name}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                    {formatFileSize(file?.size)}
                </p>

                {fullMetaData && (
                    <div className="py-2 max-w-full w-full break-words overflow-hidden text-ellipsis text-center text-xs">
                        <span>
                            {process.env.NEXT_PUBLIC_API_BASE_URL +
                                file?.metadata?.url_proxy?.replace(
                                    "/api/v1",
                                    ""
                                )}
                        </span>
                    </div>
                )}

                {file?.updated && (
                    <p className="text-xs text-muted-foreground text-center mt-0.5">
                        {formatDistanceToNow(new Date(file?.updated), {
                            addSuffix: true,
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}
