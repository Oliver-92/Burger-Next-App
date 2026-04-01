"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import { createClient } from "@/lib/supabase/client";
import {
    loginSchema,
    registerSchema,
    type LoginFormData,
    type RegisterFormData,
} from "@/lib/schemas/auth";

// ─── Tab type ──────────────────────────────────────────────────────────────
type TabMode = "login" | "register";

// ─── Input Field helper ────────────────────────────────────────────────────
function Field({
    label,
    id,
    type = "text",
    placeholder,
    error,
    registration,
}: {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    error?: string;
    registration: Record<string, unknown>;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-semibold text-text-secondary">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={cn(
                    "w-full rounded-xl bg-surface-dark border px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 outline-none transition-colors",
                    "focus:border-primary focus:ring-1 focus:ring-primary/30",
                    error ? "border-red-500" : "border-surface-border"
                )}
                {...registration}
            />
            {error && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                    <Icon name="close" size="sm" className="shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Login Form ─────────────────────────────────────────────────────────────
function LoginForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    async function onSubmit(data: LoginFormData) {
        setServerError(null);
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setServerError("Email o contraseña incorrectos");
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Field
                label="Email"
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                registration={register("email")}
            />
            <Field
                label="Contraseña"
                id="login-password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                registration={register("password")}
            />
            {serverError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                    {serverError}
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-background-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(54,226,123,0.3)]"
            >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
        </form>
    );
}

// ─── Register Form ───────────────────────────────────────────────────────────
function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

    async function onSubmit(data: RegisterFormData) {
        setServerError(null);
        const supabase = createClient();

        const { data: signUpData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setServerError(error.message ?? "Error al registrarse");
            return;
        }

        // If Supabase returns a session immediately, email confirmation is OFF → auto-login
        if (signUpData.session) {
            router.push("/");
            router.refresh();
            return;
        }

        // Email confirmation is ON → ask user to check their inbox
        setEmailSent(true);
    }

    if (emailSent) {
        return (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="size-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Icon name="mark_email_read" size="lg" className="text-primary" />
                </div>
                <p className="text-white font-semibold">Revisa tu correo</p>
                <p className="text-sm text-text-secondary">
                    Te enviamos un enlace de confirmación. Una vez confirmado, podrás iniciar sesión.
                </p>
                <button
                    onClick={onSuccess}
                    className="mt-2 text-sm font-semibold text-primary hover:brightness-110 transition-all"
                >
                    Ir al inicio de sesión →
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Field
                label="Email"
                id="register-email"
                type="email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                registration={register("email")}
            />
            <Field
                label="Contraseña"
                id="register-password"
                type="password"
                placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                error={errors.password?.message}
                registration={register("password")}
            />
            <Field
                label="Confirmar contraseña"
                id="register-confirm"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                registration={register("confirmPassword")}
            />
            {serverError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                    {serverError}
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-background-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(54,226,123,0.3)]"
            >
                {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
        </form>
    );
}

// ─── Main AuthForm ───────────────────────────────────────────────────────────
export function AuthForm() {
    const [mode, setMode] = useState<TabMode>("login");

    return (
        <div className="w-full max-w-md">
            {/* Card */}
            <div className="rounded-2xl border border-surface-border bg-surface-dark shadow-[0_0_60px_rgba(54,226,123,0.08)] overflow-hidden">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 px-8 pt-8 pb-6 border-b border-surface-border">
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_20px_rgba(54,226,123,0.4)]">
                        <Icon name="lunch_dining" size="lg" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
                    </h1>
                    <p className="text-sm text-text-secondary text-center">
                        {mode === "login"
                            ? "Inicia sesión para continuar en BurgerBrand"
                            : "Únete a la comunidad BurgerBrand"}
                    </p>
                </div>

                {/* Tab switcher */}
                <div className="flex border-b border-surface-border">
                    {(["login", "register"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setMode(tab)}
                            className={cn(
                                "flex-1 py-3.5 text-sm font-semibold transition-colors",
                                mode === tab
                                    ? "text-primary border-b-2 border-primary bg-primary/5"
                                    : "text-text-secondary hover:text-white"
                            )}
                        >
                            {tab === "login" ? "Iniciar Sesión" : "Registrarse"}
                        </button>
                    ))}
                </div>

                {/* Form body */}
                <div className="px-8 py-8">
                    {mode === "login" ? (
                        <LoginForm />
                    ) : (
                        <RegisterForm onSuccess={() => setMode("login")} />
                    )}
                </div>
            </div>
        </div>
    );
}
