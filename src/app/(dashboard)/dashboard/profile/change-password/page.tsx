"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Key, Shield, AlertTriangle } from "lucide-react";

const schemaForm = z
    .object({
        currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
        newPassword: z
            .string()
            .min(8, "Password minimal 8 karakter")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password harus mengandung huruf besar, huruf kecil, dan angka"
            ),
        confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password tidak cocok",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof schemaForm>;

export default function Page() {
    const router = useRouter();
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schemaForm),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // TODO: Integrate with API to change password
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/users/change-password`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                }),
            };

            const response = await axios(config);
            toast.success(
                response?.data?.message || "Password berhasil diubah!",
                {
                    position: "top-right",
                }
            );

            router.push("/dashboard/profile");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Gagal mengubah password",
                {
                    position: "top-right",
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Ubah Password"
                headerSubTitle="Perbarui password akun Anda"
                className="p-0 gap-0"
            >
                <WrapperForms form={form} onSubmitFunction={handleSubmit}>
                    <div className="w-full p-6 space-y-6 max-w-xl">
                        {/* Security Notice */}
                        <Card className="p-4 bg-yellow-50 border-yellow-200">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-yellow-800">
                                        Tips Keamanan
                                    </h4>
                                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                        <li>• Gunakan minimal 8 karakter</li>
                                        <li>• Kombinasikan huruf besar, huruf kecil, dan angka</li>
                                        <li>• Jangan gunakan password yang sama dengan akun lain</li>
                                        <li>• Jangan bagikan password Anda kepada siapapun</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        {/* Password Form */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Key className="w-5 h-5 text-purple-600" />
                                Form Ubah Password
                            </h3>
                            <div className="space-y-4">
                                <FormRegularInput
                                    form={form}
                                    name="currentPassword"
                                    labelName="Password Saat Ini"
                                    propsInput={{
                                        placeholder: "Masukkan password saat ini",
                                        type: "password",
                                    }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                                <FormRegularInput
                                    form={form}
                                    name="newPassword"
                                    labelName="Password Baru"
                                    propsInput={{
                                        placeholder: "Masukkan password baru",
                                        type: "password",
                                    }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                                <FormRegularInput
                                    form={form}
                                    name="confirmPassword"
                                    labelName="Konfirmasi Password Baru"
                                    propsInput={{
                                        placeholder: "Ulangi password baru",
                                        type: "password",
                                    }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                            >
                                {isSubmitting ? (
                                    <LoadingComponent type="icon" />
                                ) : (
                                    <>
                                        <Shield className="w-4 h-4 mr-2" />
                                        Ubah Password
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </WrapperForms>
            </WrapperCard>
        </section>
    );
}
