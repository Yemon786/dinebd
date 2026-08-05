"use client";

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
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
