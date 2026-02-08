"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Shield,
    CreditCard,
    Ticket,
    Settings,
    Key,
    Bell,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken = user?.token?.access_token;

    // TODO: Integrate with API to get user profile
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

    // TODO: Integrate with API to get user statistics
    const { data: statsData } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions?size=100`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            ).json(),
        enabled: !!accessToken,
    });

    const profile = profileData?.data || user;
    const transactions = statsData?.data || [];
    const successTransactions = transactions.filter(
        (t: any) => t.status_transaction === "success"
    );

    const stats = [
        {
            label: "Total Transaksi",
            value: transactions.length || 0,
            icon: CreditCard,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Tiket Aktif",
            value: successTransactions.length || 0,
            icon: Ticket,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            label: "Event Dihadiri",
            value: 0, // TODO: Integrate with API
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
    ];

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Profil Saya"
                headerSubTitle="Kelola informasi profil Anda"
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
                        <div className="space-y-6">
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    {profile?.avatar ? (
                                        <img
                                            src={profile.avatar}
                                            alt="Avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-purple-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold">
                                            {profile?.firstname} {profile?.lastname || profile?.name || "User"}
                                        </h2>
                                        <Badge className="bg-green-100 text-green-800">
                                            Aktif
                                        </Badge>
                                    </div>
                                    <p className="text-gray-500 mb-4">
                                        {profile?.bio || "Belum ada bio"}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-purple-600" />
                                            <span>{profile?.email || "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-purple-600" />
                                            <span>{profile?.phonenumber || profile?.phone || "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-purple-600" />
                                            <span>
                                                Bergabung:{" "}
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
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid gap-4 md:grid-cols-3">
                                {stats.map((stat, index) => (
                                    <Card key={index} className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                                <p className="text-sm text-gray-600">{stat.label}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Profile Details */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Personal Information */}
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <User className="w-5 h-5 text-purple-600" />
                                        Informasi Pribadi
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Nama Depan</p>
                                                <p className="font-medium">
                                                    {profile?.firstname || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Nama Belakang</p>
                                                <p className="font-medium">
                                                    {profile?.lastname || "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{profile?.email || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nomor Telepon</p>
                                            <p className="font-medium">
                                                {profile?.phonenumber || profile?.phone || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tanggal Lahir</p>
                                            <p className="font-medium">
                                                {profile?.birthdate
                                                    ? new Date(profile.birthdate).toLocaleDateString(
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
                                        <div>
                                            <p className="text-sm text-gray-500">Jenis Kelamin</p>
                                            <p className="font-medium">
                                                {profile?.gender === "male"
                                                    ? "Laki-laki"
                                                    : profile?.gender === "female"
                                                    ? "Perempuan"
                                                    : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Address Information */}
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-purple-600" />
                                        Alamat
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Alamat Lengkap</p>
                                            <p className="font-medium">
                                                {profile?.address || "-"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Kota</p>
                                                <p className="font-medium">{profile?.city || "-"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Provinsi</p>
                                                <p className="font-medium">
                                                    {profile?.province || "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Kode Pos</p>
                                                <p className="font-medium">
                                                    {profile?.postalCode || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Negara</p>
                                                <p className="font-medium">
                                                    {profile?.country || "Indonesia"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Account Information */}
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-purple-600" />
                                        Informasi Akun
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">ID Akun</p>
                                            <p className="font-mono text-sm">
                                                {profile?.id || profile?._id || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tipe Akun</p>
                                            <p className="font-medium capitalize">
                                                {profile?.role || "User"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status Verifikasi</p>
                                            <Badge
                                                className={
                                                    profile?.isVerified
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }
                                            >
                                                {profile?.isVerified
                                                    ? "Terverifikasi"
                                                    : "Belum Terverifikasi"}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Terakhir Login</p>
                                            <p className="font-medium">
                                                {profile?.lastLogin
                                                    ? new Date(profile.lastLogin).toLocaleString(
                                                          "id-ID"
                                                      )
                                                    : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Quick Settings */}
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-purple-600" />
                                        Pengaturan Cepat
                                    </h3>
                                    <div className="space-y-3">
                                        <Link href="/dashboard/profile/edit">
                                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Edit className="w-5 h-5 text-gray-600" />
                                                    <span>Edit Profil</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </div>
                                        </Link>
                                        <Link href="/dashboard/profile/change-password">
                                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Key className="w-5 h-5 text-gray-600" />
                                                    <span>Ubah Password</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </div>
                                        </Link>
                                        <Link href="/dashboard/profile/notifications">
                                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Bell className="w-5 h-5 text-gray-600" />
                                                    <span>Notifikasi</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </div>
                                        </Link>
                                    </div>
                                </Card>
                            </div>

                            {/* Quick Links */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <Link href="/dashboard/transactions">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <h4 className="font-medium">Riwayat Transaksi</h4>
                                                <p className="text-sm text-gray-500">
                                                    Lihat semua transaksi
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                                <Link href="/dashboard/events">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                                        <div className="flex items-center gap-3">
                                            <Ticket className="w-6 h-6 text-green-600" />
                                            <div>
                                                <h4 className="font-medium">Tiket Saya</h4>
                                                <p className="text-sm text-gray-500">
                                                    Lihat tiket yang dibeli
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                                <Link href="/contact-us">
                                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-6 h-6 text-purple-600" />
                                            <div>
                                                <h4 className="font-medium">Bantuan</h4>
                                                <p className="text-sm text-gray-500">
                                                    Hubungi customer service
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </WrapperCard>
        </section>
    );
}
