"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore, generateUniqueId } from "@/lib/store/useCart";
import { getUserCart, syncUserCart } from "@/app/actions/cart";
import type { CartItem } from "@/lib/types";

/**
 * Headless component to synchronize local cart state with Supabase.
 * Handles:
 * - Data merging on login
 * - Active state persistence
 * - Background syncing
 */
export function CartSync() {
    const items = useCartStore((state) => state.items);
    const setItems = useCartStore((state) => state.setItems);
    const clearCart = useCartStore((state) => state.clearCart);
    const setIsSyncing = useCartStore((state) => state.setIsSyncing);
    const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstLoad = useRef(true);
    const isHydrating = useRef(false);

    useEffect(() => {
        const supabase = createClient();

        // ── 1. Initial Load & Auth Change ───────────────────────────────────
        const handleAuthChange = async (userId: string | null) => {
            if (!userId) return;

            isHydrating.current = true;
            try {
                // Fetch remote cart
                const remoteRawItems = await getUserCart();

                // ❗ Standardize IDs for remote items before merging
                const remoteItems = remoteRawItems.map(item => ({
                    ...item,
                    id: generateUniqueId(item)
                }));

                const localItems = useCartStore.getState().items;

                // Merge Logic: Immutable merge using a Map to identify unique items by ID
                const mergedMap = new Map<string, CartItem>();

                // Add local items first
                localItems.forEach(item => mergedMap.set(item.id, { ...item }));

                // Merge remote items
                remoteItems.forEach(remoteItem => {
                    const existing = mergedMap.get(remoteItem.id);
                    if (existing) {
                        // IMMUTABLE UPDATE: Create a new object for existing entry
                        mergedMap.set(remoteItem.id, {
                            ...existing,
                            quantity: Math.max(existing.quantity, remoteItem.quantity)
                        });
                    } else {
                        mergedMap.set(remoteItem.id, { ...remoteItem });
                    }
                });

                const merged = Array.from(mergedMap.values());
                setItems(merged);
                
                // Immediately sync merge result to DB
                await syncUserCart(merged);
            } finally {
                // Extended timeout to ensure the background sync effect sees the updated state
                setTimeout(() => {
                    isHydrating.current = false;
                }, 800);
            }
        };

        // Get initial user
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) handleAuthChange(data.user.id);
        });

        // Listen for login/logout
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
                handleAuthChange(session.user.id);
            } else if (event === "SIGNED_OUT") {
                // ❗ ENFORCE PRIVACY: Clear local cart when user logs out
                clearCart();
            }
        });

        return () => listener.subscription.unsubscribe();
    }, [setItems, clearCart]);

    // ── 2. Background Syncing ───────────────────────────────────────────────
    useEffect(() => {
        // Skip syncing on initial load or during hydration
        if (isFirstLoad.current || isHydrating.current) {
            if (isFirstLoad.current) isFirstLoad.current = false;
            return;
        }

        const sync = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                setIsSyncing(true);
                try {
                    await syncUserCart(items);
                } finally {
                    setIsSyncing(false);
                }
            }
        };

        // Debounce sync 1.5 seconds
        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(sync, 1500);

        return () => {
            if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        }
    }, [items, setIsSyncing]);

    return null; // Headless
}
