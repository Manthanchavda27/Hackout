import * as React from "react";

function Badge({ className, variant, ...props }) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = variant === "secondary" ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className || ''}`} {...props} />
  );
}

export { Badge };