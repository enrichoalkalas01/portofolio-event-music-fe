"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { FormRegularSelect } from "@/components/generals/forms/form-regular-select";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const schemaForm = z.object({
    paramsLabel: z.string().nonempty(),
    paramsValue: z.string().nonempty(),
    paramsDescription: z.string().optional(),
    paramsType: z.string().nonempty(),
});

export default function Page() {
    const router = useRouter();
    const [IsDisable, setIsDisable] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schemaForm),
        defaultValues: {
            paramsLabel: "",
            paramsValue: "",
            paramsDescription: "",
            paramsType: "",
        },
    });

    const {
        data: dataParamsType,
        error: errorParamsType,
        isLoading: isLoadingParamsType,
    } = useQuery({
        queryKey: ["admin-system-params-type-list-1"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/system-params-type`,
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

    const handleSubmit = async (data: any) => {
        setIsDisable(true);
        try {
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/system-params`,
                method: "POST",
                headers: {
                    Authorization: `Bearer`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    ...data,
                }),
            };

            const response = await axios(config);
            toast.success(
                response?.data?.message || "Successfull to register.",
                {
                    position: "top-right",
                },
            );
            router.push(`/admin/system-params`);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message, {
                position: "top-right",
            });
        } finally {
            setTimeout(() => {
                setIsDisable(false);
            }, 1000);
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Create Data"
                headerSubTitle=""
                className="p-0 gap-0"
            >
                <WrapperForms form={form} onSubmitFunction={handleSubmit}>
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="paramsLabel"
                                labelName={"Params Label"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="paramsValue"
                                labelName={"Params Value"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="paramsDescription"
                                labelName={"Params Description"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularSelect
                                form={form}
                                disable={IsDisable}
                                name="paramsType"
                                labelName={"Params Type"}
                                defaultValue={dataParamsType || []}
                            />
                        </div>

                        <div className="w-full flex gap-2">
                            <Button
                                className="cursor-pointer"
                                disabled={IsDisable}
                                type="submit"
                            >
                                {IsDisable ? (
                                    <LoadingComponent type="icon" />
                                ) : (
                                    <span>Submit</span>
                                )}
                            </Button>
                            <Button
                                className="cursor-pointer"
                                variant={"ghost"}
                                type="button"
                                onClick={() => router.back()}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </WrapperForms>
            </WrapperCard>
        </section>
    );
}
