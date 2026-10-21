import Link from "next/link";
import { ArrowRight, BadgeCheck, QrCode, Smartphone, WalletCards } from "lucide-react";

import ComingSoonHomepages from "@/components/pages/homepages/coming-soon";
import EventsHomepages from "@/components/pages/homepages/events-home";
import HeroHomepages from "@/components/pages/homepages/hero";
import { Button } from "@/components/shadcn/ui/button";

const FEATURES = [
    {
        icon: BadgeCheck,
        title: "Tiket resmi & terverifikasi",
        description: "Semua event dikurasi langsung bersama promotor resmi, tanpa calo.",
    },
    {
        icon: WalletCards,
        title: "Bayar sesuai caramu",
        description: "QRIS, GoPay, ShopeePay, hingga virtual account BCA dan BNI.",
    },
    {
        icon: QrCode,
        title: "E-ticket dengan QR code",
        description: "Tiket langsung tersimpan di akun, tinggal tunjukkan saat masuk venue.",
    },
    {
        icon: Smartphone,
        title: "Nyaman di semua perangkat",
        description: "Bisa dipasang sebagai aplikasi di HP, akses tiket kapan saja.",
    },
];

export default function Home() {
    return (
        <>
            <HeroHomepages />

            <section className="w-full border-y border-border bg-card/30">
                <div className="w-full max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="flex gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold text-foreground">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <EventsHomepages />

            <section className="w-full max-w-7xl mx-auto px-4">
                <div
                    className="relative w-full overflow-hidden rounded-3xl border border-border bg-cover bg-center min-h-[280px] flex items-center"
                    style={{ backgroundImage: "url('/Middle-Banner-Promo-Events.png')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
                    <div className="relative p-8 md:p-14 max-w-xl flex flex-col gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Promo & kolaborasi
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Punya event musik? Jual tiketnya di sini.
                        </h2>
                        <p className="text-muted-foreground">
                            Kelola penjualan, pantau transaksi, dan jangkau ribuan penggemar
                            musik dari satu dashboard.
                        </p>
                        <div>
                            <Button asChild>
                                <Link href="/contact-us">
                                    Hubungi tim kami <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <ComingSoonHomepages />
        </>
    );
}
