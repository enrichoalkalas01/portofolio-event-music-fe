"use client"

import React, { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogOverlay,
    DialogPortal
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";

import { X } from "lucide-react"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

// Utils
import { cn } from "@/lib/utils";

// Store
import { useDialogStore } from "./store/dialog-store";

interface IWrapperDialog {
    children: React.ReactNode;
    headerStatus?: boolean;
    headerTitle?: string;
    headerTitleDescription?: string;
    footerStatus?: boolean;
    footerComponent?: React.ReactNode;
    propsDialogOverlay?: { [key: string]: any };
    propsDialogContent?: { [key: string]: any };
    propsDialogHeader?: { [key: string]: any };
    propsDialogTitle?: { [key: string]: any };
    propsDialogDescription?: { [key: string]: any };
    propsDialogFooter?: { [key: string]: any };
    propsContent?: { [key: string]: any };
}

export function WrapperDialog({
    children,
    headerStatus = false,
    headerTitle = "",
    headerTitleDescription = "",
    footerStatus = false,
    footerComponent,
    propsDialogOverlay = {},
    propsDialogContent = {},
    propsDialogHeader = {},
    propsDialogTitle = {},
    propsDialogDescription = {},
    propsDialogFooter = {},
    propsContent = {},
}: IWrapperDialog) {
    const { statusDialog, setStatusDialog } = useDialogStore()

    return (
        <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
            {/* <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setStatusDialog(true)}>Close</Button>
            </DialogTrigger> */}
            
            {/* Menggunakan Portal untuk merender dialog di luar hirarki utama */}
            <DialogPortal>

                {/* Overlay untuk efek latar belakang */}
                <DialogOverlay {...propsDialogOverlay} className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
                    propsDialogOverlay?.className,
                )} />

                {/* Content */}
                <DialogContent {...propsDialogContent} className={cn(
                    "sm:max-w-[500px]",
                    propsDialogContent?.className,
                )}>
                    {/* Tombol Close */}
                    {/* <DialogClose className="absolute right-4 top-4 text-white hover:text-red-500">
                        <X className="w-6 h-6" />
                    </DialogClose> */}

                    {/* Header Content */}
                    <DialogHeader {...propsDialogHeader}>
                        {headerStatus ? (
                            <>
                                <DialogTitle {...propsDialogTitle} className={cn("text-xl font-semibold", propsDialogTitle?.className)}>
                                    {headerTitle}
                                </DialogTitle>
                                <DialogDescription {...propsDialogDescription} >
                                    {headerTitleDescription}
                                </DialogDescription>
                            </>
                        ) : (
                            <VisuallyHidden>
                                <DialogTitle></DialogTitle>
                            </VisuallyHidden>
                        )}
                    </DialogHeader>

                    {/* Content */}
                    <div className={cn("w-auto gap-4 py-4", propsContent)}>
                        {children}
                    </div>

                    {/* Footer */}
                    <DialogFooter {...propsDialogFooter}>
                    {
                        footerStatus ? footerComponent : (
                            <VisuallyHidden>
                                <DialogTitle></DialogTitle>
                            </VisuallyHidden>
                        )
                    }
                    </DialogFooter>

                </DialogContent>

            </DialogPortal>
        </Dialog>
    );
}
