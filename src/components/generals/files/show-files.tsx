"use client";

// Library
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

// Components Pages
import ShowFilesItem from "./show-files-item";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { LoadingComponent } from "@/components/generals/loading/loading";
import RegularInput from "@/components/generals/input/regular-input";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";

// Components
import { Input } from "@/components/shadcn/ui/input";

// Store
import { useTableStore } from "@/components/generals/table/store/table-store";
import { cn } from "@/lib/utils";
import { set } from "lodash";
import SelectSimple from "@/components/generals/select/select-simple";

// Interfaces
type DataResponse = {
    success: boolean;
    total: number;
    data: Record<string, unknown>[] | Record<string, unknown>;
};

export default function ShowFiles() {
    const [TotalPages, setTotalPages] = useState<number>(0);
    const [Size, setSize] = useState<number>(10);
    const [Page, setPage] = useState<number>(1);
    const [Search, setSearch] = useState<string>("");
    const [IsSubmit, setIsSubmit] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const { data, error, isLoading }: any = useQuery<DataResponse>({
        queryKey: ["files-admin", Search, Page, Size, IsSubmit],
        queryFn: async () => {
            setIsSubmit(false);
            const response = await fetcher<DataResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/images?size=${Size}&page=${Page}&search=${Search}`
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

    return (
        <>
            <section className="w-full mb-4 flex flex-wrap lg:flex-nowrap lg:flex-row gap-4">
                <div className="w-full">
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
                            { label: "50", value: "50" },
                            { label: "100", value: "100" },
                        ]}
                    />
                </div>
            </section>
            <section className="w-full">
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* <div className="flex flex-wrap gap-4 justify-start items-start"> */}
                        {data?.data?.length > 0 &&
                            data.data.map((file: any, index: number) => {
                                return (
                                    <ShowFilesItem
                                        key={index}
                                        file={file}
                                        fullMetaData={true}
                                        checkBoxStatus={true}
                                        tootlgeStatus={true}
                                    />
                                );
                            })}

                        {data?.data?.length === 0 && (
                            <div className="w-full h-[300px] flex items-center justify-center">
                                <span>Files not found!</span>
                            </div>
                        )}
                    </div>
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
                    <div className="w-full h-full flex items-center justify-center">
                        <span>Failed to retrieve data!</span>
                    </div>
                )}
            </section>
        </>
    );
}
