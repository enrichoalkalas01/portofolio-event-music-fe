"use client";

// Library
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Components Pages
import {
    FormRegularFileInput,
    FormRegularFileMultipleInput,
} from "@/components/generals/forms/form-regular-file-input";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { WrapperDialog } from "@/components/generals/wrapper/wrapper-dialog";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { LoadingComponent } from "@/components/generals/loading/loading";

// Components
import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [isProgress, setIsProgress] = useState<boolean>(false);
    const [isClearData, setIsClearData] = useState<boolean>(false);

    const [uploadProgress, setUploadProgress] = useState<{
        [key: string]: any;
    }>({});

    const form = useForm<any>({
        defaultValues: {
            product_images: [],
        },
    });

    const handleClickButton = async (data: any) => {
        setIsProgress(true);
        setIsDisable(true);

        const uploadedFiles: File[] = [];

        await Promise.all(
            data.product_images.map(async (file: any) => {
                const formData = new FormData();
                formData.append("file", file);

                return axios
                    .post(
                        `${process.env.NEXT_PUBLIC_URL_API}/files/uploads`,
                        formData,
                        {
                            onUploadProgress: (progressEvent: any) => {
                                const percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total,
                                );

                                setUploadProgress((prev) => ({
                                    ...prev,
                                    [file.name]: percentCompleted,
                                }));
                            },
                        },
                    )
                    .then(() => {
                        uploadedFiles.push(file);
                        toast.success(
                            `Successfull to upload file ${file.name}`,
                            { position: "top-right" },
                        );
                    })
                    .catch((error: any) => {
                        toast.error(`Failed to upload file ${file.name}`, {
                            position: "top-right",
                            description:
                                error?.response?.data?.message ||
                                error?.response?.message,
                        });
                    });
            }),
        );

        setIsProgress(false);
        setIsClearData(true);
        setTimeout(() => {
            setIsDisable(false);
            setIsClearData(false);
            // router.push("/admin/settings/files");
        }, 250);
    };

    return (
        <WrapperCard
            headerStatus={true}
            headerTitle="Upload your files here"
            headerSubTitle=""
            buttonTopStatus={true}
            buttonUrlComponent={
                <Button
                    onClick={form.handleSubmit(handleClickButton)}
                    disabled={isProgress}
                >
                    {isProgress ? (
                        <LoadingComponent type="full" />
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            }
        >
            <WrapperForms form={form}>
                <FormRegularFileMultipleInput
                    form={form}
                    name="product_images"
                    isClearFiles={isClearData}
                    isDisable={isDisable}
                />
            </WrapperForms>
        </WrapperCard>
    );
}
