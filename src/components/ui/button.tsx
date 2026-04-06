import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

// Need to install class-variance-authority for standard shadcn-like variants, 
// OR I can just do manual classes if I didn't install it. 
// I didn't install 'class-variance-authority'. I will use manual cn merging.

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";

        const variants = {
            primary: "bg-primary text-white hover:bg-orange-600 shadow-[0_4px_14px_0_rgba(244,106,37,0.39)] hover:shadow-[0_6px_20px_rgba(244,106,37,0.23)] transition-all duration-200 ease-in-out",
            secondary: "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
        };

        return (
            <motion.button
                whileTap={{ scale: 0.98 }}
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children as React.ReactNode}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';
