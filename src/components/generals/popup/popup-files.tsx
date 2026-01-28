"use client";

// Library
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Components Pages
import { WrapperDialog } from "../wrapper/wrapper-dialog";
import ShowFilesItem from "@/components/pages/dashboard/settings/files/show-files-item";
import RegularInput from "../input/regular-input";
import PaginationSimple from "../pagination/pagination-simple";
import SelectSimple from "../select/select-simple";
import { LoadingComponent } from "../loading/loading";

// Components
import { Button } from "@/components/shadcn/ui/button";
import { Label } from "@/components/shadcn/ui/label";

// Store
import { useDialogStore } from "../wrapper/store/dialog-store";
import { useTableStore } from "../table/store/table-store";

// Icons
import { Search } from "lucide-react";

// Supports
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";

// Interfaces
type DataResponse = {
    success: boolean;
    total: number;
    data: Record<string, unknown>[] | Record<string, unknown>;
};

interface IPopupFiles {
    isDisable?: boolean;
    buttonText?: string;
    statusSubmitButton?: boolean;
    typeSelect?: "multiple" | "single";
    onChangeValue?: (e: any) => void;
    onSubmitButton?: (e: any) => void | undefined;
}

export const PopupFiles = ({
    isDisable = false,
    buttonText = "Open Files",
    statusSubmitButton = false,
    typeSelect = "multiple",
    onChangeValue = (e: any) => {},
    onSubmitButton = undefined,
}: IPopupFiles) => {
    // Config
    const { statusDialog, setStatusDialog } = useDialogStore();

    // State
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [TotalPages, setTotalPages] = useState<number>(0);
    const [Size, setSize] = useState<number>(10);
    const [Page, setPage] = useState<number>(1);
    const [Search, setSearch] = useState<string>("");
    const [IsSubmit, setIsSubmit] = useState<boolean>(false);

    // Fetcher
    const queryClient = useQueryClient();
    const { data, error, isLoading }: any = useQuery<DataResponse>({
        queryKey: ["files-admin", Search, Page, Size, IsSubmit],
        queryFn: async () => {
            setIsSubmit(false);
            const response = await fetcher<DataResponse>(
                `/api/files?size=${Size}&page=${Page}&search=${Search}`
            );
            const totalData = (response.data as { totalData: number })
                .totalData;
            setTotalPages(Math.ceil(totalData / Size));
            return response;
        },
    });

    useEffect(() => {
        if (Search || IsSubmit || Page > 1 || Size > 0) {
            queryClient.invalidateQueries({
                queryKey: ["files-admin", Search, Page, Size],
            });
        }
    }, [Search, Size, Page, IsSubmit]);

    useEffect(() => {
        if (typeSelect === "multiple") setSelectedFiles([]);
        if (typeSelect === "single") setSelectedFiles({});
    }, []);

    const handleChangeFiles = (e: any) => {
        if (e?.status && e.file) {
            if (typeSelect === "multiple") {
                setSelectedFiles((prevFiles: any) => [...prevFiles, e.file]);
            }

            if (typeSelect === "single") {
                setSelectedFiles(e.file);
            }
        }
    };

    const handlerSubmitButton = () => {
        if (typeSelect === "multiple") {
            onChangeValue([]); // Clear selected files
            onChangeValue(selectedFiles); // Set selected file to the outside component
        }

        if (typeSelect === "single") {
            onChangeValue({}); // Clear selected files
            onChangeValue(selectedFiles); // Set selected file to the outside component
        }

        if (onSubmitButton) {
            onSubmitButton(selectedFiles);
        }

        setSelectedFiles([]); // Clear local statea selected file
        setStatusDialog(false); // Close dialog
    };

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isDisable}
                onClick={() => setStatusDialog(true)}
            >
                {buttonText}
            </Button>
            <WrapperDialog
                propsDialogContent={{ className: "w-[90%] md:max-w-[85%]" }}
                footerStatus={true}
                footerComponent={
                    statusSubmitButton && (
                        <>
                            <div className="w-full flex items-center justify-center">
                                <Button
                                    type="button"
                                    variant="default"
                                    onClick={handlerSubmitButton}
                                >
                                    Submit Files
                                </Button>
                            </div>
                        </>
                    )
                }
            >
                <>
                    <section className="w-full mb-4 flex flex-wrap items-end lg:flex-nowrap lg:flex-row gap-4">
                        <div className="w-full">
                            <Label className="mb-4">Search Image Here</Label>
                            <RegularInput
                                onChange={(e: string) => {
                                    setSearch(e);
                                    setIsSubmit(true);
                                }}
                            />
                        </div>
                        <div className="w-full md:w-auto lg:w-1/4">
                            <PaginationSimple
                                onChangePage={(e) => setPage(e)}
                                totalPages={TotalPages}
                            />
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4">
                            <SelectSimple
                                defaultValue={`${Size}`}
                                onChangeSelected={(value: string) => {
                                    setSize(parseInt(value));
                                }}
                                defaultValueArray={[
                                    { label: "5", value: "5" },
                                    { label: "10", value: "10" },
                                    { label: "15", value: "15" },
                                    { label: "20", value: "20" },
                                    { label: "25", value: "25" },
                                ]}
                            />
                        </div>
                    </section>
                    <div className="w-full overflow-x-hidden overflow-y-auto grid md:grid-cols-3 lg:grid-cols-4 gap-4 h-[150px] sm:h-[200px] md:h-[450px]">
                        {!isLoading && !error && (
                            <>
                                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}

                                {data?.data?.files?.length > 0 &&
                                    data.data.files.map(
                                        (file: any, index: number) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <div className="w-full h-full">
                                                        <ShowFilesItem
                                                            file={file}
                                                            fullMetaData={true}
                                                            onChangeSelected={
                                                                handleChangeFiles
                                                            }
                                                            checkBoxStatus={
                                                                statusSubmitButton
                                                            }
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }
                                    )}

                                {data?.data?.files?.length === 0 && (
                                    <>
                                        <div className="w-full h-[300px] flex items-center justify-center">
                                            <span>Files not found!</span>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {isLoading && !error && (
                            <div
                                className={cn(
                                    "w-full h-auto",
                                    isLoading ??
                                        "h-[500px] flex justify-center items-center pb-8"
                                )}
                            >
                                <LoadingComponent
                                    type="icon"
                                    propsIcon={{ size: 50 }}
                                />
                            </div>
                        )}

                        {error && (
                            <>
                                <div className="w-full h-full flex items-center justify-center">
                                    <span>Failed to retrieve data!</span>
                                </div>
                            </>
                        )}
                    </div>
                </>
            </WrapperDialog>
        </>
    );
};
