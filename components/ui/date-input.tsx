"use client"

import * as React from "react"
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"

// Converts an ISO "YYYY-MM-DD" value to "DD/MM/YYYY".
export function formatDisplayDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return value
  const [, year, month, day] = match
  return `${day}/${month}/${year}`
}

type DateInputProps = Omit<React.ComponentProps<"input">, "type" | "value"> & {
  value: string
}

// Native date picker that always displays its value as DD/MM/YYYY,
// regardless of the browser locale. The value stays ISO "YYYY-MM-DD".
function DateInput({ className, value, onClick, ...props }: DateInputProps) {
  return (
    <div className="relative">
      <input
        type="date"
        data-slot="input"
        value={value}
        onClick={(e) => {
          try {
            e.currentTarget.showPicker?.()
          } catch {
            // showPicker can throw if not triggered by a user gesture
          }
          onClick?.(e)
        }}
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <div
        aria-hidden="true"
        className={cn(
          "border-input dark:bg-input/30 pointer-events-none flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm",
          "peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-[3px]",
          className
        )}
      >
        <span className={value ? "" : "text-muted-foreground"}>
          {value ? formatDisplayDate(value) : "DD/MM/YYYY"}
        </span>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}

export { DateInput }
