"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useAccessToken } from "@/hooks/use-access-token";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Calendar,
    ArrowLeft,
} from "lucide-react";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const { accessToken } = useAccessToken();

    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-user-detail", params?.id],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/users/${params?.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                )
            ).json(),
        enabled: !!params?.id && !!accessToken,
    });

    const user = data?.data;

    const getRoleColor = (role: string) => {
        const colorMap: Record<string, string> = {
            super_admin: "bg-rose-500/15 text-rose-400 border-rose-500/30",
            admin: "bg-primary/15 text-primary",
            member: "bg-sky-500/15 text-sky-400 border-sky-500/30",
            user: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
            guest: "bg-muted text-foreground",
        };
        return colorMap[role] || "bg-muted text-foreground";
    };

    if (isLoading) {
        return (
            <section className="w-full">
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Detail User"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-8 text-center text-muted-foreground">
                        Memuat data...
                    </div>
                </WrapperCard>
            </section>
        );
    }

    if (error || !user) {
        return (
            <section className="w-full">
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Detail User"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-8 text-center text-red-500">
                        User tidak ditemukan
                    </div>
                    <div className="px-8 pb-8">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>
                </WrapperCard>
            </section>
        );
    }

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Detail User"
                headerSubTitle=""
                className="p-0 gap-0"
                buttonUrlComponent={
                    <div className="flex items-center gap-2">
                        <Badge className={user?.isActive ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"}>
                            {user?.isActive ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                        <Badge className={getRoleColor(user?.role)}>
                            {user?.role || "-"}
                        </Badge>
                    </div>
                }
            >
                <div className="w-full p-6">
                    <div className="space-y-6">
                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-24 h-24 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-12 h-12 text-primary" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-1">
                                    {user?.fullname || user?.username || "User"}
                                </h2>
                                <p className="text-muted-foreground mb-3">@{user?.username}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <span>{user?.email || "-"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <span>{user?.phonenumber || "-"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span>
                                            Bergabung:{" "}
                                            {user?.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString(
                                                      "id-ID",
                                                      {
                                                          day: "numeric",
                                                          month: "long",
                                                          year: "numeric",
                                                      }
                                                  )
                                                : "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail Cards */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Personal Info */}
                            <Card className="p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Informasi Pribadi
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                                        <p className="font-medium">{user?.fullname || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Username</p>
                                        <p className="font-medium">{user?.username || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{user?.email || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                                        <p className="font-medium">{user?.phonenumber || "-"}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Address */}
                            <Card className="p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Alamat
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Jalan</p>
                                        <p className="font-medium">{user?.address?.street || "-"}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Kota</p>
                                            <p className="font-medium">{user?.address?.city || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Provinsi</p>
                                            <p className="font-medium">{user?.address?.province || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Kode Pos</p>
                                            <p className="font-medium">{user?.address?.postalCode || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Negara</p>
                                            <p className="font-medium">{user?.address?.country || "Indonesia"}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Account Info */}
                            <Card className="p-6 md:col-span-2">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Informasi Akun
                                </h3>
                                <div className="grid gap-4 md:grid-cols-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">ID Akun</p>
                                        <p className="font-mono text-sm">{user?._id || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Role</p>
                                        <Badge className={getRoleColor(user?.role)}>
                                            {user?.role || "-"}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge className={user?.isActive ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"}>
                                            {user?.isActive ? "Aktif" : "Tidak Aktif"}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                                        <p className="font-medium">
                                            {user?.createdAt
                                                ? new Date(user.createdAt).toLocaleString("id-ID")
                                                : "-"}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>
                </div>
            </WrapperCard>
        </section>
    );
}
