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

const schemaForm = z.object({
    paramsLabel: z.string().nonempty(),
    paramsValue: z.string().nonempty(),
    paramsType: z.string().optional(),
    paramsDescription: z.string().optional(),
});

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schemaForm),
        defaultValues: {
            paramsLabel: "",
            paramsValue: "",
            paramsType: "",
            paramsDescription: "",
        },
    });

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const config = {
                url: ``,
                method: "POST",
                headers: {
                    Authorization: `Bearer`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    ...data,
                }),
            };

            // const response = await axios(config)
            // toast.success(
            //     response?.data?.message || "Successfull to register.",
            //     {
            //         position: "top-right",
            //     },
            // );
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message, {
                position: "top-right",
            });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
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
                                disable={isLoading}
                                name="paramsLabel"
                                labelName={"Params Label"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={isLoading}
                                name="paramsValue"
                                labelName={"Params Value"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularSelect
                                form={form}
                                disable={isLoading}
                                name="paramsType"
                                labelName={"Params Type"}
                                defaultValue={[{ label: "1", value: "1" }]}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={isLoading}
                                name="paramsDescription"
                                labelName={"Params Description"}
                            />
                        </div>

                        <div className="w-full flex gap-2">
                            <Button
                                className="cursor-pointer"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? (
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
