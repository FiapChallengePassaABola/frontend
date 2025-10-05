import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-dark-800/50 border-dark-700 backdrop-blur-sm hover:bg-dark-800/70 transition-all duration-300",
    elevated: "bg-dark-800 border-dark-600 shadow-xl hover:shadow-2xl hover:bg-dark-700 transition-all duration-300",
    glass: "bg-dark-900/20 border-dark-700/50 backdrop-blur-md hover:bg-dark-900/30 transition-all duration-300",
    gradient: "bg-gradient-to-br from-dark-800 to-dark-900 border-dark-700 hover:from-dark-700 hover:to-dark-800 transition-all duration-300"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 group",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 p-6 pb-4", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-dark-100 group-hover:text-white transition-colors duration-300",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-dark-400 group-hover:text-dark-300 transition-colors duration-300", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between p-6 pt-4", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

