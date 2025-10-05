import * as React from "react"
import { cn } from "../../lib/utils"

const buttonVariants = {
  variant: {
    default: "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-300",
    destructive: "bg-error hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300",
    secondary: "bg-dark-700 hover:bg-dark-600 text-dark-100 transition-all duration-300",
    ghost: "hover:bg-dark-800 text-dark-300 hover:text-dark-100 transition-all duration-300",
    link: "text-primary-600 underline-offset-4 hover:underline transition-all duration-300",
    gradient: "bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
  },
  size: {
    default: "h-10 px-4 py-2 text-sm font-medium",
    sm: "h-8 px-3 text-xs font-medium",
    lg: "h-12 px-8 text-base font-semibold",
    xl: "h-14 px-10 text-lg font-bold",
    icon: "h-10 w-10"
  }
}

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  loading = false,
  disabled = false,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </Comp>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }

