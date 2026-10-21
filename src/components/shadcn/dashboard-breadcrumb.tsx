"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

const LABELS: Record<string, string> = {
    dashboard: "Dashboard",
    admin: "Admin",
    events: "Event",
    "events-saved": "Event Tersimpan",
    transactions: "Transaksi",
    profile: "Profil",
    edit: "Edit",
    "change-password": "Ubah Password",
    notifications: "Notifikasi",
    users: "Pengguna",
    "coming-soons": "Segera Hadir",
    files: "File",
    upload: "Unggah",
    "system-params": "System Params",
    "system-params-type": "Tipe System Params",
    template: "Template",
    create: "Buat Baru",
    update: "Ubah",
};

const isId = (segment: string) => /^[0-9a-f]{24}$/i.test(segment);

export default function DashboardBreadcrumb() {
    const pathname = usePathname() ?? "/";
    const segments = pathname.split("/").filter(Boolean);

    const items = segments.map((segment, index) => ({
        href: "/" + segments.slice(0, index + 1).join("/"),
        label: isId(segment) ? "Detail" : LABELS[segment] || decodeURIComponent(segment),
        isLast: index === segments.length - 1,
    }));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <Fragment key={item.href}>
                        {index > 0 && <BreadcrumbSeparator className="hidden sm:block" />}
                        <BreadcrumbItem className={index < items.length - 1 ? "hidden sm:block" : ""}>
                            {item.isLast ? (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
