"use client";

import { useState, useEffect, useMemo } from "react";
import { AdminUserTable } from "@/components/molecules/AdminUserTable";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { getUsers } from "@/app/actions/admin";
import type { UserProfile } from "@/lib/types";
import LoadingSpinner from "@/app/loading";
import Link from "next/link";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filtered Users
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                (u.first_name + " " + u.last_name).toLowerCase().includes(searchLower) ||
                u.email.toLowerCase().includes(searchLower);
            const matchesRole = filterRole === "all" || u.role === filterRole;
            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, filterRole]);

    return (
        <div className="flex-1 flex flex-col pt-32 pb-12">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-40">
                {/* Admin Header */}
                <div className="mb-10 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                        <Icon name="arrow_back" size="sm" /> Volver al Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-display leading-none">
                        Lista de Usuarios
                    </h1>
                </div>

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-surface-border/50">
                        <div className="flex flex-1 w-full gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Icon name="search" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            {/* Role Filter */}
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value as any)}
                                className="h-12 px-4 rounded-xl bg-surface-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer min-w-[150px]"
                            >
                                <option value="all">Todos los roles</option>
                                <option value="admin">Administradores</option>
                                <option value="user">Usuarios regulares</option>
                            </select>
                        </div>

                        <Button
                            onClick={fetchUsers}
                            variant="secondary"
                            className="w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            <Icon name="refresh" size="sm" />
                            Actualizar
                        </Button>
                    </div>

                    {/* Content Table */}
                    {isLoading ? (
                        <div className="py-20">
                            <LoadingSpinner message="Obteniendo lista de usuarios..." />
                        </div>
                    ) : (
                        <AdminUserTable
                            users={filteredUsers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
