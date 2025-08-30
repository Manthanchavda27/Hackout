import * as React from "react";

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90";
  const sizeClasses = size === "sm" ? "h-9 rounded-md px-3" : "h-10 px-4 py-2";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };