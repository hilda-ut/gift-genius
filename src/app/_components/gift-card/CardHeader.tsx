import React from "react"

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col space-y-1.5 p-4 pb-2"
    {...props}
  />
));

CardHeader.displayName = "CardHeader";