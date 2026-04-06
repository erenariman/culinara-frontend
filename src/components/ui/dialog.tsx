'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

const DialogContext = React.createContext<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}>({
    open: false,
    onOpenChange: () => { },
});

export function Dialog({ children, open, onOpenChange }: { children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <DialogContext.Provider value={{ open, onOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
    const { onOpenChange } = React.useContext(DialogContext);

    // If asChild is true, we should clone the child and add the onClick handler
    // But for simplicity in this custom implementation without Slot, we'll wrap it or just clone if it's a valid element.
    // Simplifying: Just wrap in a div or span if not valid, but let's try to clone.

    if (React.isValidElement(children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const childElement = children as React.ReactElement<any>;
        return React.cloneElement(childElement, {
            onClick: (e: React.MouseEvent) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                childElement.props.onClick?.(e);
                onOpenChange(true);
            }
        });
    }

    return (
        <div onClick={() => onOpenChange(true)}>
            {children}
        </div>
    );
}

export function DialogContent({ children, className }: { children: React.ReactNode, className?: string }) {
    const { open, onOpenChange } = React.useContext(DialogContext);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pt-4 pb-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className={cn(
                            "relative z-50 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg duration-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
                            "max-h-[90vh] overflow-y-auto custom-scrollbar", // Constrain height and scroll
                            className
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                    >
                        {children}
                        <Button
                            variant="ghost"
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                            onClick={() => onOpenChange(false)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
    )
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
    )
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
    )
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
}
