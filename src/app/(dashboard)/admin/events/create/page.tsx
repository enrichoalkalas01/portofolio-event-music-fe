"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { FormRegularSelect } from "@/components/generals/forms/form-regular-select";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
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
        } catch (error: any) {
            console.log(error);
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

                        <div className="w-full">
                            <Button
                                className="w-full cursor-pointer"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? (
                                    <LoadingComponent type="icon" />
                                ) : (
                                    <span>Submit</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </WrapperForms>
            </WrapperCard>
        </section>
    );
}
