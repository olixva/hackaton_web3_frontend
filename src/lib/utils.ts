// Imports utilities for handling CSS classes
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function that combines CSS classes using clsx and resolves Tailwind conflicts with twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
