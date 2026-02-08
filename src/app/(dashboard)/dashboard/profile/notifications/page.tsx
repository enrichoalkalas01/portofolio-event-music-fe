"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Switch } from "@/components/shadcn/ui/switch";
import { Label } from "@/components/shadcn/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ArrowLeft, Bell, Mail, Smartphone, Megaphone, Calendar, CreditCard, Shield } from "lucide-react";

interface NotificationSetting {
    id: string;
    label: string;
    description: string;
    icon: any;
    email: boolean;
    push: boolean;
}

export default function Page() {
    const router = useRouter();
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;

    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<NotificationSetting[]>([
        {
            id: "event_reminder",
            label: "Pengingat Event",
            description: "Dapatkan notifikasi sebelum event dimulai",
            icon: Calendar,
            email: true,
            push: true,
        },
        {
            id: "transaction",
            label: "Transaksi",
            description: "Notifikasi untuk pembelian dan pembayaran",
            icon: CreditCard,
            email: true,
            push: true,
        },
        {
            id: "promo",
            label: "Promo & Diskon",
            description: "Info tentang promo dan diskon terbaru",
            icon: Megaphone,
            email: true,
            push: false,
        },
        {
            id: "new_event",
            label: "Event Baru",
            description: "Notifikasi saat ada event baru yang mungkin Anda suka",
            icon: Bell,
            email: true,
            push: false,
        },
        {
            id: "security",
            label: "Keamanan",
            description: "Notifikasi login dan aktivitas akun",
            icon: Shield,
            email: true,
            push: true,
        },
    ]);

    const handleToggle = (id: string, type: "email" | "push") => {
        setSettings((prev) =>
            prev.map((setting) =>
                setting.id === id
                    ? { ...setting, [type]: !setting[type] }
                    : setting
            )
        );
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // TODO: Integrate with API to save notification settings
            // const config = {
            //     url: `${process.env.NEXT_PUBLIC_URL_API}/users/notifications`,
            //     method: "PUT",
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //         "Content-Type": "application/json",
            //     },
            //     data: JSON.stringify({ settings }),
            // };
            // await axios(config);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Pengaturan notifikasi berhasil disimpan!", {
                position: "top-right",
            });
        } catch (error: any) {
            toast.error("Gagal menyimpan pengaturan", {
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Pengaturan Notifikasi"
                headerSubTitle="Kelola preferensi notifikasi Anda"
                className="p-0 gap-0"
            >
                <div className="w-full p-6 space-y-6">
                    {/* Notification Channels Info */}
                    <Card className="p-4 bg-purple-50 border-purple-100">
                        <div className="flex gap-4">
                            <div className="flex-1 flex items-center gap-3">
                                <Mail className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="font-medium text-purple-800">Email</p>
                                    <p className="text-sm text-purple-600">
                                        Notifikasi dikirim ke email terdaftar
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="font-medium text-purple-800">Push</p>
                                    <p className="text-sm text-purple-600">
                                        Notifikasi langsung ke perangkat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Notification Settings */}
                    <Card className="p-6">
                        <h3 className="font-bold text-lg mb-6">Jenis Notifikasi</h3>
                        <div className="space-y-6">
                            {settings.map((setting) => (
                                <div
                                    key={setting.id}
                                    className="flex items-start justify-between py-4 border-b last:border-0"
                                >
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <setting.icon className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{setting.label}</p>
                                            <p className="text-sm text-gray-500">
                                                {setting.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`${setting.id}-email`}
                                                checked={setting.email}
                                                onCheckedChange={() =>
                                                    handleToggle(setting.id, "email")
                                                }
                                            />
                                            <Label
                                                htmlFor={`${setting.id}-email`}
                                                className="text-sm text-gray-500"
                                            >
                                                Email
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`${setting.id}-push`}
                                                checked={setting.push}
                                                onCheckedChange={() =>
                                                    handleToggle(setting.id, "push")
                                                }
                                            />
                                            <Label
                                                htmlFor={`${setting.id}-push`}
                                                className="text-sm text-gray-500"
                                            >
                                                Push
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                            Kembali
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                        >
                            {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
                        </Button>
                    </div>
                </div>
            </WrapperCard>
        </section>
    );
}
