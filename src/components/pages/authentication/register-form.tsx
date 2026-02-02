"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { WrapperForms } from "../../generals/wrapper/wrapper-forms";
import { FormRegularInput } from "../../generals/forms/form-regular-input";
import Link from "next/link";

export function RegisterForm() {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
        },
    });

    const handleSubmitData = (data: any) => {
        console.log(data);
    };

    return (
        <WrapperForms
            form={form}
            onSubmitFunction={handleSubmitData}
            className={cn("flex flex-col gap-2")}
        >
            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-2xl font-bold">Register to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to register to your account
                </p>
            </div>
            <div className="w-full mt-4 flex flex-col gap-6">
                <div className="w-full">
                    <FormRegularInput
                        form={form}
                        name="username"
                        labelName={"Username"}
                        placeholder={"e.g john.doe"}
                        className={cn("text-xs")}
                    />
                </div>

                <div className="w-full">
                    <FormRegularInput
                        form={form}
                        name="firstname"
                        labelName={"Firstname"}
                        placeholder={"e.g john"}
                        className={cn("text-xs")}
                    />
                </div>

                <div className="w-full">
                    <FormRegularInput
                        form={form}
                        name="lastname"
                        labelName={"Lastname"}
                        placeholder={"e.g doe"}
                        className={cn("text-xs")}
                    />
                </div>

                <div className="w-full">
                    <FormRegularInput
                        form={form}
                        name="password"
                        labelName={"Password"}
                        placeholder={"******"}
                        className={cn("text-xs")}
                        type="password"
                    />
                </div>
            </div>
            <div className="w-full flex-col flex gap-3 text-sm text-center mt-4">
                <Button type="submit" className="cursor-pointer">
                    Register
                </Button>
                <span>
                    Do you have an account?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4"
                    >
                        Sign in
                    </Link>
                </span>
            </div>
        </WrapperForms>
    );
}
