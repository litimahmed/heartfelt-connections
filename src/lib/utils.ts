/**
 * Utility Functions
 * 
 * This file contains common utility functions used throughout the application.
 * 
 * @module utils
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind CSS classes
 * 
 * This function takes multiple class values and intelligently merges them,
 * handling Tailwind class conflicts by keeping the last occurrence.
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // Conditionally applies classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
