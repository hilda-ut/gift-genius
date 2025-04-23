import React from "react";

export const CardFooter = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className="p-4 pt-0 flex items-center"
    {...props}
  />
));

CardFooter.displayName = "CardFooter";