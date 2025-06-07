import React from 'react';

export const CardFooter = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className="px-4 my-2 pb-2 flex items-center"
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';