"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperForms } from "../../generals/wrapper/wrapper-forms";
import { FormRegularInput } from "../../generals/forms/form-regular-input";

const schemaLogin = z.object({
    username: z.string().min(1, "Username atau email wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
});

export function LoginForm() {
    return (
        <Suspense fallback={null}>
            <LoginFormInner />
        </Suspense>
    );
}

function LoginFormInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(schemaLogin),
        defaultValues: { username: "", password: "" },
    });

    const handleSubmitData = async (data: z.infer<typeof schemaLogin>) => {
        setIsLoading(true);
        try {
            const response = await signIn("credentials", { redirect: false, ...data });
            if (!response?.ok) {
                let message = "Username atau password salah.";
                try {
                    const parsed = JSON.parse(`${response?.error}`);
                    if (parsed?.message) message = parsed.message;
                } catch {
                    // next-auth error string is not JSON, keep the default message
                }
                throw new Error(message);
            }
            toast.success("Berhasil masuk. Selamat datang kembali!");
            router.push(callbackUrl.startsWith("/") ? callbackUrl : "/");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.message || "Gagal masuk.");
            setIsLoading(false);
        }
    };

    return (
        <WrapperForms form={form} onSubmitFunction={handleSubmitData} className={cn("flex flex-col gap-2")}>
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Masuk ke akunmu</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Gunakan username atau email yang terdaftar.
                </p>
            </div>
            <div className="w-full mt-4 flex flex-col gap-5">
                <FormRegularInput
                    form={form}
                    name="username"
                    labelName="Username atau Email"
                    placeholder="contoh: budi atau budi@mail.com"
                    disable={isLoading}
                />
                <div className="relative">
                    <FormRegularInput
                        form={form}
                        name="password"
                        labelName="Password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        disable={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground cursor-pointer"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                </div>
            </div>
            <div className="w-full flex-col flex gap-3 text-sm text-center mt-5">
                <Button type="submit" className="cursor-pointer h-10" disabled={isLoading}>
                    {isLoading ? <LoadingComponent type="icon" /> : <span>Masuk</span>}
                </Button>
                <span className="text-muted-foreground">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                        Daftar sekarang
                    </Link>
                </span>
            </div>
        </WrapperForms>
    );
}
