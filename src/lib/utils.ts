/**
 * General Tailwind Export - DO NOT MOVE. THIS FEEDS SHADCN UI
 * */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
