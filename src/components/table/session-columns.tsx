import type { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'canceled';

export type SessionScheduleRow = {
	id: string;
	start: string;
	patient: string;
	durationMinutes: number;
	price: number;
	status: SessionStatus;
};

const currency = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

const statusStyles: Record<
	SessionStatus,
	{ label: string; className: string; dotColor: string }
> = {
	scheduled: {
		label: 'Agendada',
		className:
			'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-800',
		dotColor: '#2563eb',
	},
	'in-progress': {
		label: 'Em andamento',
		className:
			'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/40 dark:text-purple-100 dark:border-purple-800',
		dotColor: '#8b5cf6',
	},
	completed: {
		label: 'Concluída',
		className:
			'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-800',
		dotColor: '#16a34a',
	},
	canceled: {
		label: 'Cancelada',
		className:
			'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-100 dark:border-red-800',
		dotColor: '#ef4444',
	},
};

const sessionStatusInfo = statusStyles;

const createSessionColumns = (
	onOpenDetails: (sessionId: string) => void
): ColumnDef<SessionScheduleRow>[] => [
	{
		accessorKey: 'start',
		header: 'Horário',
		cell: ({ row }) => (
			<span className='text-slate-900 dark:text-slate-50 text-lg font-bold'>
				{row.original.start}
			</span>
		),
		meta: {
			cellClassName: 'w-[84px] pl-5 pr-3 align-top',
		},
	},
	{
		id: 'details',
		header: 'Detalhes',
		cell: ({ row }) => {
			const session = row.original;
			return (
				<div className='flex flex-col gap-1 text-left'>
					<p className='text-base font-semibold text-slate-900 dark:text-slate-50'>
						{session.patient}
					</p>
					<p className='text-sm text-muted-foreground'>
						{session.durationMinutes} min • {currency.format(session.price)}
					</p>
				</div>
			);
		},
		meta: {
			cellClassName: 'pr-4',
		},
	},
	{
		id: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = statusStyles[row.original.status];
			return (
				<div className='flex items-center gap-2 justify-end'>
					<span
						className={cn(
							'px-3 py-1 text-[0.625rem] font-semibold rounded-md shadow-[0_1px_0_rgba(0,0,0,0.04)]',
							status.className
						)}
					>
						{status.label}
					</span>
					<Button
						type='button'
						variant='ghost'
						size='icon-sm'
						className='text-muted-foreground hover:text-foreground'
						aria-label='Mais opções'
						onClick={() => onOpenDetails(row.original.id)}
					>
						<MoreVertical className='size-4' />
					</Button>
				</div>
			);
		},
		meta: {
			cellClassName: 'w-[180px] pr-5 text-right',
		},
	},
];

export { createSessionColumns, sessionStatusInfo, type SessionStatus };
