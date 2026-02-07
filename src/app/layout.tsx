"use client";
import React from "react";
import { Providers } from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./static-pages.css";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/next";

// Clerk
import {
    ClerkProvider,
} from "@clerk/nextjs";

import Navbar from "@/components/structural/navbar/Navbar";
import {Container} from "@/components/structural/container/Container";
import MainContainer from "@/components/structural/main/Main";
import Footer from "@/components/structural/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{
            elements: {
                footer: "hidden",
            },
        }}>
            <html lang="en" suppressHydrationWarning>
            <head>
                <title>Link-N-Sync Service</title>
                <meta property="twitter:image" content="Twitter link preview image URL"/>
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:title" content="Link-N-Sync Service"/>
                <meta property="twitter:description"
                      content="ICal Consolidation for Short Term Vacation Rental Property Managers"/>
                <meta property="description"
                      content="Link-N-Sync, the ICal Consolidation for Short Term Vacation Rental Property Managers."/>
                <meta property="og:image" content="Link preview image URL"/>
                <meta property="og:site_name" content="Link-N-Sync Service"/>
                <meta property="og:title" content="Link-N-Sync Service"/>
                <meta property="og:description"
                      content="Link-N-Sync, the ICal Consolidation for Short Term Vacation Rental Property Managers."/>
                <meta property="og:url" content="https://linknsync.app"/>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <Providers>
                <Navbar />
                <Container className={"py-20 min-h-[800]px"}>
                    <MainContainer>
                        {children}
                    </MainContainer>
                </Container>
                <Container className={"flex flex-col text-center"}>
                    <Footer />
                </Container>
            </Providers>
            <Analytics />
            </body>
            </html>
        </ClerkProvider>
    );
}
