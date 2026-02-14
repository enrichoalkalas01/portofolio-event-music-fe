"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { User, Mail, Phone, MapPin, Edit, Shield } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken = user?.token?.access_token;

    const { data: profileData, isLoading } = useQuery({
        queryKey: ["user-profile"],
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

    const profile = profileData?.data || user;

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Profil Saya"
                headerSubTitle="Informasi akun Anda"
                className="p-0 gap-0"
                buttonUrlComponent={
                    <Link href="/dashboard/profile/edit">
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profil
                        </Button>
                    </Link>
                }
            >
                <div className="w-full p-6">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            Memuat data...
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Profile Card */}
                                <Card className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                                            {profile?.avatar ? (
                                                <img
                                                    src={profile.avatar}
                                                    alt="Avatar"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-10 h-10 text-purple-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {profile?.fullname || profile?.username || "User"}
                                            </h2>
                                            <Badge className={profile?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                                {profile?.isActive ? "Aktif" : "Tidak Aktif"}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                            <span>{profile?.email || "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Phone className="w-5 h-5 text-purple-600" />
                                            <span>{profile?.phonenumber || "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                            <span>
                                                {[profile?.address?.street, profile?.address?.city, profile?.address?.province]
                                                    .filter(Boolean)
                                                    .join(", ") || "-"}
                                            </span>
                                        </div>
                                    </div>
                                </Card>

                                {/* Account Info */}
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-purple-600" />
                                        Informasi Akun
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Username</p>
                                            <p className="font-medium">
                                                {profile?.username || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">ID Akun</p>
                                            <p className="font-mono text-sm">
                                                {profile?.id || profile?._id || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tipe Akun</p>
                                            <p className="font-medium capitalize">{profile?.role || "User"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Bergabung Sejak</p>
                                            <p className="font-medium">
                                                {profile?.createdAt
                                                    ? new Date(profile.createdAt).toLocaleDateString(
                                                          "id-ID",
                                                          {
                                                              day: "numeric",
                                                              month: "long",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Quick Links */}
                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <Link href="/dashboard/transactions">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                        <h4 className="font-medium">Riwayat Transaksi</h4>
                                        <p className="text-sm text-gray-500">
                                            Lihat semua transaksi Anda
                                        </p>
                                    </Card>
                                </Link>
                                <Link href="/dashboard/events">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                        <h4 className="font-medium">Tiket Saya</h4>
                                        <p className="text-sm text-gray-500">
                                            Lihat tiket yang sudah dibeli
                                        </p>
                                    </Card>
                                </Link>
                                <Link href="/dashboard/profile">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                        <h4 className="font-medium">Profil Lengkap</h4>
                                        <p className="text-sm text-gray-500">
                                            Lihat profil lengkap Anda
                                        </p>
                                    </Card>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </WrapperCard>
        </section>
    );
}
