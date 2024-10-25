import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "tw-flex tw-min-h-[60px] tw-w-full tw-rounded-md tw-border tw-border-neutral-200 tw-bg-transparent tw-px-3 tw-py-2 tw-text-sm tw-shadow-sm placeholder:tw-text-neutral-500 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-neutral-950 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-neutral-800 dark:placeholder:tw-text-neutral-400 dark:focus-visible:tw-ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
