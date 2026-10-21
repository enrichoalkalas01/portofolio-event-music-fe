import Link from "next/link";
import { Music2, ShieldCheck, Ticket, Zap } from "lucide-react";

import { SITE_NAME } from "@/lib/config";

const POINTS = [
    { icon: Ticket, text: "E-ticket resmi langsung di akunmu" },
    { icon: ShieldCheck, text: "Pembayaran aman via QRIS, e-wallet, dan VA" },
    { icon: Zap, text: "Checkout cepat, tanpa antre" },
];

export default function AuthShell({
    children,
    image = "/bg-event-music.jpg",
}: {
    children: React.ReactNode;
    image?: string;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                            <Music2 className="size-4" />
                        </div>
                        Endless<span className="text-primary">Music</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center py-6">
                    <div className="w-full max-w-sm">{children}</div>
                </div>
                <p className="text-center md:text-left text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} {SITE_NAME}
                </p>
            </div>
            <div className="relative hidden lg:block overflow-hidden">
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-12 flex flex-col gap-6 text-white">
                    <h2 className="text-3xl font-bold leading-tight max-w-md">
                        Musik terbaik, pengalaman langsung, tiket di genggaman.
                    </h2>
                    <ul className="flex flex-col gap-3 text-sm text-white/85">
                        {POINTS.map(({ icon: Icon, text }) => (
                            <li key={text} className="inline-flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 border border-white/15">
                                    <Icon className="size-4 text-primary" />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
