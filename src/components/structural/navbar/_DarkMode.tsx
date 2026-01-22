"use client";

import React, {useEffect, useState} from "react";
import { Moon, Sun/*, Cog*/ } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true); // Once Mounted, Allow Component to Proceed
    }, []);

    // Without this, Hydration Errors will occur.
    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    { (!!theme && theme.includes("light")) && (
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                        )
                    }
                    { (!!theme && theme.includes("dark")) &&(
                        <Moon className="relative h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    )}
                    {/*{
                        (!!theme && theme.includes("system")) &&(
                            <Cog className="relative h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        )
                    }*/}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                {/*<DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>*/}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
