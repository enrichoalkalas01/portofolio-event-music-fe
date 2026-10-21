import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LoginForm } from "@/components/pages/authentication/login-form";
import AuthShell from "@/components/pages/authentication/auth-shell";

export const metadata: Metadata = { title: "Masuk" };

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect("/");
    }

    return (
        <AuthShell>
            <LoginForm />
        </AuthShell>
    );
}
