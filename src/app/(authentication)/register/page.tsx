import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { RegisterForm } from "@/components/pages/authentication/register-form";
import AuthShell from "@/components/pages/authentication/auth-shell";

export const metadata: Metadata = { title: "Daftar" };

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect("/");
    }

    return (
        <AuthShell image="/music-event-banner-2.jpg">
            <RegisterForm />
        </AuthShell>
    );
}
