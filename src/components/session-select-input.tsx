import type * as React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseSelectClassName =
	'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

const SessionSelectInput = forwardRef<
	HTMLSelectElement,
	React.ComponentProps<'select'>
>(function SessionSelectInput({ className, children, ...props }, ref) {
	return (
		<select ref={ref} className={cn(baseSelectClassName, className)} {...props}>
			{children}
		</select>
	);
});

export { SessionSelectInput, baseSelectClassName };
