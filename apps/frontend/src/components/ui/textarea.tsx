import * as React from "react";

import cn from "../../lib/utils.ts";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(

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
