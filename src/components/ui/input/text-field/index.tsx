import * as React from "react";

import { cn } from "@/lib/utils";

function TextInput({
  id,
  label,
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-lg mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive read-only:pointer-events-none read-only:opacity-60",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default TextInput;
