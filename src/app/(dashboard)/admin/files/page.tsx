"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Components Pages
import ShowFiles from "@/components/pages/dashboard/settings/files/show-files";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { WrapperDialog } from "@/components/generals/wrapper/wrapper-dialog";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import {
    FormRegularFileInput,
    FormRegularFileMultipleInput,
} from "@/components/generals/forms/form-regular-file-input";

// Components
import { Button } from "@/components/shadcn/ui/button";

export default function Page() {
    const router = useRouter();

    const handlerButtonComponent = () => {
        router.push("/admin/files/upload");
    };

    return (
        <WrapperCard
            headerStatus={true}
            headerTitle="List Of Files"
            headerSubTitle=""
            buttonUrlComponent={
                <Button
                    className="cursor-pointer"
                    onClick={handlerButtonComponent}
                >
                    Upload FIles
                </Button>
            }
        >
            <ShowFiles />
        </WrapperCard>
    );
}
