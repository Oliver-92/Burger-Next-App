import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CartItem, CartStore } from "@/lib/types";

// Helper to generate a unique ID based on product ID and its customizations
export const generateUniqueId = (item: Omit<CartItem, "id">) => {
    const extrasIds = item.selectedExtras
        .map((e) => e.id)
        .sort()
        .join(",");
    const removedIds = item.removedIngredients.sort().join(",");
    const notes = item.notes?.trim().toLowerCase() ?? "";
    return `${item.product.id}-${extrasIds}-${removedIds}-${notes}`;
};

export const useCartStore = create<CartStore>()(
    persist(
        immer((set, get) => {
            const updateTotals = (state: CartStore) => {
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => {
                    const extrasTotal = item.selectedExtras.reduce(
                        (extraSum, extra) => extraSum + extra.price,
                        0
                    );
                    return sum + (item.product.price + extrasTotal) * item.quantity;
                }, 0);
            };

            return {
                items: [],
                isOpen: false,
                totalItems: 0,
                totalPrice: 0,

                setIsOpen: (isOpen) => {
                    set((state) => {
                        state.isOpen = isOpen;
                    });
                },

                addItem: (newItem) => {
                    set((state) => {
                        const id = generateUniqueId(newItem);
                        const existingItem = state.items.find((item) => item.id === id);

                        if (existingItem) {
                            existingItem.quantity += newItem.quantity;
                        } else {
                            state.items.push({ ...newItem, id });
                        }
                        updateTotals(state);
                    });
                },

                removeItem: (id) => {
                    set((state) => {
                        state.items = state.items.filter((item) => item.id !== id);
                        updateTotals(state);
                    });
                },

                updateQuantity: (id, quantity) => {
                    set((state) => {
                        const item = state.items.find((i) => i.id === id);
                        if (item) {
                            item.quantity = Math.max(1, quantity);
                        }
                        updateTotals(state);
                    });
                },

                clearCart: () => {
                    set((state) => {
                        state.items = [];
                        updateTotals(state);
                    });
                },

                setItems: (items) => {
                    set((state) => {
                        state.items = items;
                        updateTotals(state);
                    });
                },

                isSyncing: false,
                setIsSyncing: (isSyncing) => {
                    set((state) => {
                        state.isSyncing = isSyncing;
                    });
                },
            };
        }),
        {
            name: "burgerbrand-cart",
            // Explicitly handle hydration if needed, but default is usually fine
            // unless there's a version mismatch or similar.
        }
    )
);
