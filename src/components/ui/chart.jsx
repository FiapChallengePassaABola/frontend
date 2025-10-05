import * as React from "react"
import { cn } from "../../lib/utils"

const ChartContainer = React.forwardRef(({ className, config, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-[300px]", className)} {...props}>
    <div className="h-full w-full">
      {React.cloneElement(children, { config })}
    </div>
  </div>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className)} {...props}>
    {children}
  </div>
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef(({ className, active, payload, label, ...props }, ref) => {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      <div className="grid gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{payload[0].value}</span>
          </div>
        </div>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">
                {entry.name}
              </span>
            </div>
            <span className="text-xs font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }

