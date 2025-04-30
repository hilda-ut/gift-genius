import React from "react";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} className="p-4 pt-2 h-1/4" {...props} />
));

CardContent.displayName = "CardContent";