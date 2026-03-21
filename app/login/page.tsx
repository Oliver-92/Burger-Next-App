import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/organisms/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login — BurgerBrand | Sabor Urbano Real",
    description: "Inicia sesión o crea tu cuenta en BurgerBrand.",
};

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return (
        <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
            <AuthForm />
        </main>
    );
}
