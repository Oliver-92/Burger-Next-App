"use client";

import { Icon } from "@/components/atoms/Icon";
import { Badge } from "@/components/atoms/Badge";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AdminUserTableProps {
    users: UserProfile[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-surface-border bg-surface-dark/30 backdrop-blur-md shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-surface-border bg-background-dark/50">
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider">Contacto</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider">Dirección</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider text-center">Rol</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white group-hover:text-primary transition-colors">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs text-text-secondary">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-text-secondary">
                                {user.phone || "Sin teléfono"}
                            </td>
                            <td className="px-6 py-4 text-sm text-text-secondary max-w-[200px] truncate">
                                {user.address || "Sin dirección"}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Badge 
                                    label={user.role} 
                                    variant={user.role === "admin" ? "green" : "dark"} 
                                />
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center gap-3 opacity-40">
                                    <Icon name="group" size="lg" />
                                    <p className="font-bold">No se encontraron usuarios</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
