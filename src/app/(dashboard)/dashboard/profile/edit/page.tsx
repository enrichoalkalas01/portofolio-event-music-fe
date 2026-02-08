"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { FormRegularSelect } from "@/components/generals/forms/form-regular-select";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ArrowLeft, Camera, User } from "lucide-react";

const schemaForm = z.object({
    firstname: z.string().min(1, "Nama depan wajib diisi"),
    lastname: z.string().optional(),
    email: z.string().email("Email tidak valid"),
    phonenumber: z.string().optional(),
    birthdate: z.string().optional(),
    gender: z.string().optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
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
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            birthdate: "",
            gender: "",
            bio: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            country: "Indonesia",
        },
    });

    // TODO: Integrate with API to get user profile
    const { data: profileData, isLoading } = useQuery({
        queryKey: ["user-profile-edit"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            ).json(),
        enabled: !!accessToken,
    });

    useEffect(() => {
        if (profileData?.data) {
            const profile = profileData.data;
            form.setValue("firstname", profile?.firstname || "");
            form.setValue("lastname", profile?.lastname || "");
            form.setValue("email", profile?.email || "");
            form.setValue("phonenumber", profile?.phonenumber || "");
            form.setValue("birthdate", profile?.birthdate?.split("T")[0] || "");
            form.setValue("gender", profile?.gender || "");
            form.setValue("bio", profile?.bio || "");
            form.setValue("address", profile?.address || "");
            form.setValue("city", profile?.city || "");
            form.setValue("province", profile?.province || "");
            form.setValue("postalCode", profile?.postalCode || "");
            form.setValue("country", profile?.country || "Indonesia");

            if (profile?.avatar) {
                setAvatarPreview(profile.avatar);
            }
        } else if (user) {
            // Fallback to session user data
            form.setValue("firstname", user?.firstname || user?.name?.split(" ")[0] || "");
            form.setValue("lastname", user?.lastname || user?.name?.split(" ").slice(1).join(" ") || "");
            form.setValue("email", user?.email || "");
            form.setValue("phonenumber", user?.phonenumber || user?.phone || "");
        }
    }, [profileData, user, form]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            // TODO: Upload avatar to API
        }
    };

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // TODO: Integrate with API to update profile
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/users/profile`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    birthdate: data.birthdate,
                    gender: data.gender,
                    bio: data.bio,
                    address: data.address,
                    city: data.city,
                    province: data.province,
                    postalCode: data.postalCode,
                    country: data.country,
                }),
            };

            const response = await axios(config);
            toast.success(response?.data?.message || "Profil berhasil diperbarui!", {
                position: "top-right",
            });

            // Invalidate profile query to refresh data
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["user-profile-edit"] });

            router.push("/dashboard/profile");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error?.message || "Gagal memperbarui profil",
                {
                    position: "top-right",
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const genderOptions = [
        { label: "Laki-laki", value: "male" },
        { label: "Perempuan", value: "female" },
    ];

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
                        {/* Avatar Section */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Foto Profil</h3>
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-purple-600" />
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                        <Camera className="w-4 h-4 text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Upload foto profil Anda. Format yang didukung: JPG, PNG.
                                        Ukuran maksimal: 2MB.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Personal Information */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Informasi Pribadi</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormRegularInput
                                    form={form}
                                    name="firstname"
                                    labelName="Nama Depan"
                                    propsInput={{ placeholder: "Masukkan nama depan" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                                <FormRegularInput
                                    form={form}
                                    name="lastname"
                                    labelName="Nama Belakang"
                                    propsInput={{ placeholder: "Masukkan nama belakang" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                                <FormRegularInput
                                    form={form}
                                    name="email"
                                    labelName="Email"
                                    propsInput={{
                                        placeholder: "Masukkan email",
                                        type: "email",
                                    }}
                                    propsFormItem={{ className: "w-full" }}
                                />
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
                                <FormRegularInput
                                    form={form}
                                    name="birthdate"
                                    labelName="Tanggal Lahir"
                                    propsInput={{ type: "date" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                                <FormRegularSelect
                                    form={form}
                                    name="gender"
                                    labelName="Jenis Kelamin"
                                    defaultValue={genderOptions}
                                />
                            </div>
                            <div className="mt-4">
                                <Label className="text-sm font-medium">Bio</Label>
                                <Textarea
                                    {...form.register("bio")}
                                    placeholder="Ceritakan sedikit tentang diri Anda..."
                                    className="mt-2"
                                    rows={3}
                                />
                            </div>
                        </Card>

                        {/* Address Information */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Alamat</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Alamat Lengkap</Label>
                                    <Textarea
                                        {...form.register("address")}
                                        placeholder="Masukkan alamat lengkap..."
                                        className="mt-2"
                                        rows={2}
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormRegularInput
                                        form={form}
                                        name="city"
                                        labelName="Kota"
                                        propsInput={{ placeholder: "Masukkan kota" }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="province"
                                        labelName="Provinsi"
                                        propsInput={{ placeholder: "Masukkan provinsi" }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="postalCode"
                                        labelName="Kode Pos"
                                        propsInput={{ placeholder: "Masukkan kode pos" }}
                                        propsFormItem={{ className: "w-full" }}
                                    />
                                    <FormRegularInput
                                        form={form}
                                        name="country"
                                        labelName="Negara"
                                        propsInput={{ placeholder: "Masukkan negara" }}
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
