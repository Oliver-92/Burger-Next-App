"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import { saveProfile } from "@/app/actions/profile";
import { profileSchema, type ProfileFormData } from "@/lib/schemas/profile";
import type { UserProfile } from "@/lib/types";

// ─── Field helper ────────────────────────────────────────────────────────────
function Field({
    label,
    id,
    type = "text",
    placeholder,
    error,
    hint,
    registration,
    disabled = false,
}: {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    error?: string;
    hint?: string;
    registration: Record<string, unknown>;
    disabled?: boolean;
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
                disabled={disabled}
                className={cn(
                    "w-full rounded-xl bg-surface-dark border px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 outline-none transition-colors",
                    "focus:border-primary focus:ring-1 focus:ring-primary/30",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
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
            {hint && !error && (
                <p className="text-xs text-text-secondary">{hint}</p>
            )}
        </div>
    );
}

// ─── Props ───────────────────────────────────────────────────────────────────
type ProfileFormProps = {
    email: string;
    existingProfile: UserProfile | null;
};

// ─── ProfileForm ─────────────────────────────────────────────────────────────
export function ProfileForm({ email, existingProfile }: ProfileFormProps) {
    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<{ success: boolean; message: string }>({
        success: false,
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        mode: "onBlur",
        resolver: zodResolver(profileSchema),
        values: existingProfile
            ? {
                first_name: existingProfile.first_name ?? "",
                last_name: existingProfile.last_name ?? "",
                age: existingProfile.age ?? "",
                phone: existingProfile.phone ?? "",
                address: existingProfile.address ?? "",
            }
            : undefined,
    });

    // ─── Form submit handler ─────────────────────────────────────────────────
    function onFormSubmit(data: ProfileFormData) {
        startTransition(async () => {
            const result = await saveProfile(data);
            setState(result);
        });
    }

    // Reset RHF when action succeeds (optimistic UX)
    useEffect(() => {
        if (state.success) {
            // Re-sync with saved values — do nothing since form doesn't clear
        }
    }, [state.success, reset]);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5">
            {/* Email (read-only, pre-filled from auth) */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-text-secondary">
                    Email
                </label>
                <div className="relative">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        readOnly
                        className="w-full rounded-xl bg-surface-dark/50 border border-surface-border px-4 py-3 text-sm text-text-secondary outline-none cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
                            Verificado
                        </span>
                    </div>
                </div>
                <p className="text-xs text-text-secondary">
                    El email está asociado a tu cuenta y no se puede cambiar aquí.
                </p>
            </div>

            {/* Row: first name + last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                    label="Nombre"
                    id="first_name"
                    placeholder="Juan"
                    error={errors.first_name?.message}
                    registration={register("first_name")}
                />
                <Field
                    label="Apellido"
                    id="last_name"
                    placeholder="García"
                    error={errors.last_name?.message}
                    registration={register("last_name")}
                />
            </div>

            {/* Row: age + phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                    label="Edad"
                    id="age"
                    type="number"
                    placeholder="25"
                    error={errors.age?.message}
                    registration={register("age")}
                />
                <Field
                    label="Teléfono"
                    id="phone"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    error={errors.phone?.message}
                    registration={register("phone")}
                />
            </div>

            {/* Address */}
            <Field
                label="Dirección"
                id="address"
                placeholder="Av. Corrientes 1234, CABA"
                error={errors.address?.message}
                hint="Usaremos esta dirección como entrega predeterminada."
                registration={register("address")}
            />

            {/* Server feedback */}
            {state.message && (
                <div
                    className={cn(
                        "rounded-xl border px-4 py-3 text-sm flex items-center gap-2",
                        state.success
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                    )}
                >
                    <Icon
                        name={state.success ? "check_circle" : "error"}
                        size="sm"
                        className="shrink-0"
                    />
                    {state.message}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-background-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(54,226,123,0.3)]"
            >
                {isPending ? "Guardando..." : "Guardar Datos"}
            </button>
        </form>
    );
}
