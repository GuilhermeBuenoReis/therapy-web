import { Link, type LinkProps, useMatchRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
	icon: ReactNode;
	title: string;
	to: LinkProps['to'];
}

export function SidebarItem({ icon, title, to }: SidebarItemProps) {
	const matchRoute = useMatchRoute();
	const isActive = !!matchRoute({ to, fuzzy: false });

	return (
		<Link
			to={to}
			className={cn(
				'flex w-full items-center justify-start gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-foreground/10',
				isActive
					? 'bg-sidebar-foreground/5 text-sidebar-foreground'
					: 'text-sidebar-foreground'
			)}
		>
			<span className='text-sm'>{icon}</span>
			<span className='leading-none'>{title}</span>
		</Link>
	);
}
