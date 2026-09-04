import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-brand-900 text-brand-50 hover:bg-brand-900/80",
    secondary: "border-transparent bg-brand-100 text-brand-900 hover:bg-brand-100/80",
    destructive: "border-transparent bg-red-500 text-brand-50 hover:bg-red-500/80",
    outline: "text-brand-950",
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
