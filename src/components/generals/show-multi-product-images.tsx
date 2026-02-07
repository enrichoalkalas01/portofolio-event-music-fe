"use client";

import { UseFormReturn } from "react-hook-form";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import ShowFilesComponent from "./files/show-files-component";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { fetcher } from "@/lib/fetcher";
import { Search, X } from "lucide-react";
import Image from "next/image";
import SelectSimple from "@/components/generals/select/select-simple";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";

interface IShowMultiProductImages {
    readonly form: UseFormReturn<any>;
    readonly title?: string;
    readonly isDisable?: boolean;
    readonly fieldName?: string; // field name di form untuk store images
    readonly maxSelection?: number; // max images yang bisa dipilih
    readonly baseImageUrl?: string; // base URL untuk construct image URL dari name
}

// Helper function untuk normalize image value
const normalizeImageValue = (
    value: string | object,
    baseImageUrl: string,
): {
    id: string;
    name: string;
    url: string;
    size?: number;
    contentType?: string;
} => {
    // Jika value adalah string (name only)
    if (typeof value === "string") {
        return {
            id: value,
            name: value,
            url: `${baseImageUrl}/${value}`,
        };
    }

    // Jika value adalah object
    const imgObj = value as any;
    return {
        id: imgObj?.id || imgObj?.name,
        name: imgObj?.name,
        url: imgObj?.url || `${baseImageUrl}/${imgObj?.name}`,
        size: imgObj?.size,
        contentType: imgObj?.contentType,
    };
};

const baseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function ShowMultiProductImages({
    form,
    title = "Product Images",
    isDisable = false,
    fieldName = "productImages",
    maxSelection = 10,
    baseImageUrl = baseUrlImage, // default base URL
}: IShowMultiProductImages) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const queryClient = useQueryClient();

    // Query untuk fetch files/images
    const { data, error, isLoading, isFetching }: any = useQuery<any>({
        queryKey: ["files-admin", search, page, size],
        queryFn: async () => {
            try {
                const response = await fetcher<any>(
                    `${process.env.NEXT_PUBLIC_URL_API}/images?size=${size}&page=${page}&search=${search}`,
                );

                const totalData = (response.data as { total: number }).total;
                setTotalPages(Math.ceil(totalData / size));
                return response;
            } catch (error) {
                console.error("Error fetching images:", error);
                toast.error("Failed to load images");
                throw error;
            }
        },
        // select: (e) => {
        //     let mappedData = [];
        //     for (let i in e?.data) {
        //         mappedData.push({
        //             contentType: e?.data[i]?.metadata?.content_type,
        //             id: e?.data[i]?._id || e?.data[i]?.id,
        //             name: e?.data[i]?.name || e?.data[i]?.metadata?.object_name,
        //             size: e?.data[i]?.size || e?.data[i]?.metadata?.size,
        //             url: e?.data[i]?.name || e?.data[i]?.metadata?.object_name,
        //             full: e?.data[i],
        //         });
        //     }

        //     return mappedData;
        // },
    });

    // Get current form value untuk check selected images
    const currentFormValue = form.watch(fieldName) || [];

    // Normalized images - handle both string and object values
    const normalizedImages = useMemo(() => {
        if (!currentFormValue || !Array.isArray(currentFormValue)) {
            return [];
        }

        return currentFormValue.map((img: string | object) =>
            normalizeImageValue(img, baseImageUrl),
        );
    }, [currentFormValue, baseImageUrl]);

    // Handle search input
    const handleSearch = useCallback((value: string) => {
        setSearchInput(value);
        setPage(1); // reset ke page 1 saat search
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Handle selection dari ShowFilesComponent
    const handleSelectionChange = useCallback(
        (selection: any) => {
            if (selection.totalSelected > maxSelection) {
                toast.error(`Maximum ${maxSelection} images can be selected`);
                return;
            }

            setSelectedImages(selection.selectedItems || []);
            // console.log("Selected images:", selection);
        },
        [maxSelection],
    );

    // Handle add selected images to form
    const handleAddImages = useCallback(async () => {
        if (selectedImages.length === 0) {
            toast.error("Please select at least one image");
            return;
        }

        try {
            setIsSubmitting(true);

            // Map selected images ke format yang sesuai
            const formattedImages = selectedImages.map((img) => {
                // console.log(img);
                return {
                    id: img.id || img.name,
                    name: img.name,
                    // url: img.metadata?.url_proxy || img.metadata?.url_image,
                    url: img.metadata?.url_image,
                    size: img.size,
                    contentType: img.contentType,
                };
            });

            // Get current form value - gunakan normalizedImages untuk consistency
            const currentValue = normalizedImages || [];

            // Merge dengan existing images (avoid duplicates)
            const mergedImages = [
                ...currentValue,
                ...formattedImages.filter(
                    (newImg) =>
                        !currentValue.some(
                            (existingImg: any) => existingImg.id === newImg.id,
                        ),
                ),
            ];

            // Check max limit
            if (mergedImages.length > maxSelection) {
                toast.error(
                    `Maximum ${maxSelection} images allowed. Currently have ${currentValue.length}.`,
                );
                setIsSubmitting(false);
                return;
            }

            // Update form value
            form.setValue(fieldName, mergedImages);

            toast.success(
                `${formattedImages.length} image(s) added successfully`,
            );

            // Reset state
            setSelectedImages([]);
            setOpenModal(false);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error adding images:", error);
            toast.error("Failed to add images");
            setIsSubmitting(false);
        }
    }, [selectedImages, form, fieldName, maxSelection, normalizedImages]);

    // Handle remove image dari form
    const handleRemoveImage = useCallback(
        (imageId: string) => {
            const updatedImages = normalizedImages.filter(
                (img: any) => img.id !== imageId,
            );
            form.setValue(fieldName, updatedImages);
            toast.success("Image removed");
        },
        [form, fieldName, normalizedImages],
    );

    // Handle reset selection ketika modal ditutup
    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
        setSelectedImages([]);
        setSearchInput("");
        setSearch("");
        setPage(1);
    }, []);

    // console.log(form.watch(fieldName));

    return (
        <div className="w-full space-y-4 relative">
            {/* Dialog untuk select images */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                {/* <DialogContent className="max-w-[75%] max-h-[85vh] overflow-hidden flex flex-col"> */}
                <DialogContent className="w-full h-[70vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Select {title}</DialogTitle>
                        <DialogDescription>
                            Pick images from your library. Maximum{" "}
                            <span className="font-semibold">
                                {maxSelection}
                            </span>{" "}
                            images can be selected.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Search Bar */}
                    <div className="flex gap-2 px-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search images..."
                                value={searchInput}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10"
                                disabled={isLoading || isFetching}
                            />
                        </div>
                        <div className="w-full md:w-auto lg:w-1/4">
                            <PaginationSimple
                                onChangePage={(e) => setPage(e)}
                                totalPages={totalPages}
                            />
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4">
                            <SelectSimple
                                defaultValue={`${size}`}
                                onChangeSelected={(value: string) => {
                                    setSize(parseInt(value));
                                }}
                                defaultValueArray={[
                                    { label: "5", value: "5" },
                                    { label: "10", value: "10" },
                                    { label: "15", value: "15" },
                                    { label: "20", value: "20" },
                                    { label: "25", value: "25" },
                                    { label: "50", value: "50" },
                                    { label: "100", value: "100" },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Files Component Container */}
                    <div className="flex-1 overflow-y-auto px-4 py-3">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <LoadingComponent type="icon" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-2">
                                        Failed to load images
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            queryClient.refetchQueries({
                                                queryKey: ["files-admin"],
                                            })
                                        }
                                    >
                                        Retry
                                    </Button>
                                </div>
                            </div>
                        ) : (data?.data || []).length === 0 ? (
                            <div className="flex items-center justify-center h-64">
                                <p className="text-muted-foreground">
                                    No images found
                                </p>
                            </div>
                        ) : (
                            <ShowFilesComponent
                                files={data?.data || []}
                                checkBoxStatus={true}
                                tootlgeStatus={false}
                                fullMetaData={false}
                                layout="grid"
                                gridCols={4}
                                onSelectionChange={handleSelectionChange}
                            />
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t">
                            <p className="text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setPage((p) => Math.max(1, p - 1))
                                    }
                                    disabled={page === 1 || isLoading}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(totalPages, p + 1),
                                        )
                                    }
                                    disabled={page === totalPages || isLoading}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <DialogFooter className="px-4 py-3 border-t gap-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={handleAddImages}
                            disabled={
                                selectedImages.length === 0 ||
                                isSubmitting ||
                                isLoading
                            }
                            className="gap-2"
                        >
                            {isSubmitting && <LoadingComponent type="icon" />}
                            Add{" "}
                            {selectedImages.length > 0 &&
                                `(${selectedImages.length})`}{" "}
                            Image
                            {selectedImages.length !== 1 && "s"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Button untuk open modal */}
            <div className="space-y-2">
                <Label className="font-semibold">{title}</Label>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenModal(true)}
                    disabled={isDisable}
                    className="w-full"
                >
                    Select Images ({normalizedImages.length}/{maxSelection})
                </Button>
            </div>

            {/* Selected Images Preview */}
            {normalizedImages && normalizedImages.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        Selected Images ({normalizedImages.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {normalizedImages.map((image: any, index: number) => {
                            // console.log("Show Multi Products : ", image);
                            return (
                                <div
                                    key={image.id || index}
                                    className="relative group rounded-lg overflow-hidden border bg-gray-50"
                                >
                                    {/* Image Preview */}
                                    <Image
                                        width={720}
                                        height={720}
                                        src={
                                            image?.name
                                                ? `${baseUrlImage}/${image.name}`
                                                : ""
                                        }
                                        alt={image?.name || "-"}
                                        className="w-full h-24 object-cover"
                                        crossOrigin="anonymous"
                                    />

                                    {/* Order Badge */}
                                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(image.id)
                                            }
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                            title="Remove image"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Image Name Tooltip */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                                        {image.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Form Errors */}
            {form.formState.errors[fieldName] && (
                <p className="text-sm font-medium text-red-600">
                    {form.formState.errors[fieldName]?.message as string}
                </p>
            )}
        </div>
    );
}
