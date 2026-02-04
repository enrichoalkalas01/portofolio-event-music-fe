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
import { FormMultipleSelect } from "@/components/generals/forms/form-multiple-select";
import EventSponsor from "@/components/pages/events/event-sponsor";
import EventCategories from "@/components/pages/events/event-categories";
import EventVendor from "@/components/pages/events/event-vendor";
import EventStatus from "@/components/pages/events/event-status";

const schemaForm = z.object({
    title: z.string().nonempty(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    event_date_start: z.string().optional(),
    event_date_end: z.string().optional(),
    location: z.string().optional(),
    vendor: z.string().optional(),
    sponsor: z.any().optional(),
    thumbnail: z.string().optional(),
    images: z.string().optional(),
    categories: z.any().optional(),
    status: z.string().optional(),
    max_participants: z.number().optional(),
    price: z.number().optional(),
});

export default function Page() {
    const router = useRouter();
    const [IsDisable, setIsDisable] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schemaForm),
        defaultValues: {
            title: "",
            excerpt: "",
            description: "",
            event_date_start: "",
            event_date_end: "",
            location: "",
            vendor: "",
            sponsor: null,
            thumbnail: "",
            images: "",
            categories: null,
            status: "",
            max_participants: 0,
            price: 0,
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
                                name="title"
                                labelName={"title"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="excerpt"
                                labelName={"excerpt"}
                            />
                        </div>

                        <div className="w-full flex gap-4">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                propsFormItem={{ className: "w-full" }}
                                propsInput={{
                                    className: "w-full",
                                    type: "date",
                                }}
                                propsFormControl={{ className: "w-full" }}
                                name="event_date_start"
                                labelName={"event_date_start"}
                            />
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                propsFormItem={{ className: "w-full" }}
                                propsInput={{
                                    className: "w-full",
                                    type: "date",
                                }}
                                propsFormControl={{ className: "w-full" }}
                                name="event_date_end"
                                labelName={"event_date_end"}
                            />
                        </div>

                        <div className="w-full flex gap-4">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                propsFormItem={{ className: "w-full" }}
                                propsInput={{
                                    className: "w-full",
                                    type: "number",
                                    min: 0,
                                }}
                                propsFormControl={{ className: "w-full" }}
                                name="price"
                                labelName={"price"}
                            />
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                propsFormItem={{ className: "w-full" }}
                                propsInput={{
                                    className: "w-full",
                                    type: "number",
                                    min: 0,
                                }}
                                propsFormControl={{ className: "w-full" }}
                                name="max_participants"
                                labelName={"max_participants"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="description"
                                labelName={"description"}
                            />
                        </div>

                        <div className="w-full">
                            <FormRegularInput
                                form={form}
                                disable={IsDisable}
                                name="location"
                                labelName={"location"}
                            />
                        </div>

                        <div className="w-full">
                            <EventVendor form={form} IsDisable={IsDisable} />
                        </div>

                        <div className="w-full">
                            <EventSponsor form={form} IsDisable={IsDisable} />
                        </div>

                        <div className="w-full">
                            <EventCategories
                                form={form}
                                IsDisable={IsDisable}
                            />
                        </div>

                        <div className="w-full">
                            <EventStatus form={form} IsDisable={IsDisable} />
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
