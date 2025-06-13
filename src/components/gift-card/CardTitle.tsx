import React from 'react';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ ...props }, ref) => (
  <h3
    ref={ref}
    className= "text-lg font-bold leading-none tracking-tight"
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';