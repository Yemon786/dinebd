"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  ({ id, title, children, className }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        className={cn(
          "mb-16 scroll-mt-20", // scroll-mt for header offset
          className
        )}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          {title}
        </h2>
        {children}
      </div>
    );
  }
);

FormSection.displayName = "FormSection";
export default FormSection;