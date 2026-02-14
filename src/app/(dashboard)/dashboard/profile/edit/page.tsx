"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ArrowLeft, Camera, User, Mail, Shield } from "lucide-react";

const schemaForm = z.object({
    fullname: z.string().min(1, "Nama lengkap wajib diisi"),
    phonenumber: z.string().optional(),
    avatar: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
});

type FormData = z.infer<typeof schemaForm>;

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken = user?.token?.access_token;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(schemaForm),
        defaultValues: {
            fullname: "",
            phonenumber: "",
            avatar: "",
            street: "",
            city: "",
            province: "",
            postalCode: "",
            country: "Indonesia",
        },
    });

    const { data: profileData, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/users/profile`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                )
            ).json(),
        enabled: !!accessToken,
    });

    const profile = profileData?.data;

    useEffect(() => {
        if (profile) {
            form.reset({
                fullname: profile?.fullname || profile?.username || "",
                phonenumber: profile?.phonenumber || "",
                avatar: profile?.avatar || "",
                street: profile?.address?.street || "",
                city: profile?.address?.city || "",
                province: profile?.address?.province || "",
                postalCode: profile?.address?.postalCode || "",
                country: profile?.address?.country || "Indonesia",
            });

            if (profile?.avatar) {
                setAvatarPreview(profile.avatar);
            }
        } else if (user && !isLoading) {
            form.reset({
                fullname: user?.fullname || user?.name || user?.username || "",
                phonenumber: user?.phonenumber || "",
                avatar: "",
                street: "",
                city: "",
                province: "",
                postalCode: "",
                country: "Indonesia",
            });
        }
    }, [profile, user, isLoading]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setAvatarPreview(result);
                form.setValue("avatar", result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const payload: any = {
                fullname: data.fullname,
                phonenumber: data.phonenumber,
            };

            if (data.avatar) {
                payload.avatar = data.avatar;
            }

            const hasAddress =
                data.street ||
                data.city ||
                data.province ||
                data.postalCode ||
                data.country;
            if (hasAddress) {
                payload.address = {
                    street: data.street,
                    city: data.city,
                    province: data.province,
                    postalCode: data.postalCode,
                    country: data.country,
                };
            }

            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/users/profile`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(payload),
            };

            const response = await axios(config);
            toast.success(
                response?.data?.message || "Profil berhasil diperbarui!",
                {
                    position: "top-right",
                },
            );

            queryClient.invalidateQueries({ queryKey: ["user-profile"] });

            router.push("/dashboard/profile");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Gagal memperbarui profil",
                {
                    position: "top-right",
                },
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <section className="w-full">
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Edit Profil"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-8 text-center text-gray-500">
                        Memuat data...
                    </div>
                </WrapperCard>
            </section>
        );
    }

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Edit Profil"
                headerSubTitle="Perbarui informasi profil Anda"
                className="p-0 gap-0"
            >
                <WrapperForms form={form} onSubmitFunction={handleSubmit}>
                    <div className="w-full p-6 space-y-6">
                        {/* Current Account Info (Read-only) */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">
                                Informasi Akun
                            </h3>
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-10 h-10 text-purple-600" />
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 p-1.5 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                        <Camera className="w-3.5 h-3.5 text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">
                                            {profile?.username ||
                                                user?.username ||
                                                "-"}
                                        </span>
                                        <Badge
                                            className={
                                                profile?.isActive
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }
                                        >
                                            {profile?.role ||
                                                user?.role ||
                                                "user"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {profile?.email ||
                                                user?.email ||
                                                "-"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Username dan email tidak dapat diubah
                                        dari halaman ini.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Personal Information */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">
                                Informasi Pribadi
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <FormRegularInput
                                        form={form}
                                        name="fullname"
                                        labelName="Nama Lengkap"
                                        propsInput={{
                                            placeholder:
                                                "Masukkan nama lengkap",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                </div>
                                <FormRegularInput
                                    form={form}
                                    name="phonenumber"
                                    labelName="Nomor Telepon"
                                    propsInput={{
                                        placeholder: "Masukkan nomor telepon",
                                        type: "tel",
                                    }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>
                        </Card>

                        {/* Address Information */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Alamat</h3>
                            <div className="space-y-4">
                                <div>
                                    <FormRegularInput
                                        form={form}
                                        name="street"
                                        labelName="Jalan"
                                        propsInput={{
                                            placeholder:
                                                "Masukkan alamat jalan",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormRegularInput
                                        form={form}
                                        name="city"
                                        labelName="Kota"
                                        propsInput={{
                                            placeholder: "Masukkan kota",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="province"
                                        labelName="Provinsi"
                                        propsInput={{
                                            placeholder: "Masukkan provinsi",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="postalCode"
                                        labelName="Kode Pos"
                                        propsInput={{
                                            placeholder: "Masukkan kode pos",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="country"
                                        labelName="Negara"
                                        propsInput={{
                                            placeholder: "Masukkan negara",
                                        }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-end">
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
                                    "Simpan Perubahan"
                                )}
                            </Button>
                        </div>
                    </div>
                </WrapperForms>
            </WrapperCard>
        </section>
    );
}
