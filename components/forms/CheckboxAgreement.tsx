"use client";

import { Button } from "@/components/ui/button";

interface CheckboxAgreementProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export default function CheckboxAgreement({
  checked,
  onChange,
  label,
}: CheckboxAgreementProps) {
  return (
    <div className="space-y-6 pt-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded border-2 border-gray-300 accent-orange-500 cursor-pointer"
        />
        <span className="text-gray-700">{label}</span>
      </label>
    </div>
  );
}
