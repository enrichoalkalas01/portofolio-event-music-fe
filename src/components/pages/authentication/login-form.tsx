"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";

import { WrapperForms } from "../../generals/wrapper/wrapper-forms";
import { FormRegularInput } from "../../generals/forms/form-regular-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schemaLogin = z.object({
    username: z.string().nonempty("Username must be filled!"),
    password: z.string().nonempty("Password must be filled!"),
});

export function LoginForm() {
    const route = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schemaLogin),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleSubmitData = async (data: any) => {
        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                redirect: false,
                ...data,
            });

            if (!response?.ok) {
                let error;
                if (JSON.parse(`${response?.error}`)) {
                    error = JSON.parse(`${response?.error}`);
                }

                throw {
                    status: error?.status || 400,
                    message: error?.message || "Failed to sign in user.",
                };
            }

            toast.success("Successfull to sign in.", { position: "top-right" });
            route.push("/");
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message, {
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <WrapperForms
            form={form}
            onSubmitFunction={handleSubmitData}
            className={cn("flex flex-col gap-2")}
        >
            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
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
                    Login
                </Button>
                <span>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </span>
            </div>
        </WrapperForms>
    );
}
