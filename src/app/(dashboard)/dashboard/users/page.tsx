"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const session: any = useSession();
    const user = session?.data?.user;

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Profil Saya"
                headerSubTitle="Informasi akun Anda"
                className="p-0 gap-0"
                buttonUrlComponent={
                    <Link href="/dashboard/users/edit">
                        <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profil
                        </Button>
                    </Link>
                }
            >
                <div className="w-full p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Profile Card */}
                        <Card className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">
                                        {user?.name || "User"}
                                    </h2>
                                    <p className="text-gray-500">Member</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5 text-purple-600" />
                                    <span>{user?.email || "-"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="w-5 h-5 text-purple-600" />
                                    <span>{user?.phone || "-"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                    <span>{user?.address || "-"}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Account Info */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Informasi Akun</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">ID Akun</p>
                                    <p className="font-mono text-sm">
                                        {user?.id || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status Akun</p>
                                    <p className="text-green-600 font-medium">Aktif</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tipe Akun</p>
                                    <p>{user?.role || "User"}</p>
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
                        <Link href="/contact-us">
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="font-medium">Bantuan</h4>
                                <p className="text-sm text-gray-500">
                                    Hubungi customer service
                                </p>
                            </Card>
                        </Link>
                    </div>
                </div>
            </WrapperCard>
        </section>
    );
}
