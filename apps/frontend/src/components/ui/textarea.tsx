import * as React from "react";

import cn from "../../lib/utils.ts";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "border border-border bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
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
