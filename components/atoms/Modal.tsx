"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div 
                ref={modalRef}
                className={cn(
                    "relative w-full max-w-lg rounded-2xl bg-surface-dark border border-surface-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-surface-border bg-background-dark/50">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display">
                        {title}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="size-10 rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-surface-border transition-all cursor-pointer"
                    >
                        <Icon name="close" size="md" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
