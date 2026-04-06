import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    className={cn(
                        "flex h-11 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out hover:border-gray-300 dark:hover:border-gray-700",
                        icon && "pl-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';
