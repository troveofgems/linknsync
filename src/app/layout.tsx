"use client";
import React/*, {useEffect}*/ from "react";
import { Providers } from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
    ClerkProvider,
} from "@clerk/nextjs";

import Navbar from "@/components/structural/navbar/Navbar";
import {Container} from "@/components/structural/container/Container";
import MainContainer from "@/components/structural/main/Main";
import Footer from "@/components/structural/footer/Footer";
/*import {initializeAppJobScheduler} from "@/cron/app.system.actions";*/

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
/*    useEffect(() => {
        initializeAppJobScheduler();
    });*/

    return (
        <ClerkProvider appearance={{
            elements: {
                footer: "hidden",
            },
        }}>
            <html lang="en" suppressHydrationWarning>
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
            </body>
            </html>
        </ClerkProvider>
    );
}
