"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import { WrapperForms } from "../../generals/wrapper/wrapper-forms";
import { FormRegularInput } from "../../generals/forms/form-regular-input";
import { toast } from "sonner";

const schemaLogin = z.object({
    username: z.string().nonempty("Username must be filled!"),
    password: z.string().nonempty("Password must be filled!"),
    firstname: z.string().nonempty("Firstname must be filled!"),
    lastname: z.string().nonempty("Lastname must be filled!"),
    email: z.string().nonempty("Email must be filled!").email(),
});

export function RegisterForm() {
    const route = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schemaLogin),
        defaultValues: {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
        },
    });

    const handleSubmitData = async (data: any) => {
        setIsLoading(true);
        try {
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/authentication/register`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    username: data?.username,
                    password: data?.password,
                    email: data?.email,
                    firstname: data?.firstname,
                    lastname: data?.lastname,
                }),
            };

            const response = await axios(config);
            toast.success(
                response?.data?.message || "Successfull to register.",
                {
                    position: "top-right",
                },
            );

            // setTimeout(() => {
            //     route.push("/login");
            // }, 1000);
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
                        name="email"
                        labelName={"Email"}
                        type={"email"}
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
                <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isLoading}
                >
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
