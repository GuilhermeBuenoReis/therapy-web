import { Bell } from 'lucide-react';
import { Button } from './ui/button';

export function DashboardHeader() {
	return (
		<header className='flex items-center justify-end gap-4 pb-4'>
			<Button
				variant='ghost'
				size='icon'
				className='relative text-muted-foreground hover:text-foreground'
				aria-label='Notificações'
			>
				<Bell className='size-5' />
				<span className='absolute right-2 top-2 block size-2 rounded-full bg-destructive' />
			</Button>
		</header>
	);
}
