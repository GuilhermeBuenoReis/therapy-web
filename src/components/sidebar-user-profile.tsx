import { Link } from '@tanstack/react-router';
import { Separator } from './ui/separator';

export function SidebarUserProfile() {
	return (
		<div className='mt-4'>
			<Separator className='mb-3 bg-border/80' />

			<div className='rounded-md border border-sidebar-border/60 bg-sidebar-accent/60 px-3 py-3 shadow-sm'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary'>
						MS
					</div>

					<div className='flex flex-col leading-none'>
						<span className='text-sm font-semibold'>Dr. Guilherme Bueno</span>
						<span className='text-xs text-muted-foreground'>Psicóloga</span>
					</div>
				</div>

				<Link
					to='/app/profile'
					className='mt-3 inline-flex w-full items-center justify-center rounded-sm bg-primary/5 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10'
				>
					Ver perfil
				</Link>
			</div>
		</div>
	);
}
