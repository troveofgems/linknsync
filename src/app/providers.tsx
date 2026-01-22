"use client";
import React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/theme-provider";

export const Providers = (
    {
        children
    }:
    {
        children: React.ReactNode
    }) => (
    <>
        <Toaster />
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </>
);
