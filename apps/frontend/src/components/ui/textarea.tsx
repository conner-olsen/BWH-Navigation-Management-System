import * as React from "react";

import cn from "../../lib/utils.ts";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {label:string;}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex w-full",
                "h-16 px-2 py-2 text-lg",  // Adjusted padding and height
                "rounded-full border border-black bg-transparent",
                "ring-offset-background placeholder:text-muted-foreground", "placeholder:align-middle",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "flex items-center",
               // Center the text vertically
                className
            )}
            ref={ref}
            {...props}
        />


    );
  }
);
Textarea.displayName = "Textarea";

export {Textarea};
