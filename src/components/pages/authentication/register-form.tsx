"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperForms } from "../../generals/wrapper/wrapper-forms";
import { FormRegularInput } from "../../generals/forms/form-regular-input";
import { api, getErrorMessage } from "@/lib/api";

const schemaRegister = z
    .object({
        username: z
            .string()
            .min(3, "Username minimal 3 karakter")
            .max(30, "Username maksimal 30 karakter")
            .regex(/^[a-zA-Z0-9._-]+$/, "Hanya huruf, angka, titik, strip, dan underscore"),
        fullname: z.string().min(3, "Nama lengkap minimal 3 karakter"),
        email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
        phonenumber: z
            .string()
            .optional()
            .refine((v) => !v || /^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(v), "Format nomor HP tidak valid"),
        password: z
            .string()
            .min(8, "Password minimal 8 karakter")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Harus ada huruf besar, huruf kecil, dan angka"),
        confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Password tidak sama",
        path: ["confirmPassword"],
    });

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(schemaRegister),
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            phonenumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmitData = async (data: z.infer<typeof schemaRegister>) => {
        setIsLoading(true);
        try {
            await api("/authentication/register", {
                method: "POST",
                body: {
                    username: data.username,
                    fullname: data.fullname,
                    email: data.email,
                    phonenumber: data.phonenumber || undefined,
                    password: data.password,
                },
            });
            toast.success("Akun berhasil dibuat. Silakan masuk.");
            router.push("/login");
        } catch (error) {
            toast.error(getErrorMessage(error, "Gagal mendaftar."));
            setIsLoading(false);
        }
    };

    return (
        <WrapperForms form={form} onSubmitFunction={handleSubmitData} className={cn("flex flex-col gap-2")}>
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Buat akun baru</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Gratis, hanya butuh satu menit.
                </p>
            </div>
            <div className="w-full mt-4 flex flex-col gap-4">
                <FormRegularInput form={form} name="fullname" labelName="Nama Lengkap" placeholder="contoh: Budi Santoso" disable={isLoading} />
                <FormRegularInput form={form} name="username" labelName="Username" placeholder="contoh: budi.santoso" disable={isLoading} />
                <FormRegularInput form={form} name="email" labelName="Email" type="email" placeholder="contoh: budi@mail.com" disable={isLoading} />
                <FormRegularInput form={form} name="phonenumber" labelName="Nomor HP (opsional)" placeholder="08xxxxxxxxxx" disable={isLoading} />
                <div className="relative">
                    <FormRegularInput
                        form={form}
                        name="password"
                        labelName="Password"
                        placeholder="Minimal 8 karakter"
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
                <FormRegularInput
                    form={form}
                    name="confirmPassword"
                    labelName="Konfirmasi Password"
                    placeholder="Ulangi password"
                    type={showPassword ? "text" : "password"}
                    disable={isLoading}
                />
            </div>
            <div className="w-full flex-col flex gap-3 text-sm text-center mt-5">
                <Button type="submit" className="cursor-pointer h-10" disabled={isLoading}>
                    {isLoading ? <LoadingComponent type="icon" /> : <span>Daftar</span>}
                </Button>
                <span className="text-muted-foreground">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                        Masuk
                    </Link>
                </span>
                <p className="text-xs text-muted-foreground">
                    Dengan mendaftar, kamu menyetujui{" "}
                    <Link href="/terms-and-condition" className="underline underline-offset-4">Syarat & Ketentuan</Link>{" "}
                    dan{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-4">Kebijakan Privasi</Link>.
                </p>
            </div>
        </WrapperForms>
    );
}
