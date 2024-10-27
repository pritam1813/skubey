import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-neutral-200 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-neutral-950 focus:tw-ring-offset-2 dark:tw-border-neutral-800 dark:focus:tw-ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "tw-border-transparent tw-bg-neutral-900 tw-text-neutral-50 tw-shadow hover:tw-bg-neutral-900/80 dark:tw-bg-neutral-50 dark:tw-text-neutral-900 dark:hover:tw-bg-neutral-50/80",
        secondary:
          "tw-border-transparent tw-bg-neutral-100 tw-text-neutral-900 hover:tw-bg-neutral-100/80 dark:tw-bg-neutral-800 dark:tw-text-neutral-50 dark:hover:tw-bg-neutral-800/80",
        destructive:
          "tw-border-transparent tw-bg-red-500 tw-text-neutral-50 tw-shadow hover:tw-bg-red-500/80 dark:tw-bg-red-900 dark:tw-text-neutral-50 dark:hover:tw-bg-red-900/80",
        outline: "tw-text-neutral-950 dark:tw-text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
