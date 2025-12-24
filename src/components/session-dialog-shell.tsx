import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

type SessionDialogShellProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
};

export function SessionDialogShell({
	open,
	onOpenChange,
	children,
}: SessionDialogShellProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button className='cursor-pointer'>Nova sessão</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agendar sessão</DialogTitle>
					<DialogDescription>
						Preencha as informações para criar uma nova sessão.
					</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
}
