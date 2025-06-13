import React from 'react';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => (
  <p
    ref={ref}
    className="text-sm text-gray-500"
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';