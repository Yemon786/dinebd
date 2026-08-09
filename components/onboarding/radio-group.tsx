"use client";

import { cn } from "@/lib/utils";

interface RadioOptionGroupProps {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioOptionGroup({
  name,
  options,
  value,
  onChange,
}: RadioOptionGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isChecked = value === option;
        return (
          <label
            key={option}
            className={cn(
              "relative flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 rounded-full border text-sm cursor-pointer transition-colors select-none",
              isChecked
                ? "bg-primary/10 border-primary text-primary font-semibold"
                : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "w-3.5 h-3.5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                isChecked ? "border-primary" : "border-gray-300"
              )}
            >
              {isChecked && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </span>
            {option}
          </label>
        );
      })}
    </div>
  );
}
