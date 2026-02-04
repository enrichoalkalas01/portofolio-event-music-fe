"use client";

import { FormMultipleSelect } from "@/components/generals/forms/form-multiple-select";
import { FormRegularSelect } from "@/components/generals/forms/form-regular-select";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

export default function EventVendor({
    form,
    IsDisable,
}: {
    form: UseFormReturn<any>;
    IsDisable: boolean;
}) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-system-params-type-list-vendor"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/system-params/type/6982e6d93f5ebc11efd50190`,
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
        <FormRegularSelect
            form={form}
            disable={IsDisable}
            name="vendor"
            labelName={"vendor"}
            defaultValue={data || []}
        />
    );
}
