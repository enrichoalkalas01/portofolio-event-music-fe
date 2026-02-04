"use client";

import { FormMultipleSelect } from "@/components/generals/forms/form-multiple-select";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

export default function EventCategories({
    form,
    IsDisable,
}: {
    form: UseFormReturn<any>;
    IsDisable: boolean;
}) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-system-params-type-list-categories"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/system-params/type/6982d71bbc92135272282994`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
        select: (e: any) => {
            const mappedData = e?.data?.map((x: any) => {
                return {
                    label: x?.paramsLabel,
                    value: x?._id,
                };
            });
            return mappedData;
        },
    });

    console.log(data, error, isLoading);

    return (
        <FormMultipleSelect
            form={form}
            disable={IsDisable}
            name="categories"
            labelName={"categories"}
            defaultValue={data || []}
        />
    );
}
