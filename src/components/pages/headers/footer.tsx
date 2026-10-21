import Link from "next/link";
import { Instagram, Mail, MapPin, Music2, Twitter, Youtube } from "lucide-react";

import { SITE_NAME } from "@/lib/config";

const EXPLORE = [
    { href: "/events", label: "Semua Event" },
    { href: "/events/coming-soon", label: "Segera Hadir" },
    { href: "/events?category=Festival", label: "Festival" },
    { href: "/events?category=Konser", label: "Konser" },
];

const HELP = [
    { href: "/faq", label: "FAQ" },
    { href: "/contact-us", label: "Hubungi Kami" },
    { href: "/terms-and-condition", label: "Syarat & Ketentuan" },
    { href: "/privacy-policy", label: "Kebijakan Privasi" },
];

const COMPANY = [
    { href: "/about-us", label: "Tentang Kami" },
    { href: "/dashboard", label: "Akun Saya" },
    { href: "/dashboard/events", label: "Tiket Saya" },
];

export default function Footers() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-card/40 mt-auto">
            <div className="w-full max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <div className="flex flex-col gap-5">
                    <Link href="/" className="flex items-center gap-2.5">
                        <img
                            width={32}
                            height={32}
                            src="/logo.png"
                            className="brightness-0 invert w-8 h-8"
                            alt=""
                        />
                        <span className="font-bold tracking-tight">
                            Endless<span className="text-primary">Music</span>
                        </span>
                    </Link>
                    <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                        Platform pembelian tiket event musik terpercaya di Indonesia.
                        Temukan konser, festival, dan acara musik favoritmu, lalu
                        hadiri dengan mudah dan aman.
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                            <MapPin className="size-4 text-primary" /> Jakarta, Indonesia
                        </span>
                        <a
                            href="mailto:halo@endlessmusic.id"
                            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                        >
                            <Mail className="size-4 text-primary" /> halo@endlessmusic.id
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        {[
                            { icon: Instagram, label: "Instagram" },
                            { icon: Twitter, label: "Twitter" },
                            { icon: Youtube, label: "YouTube" },
                            { icon: Music2, label: "Spotify" },
                        ].map(({ icon: Icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                            >
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <FooterColumn title="Jelajahi" links={EXPLORE} />
                <FooterColumn title="Bantuan" links={HELP} />
                <FooterColumn title="Perusahaan" links={COMPANY} />
            </div>

            <div className="border-t border-border">
                <div className="w-full max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>
                        &copy; {year} {SITE_NAME}. Hak cipta dilindungi.
                    </span>
                    <span>
                        Dibuat oleh Enricho Alkalas &middot; Didukung Endless Creative Corp
                    </span>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { href: string; label: string }[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
            </h3>
            <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                    <li key={link.href + link.label}>
                        <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
