import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { PaymentDetailsDialog } from '@/components/payment-details-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PaymentStatus = 'pending' | 'paid' | 'overdue';

export type PaymentRow = {
	id: string;
	date: string;
	patient: string;
	session: string;
	amount: number;
	status: PaymentStatus;
};

const currency = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

const statusStyles: Record<
	PaymentStatus,
	{ label: string; className: string; dotColor: string }
> = {
	paid: {
		label: 'Paid',
		className:
			'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-900/60',
		dotColor: '#10b981',
	},
	pending: {
		label: 'Pending',
		className:
			'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-900/60',
		dotColor: '#f59e0b',
	},
	overdue: {
		label: 'Overdue',
		className:
			'bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-900/30 dark:text-rose-100 dark:border-rose-900/60',
		dotColor: '#e11d48',
	},
};

const paymentStatusInfo = statusStyles;

function formatDate(date: string) {
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return date;
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	}).format(parsed);
}

const paymentColumns = (
	onViewDetails: (paymentId: string) => void
): ColumnDef<PaymentRow>[] => [
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => (
			<span className='text-sm font-semibold text-foreground'>
				{formatDate(row.original.date)}
			</span>
		),
		meta: {
			cellClassName: 'pl-5 pr-2',
		},
	},
	{
		accessorKey: 'patient',
		header: 'Patient',
		cell: ({ row }) => (
			<span className='text-sm font-semibold text-foreground'>
				{row.original.patient}
			</span>
		),
		meta: {
			cellClassName: 'px-4',
		},
	},
	{
		accessorKey: 'session',
		header: 'Session',
		cell: ({ row }) => (
			<span className='text-sm font-semibold text-sky-600 dark:text-sky-300'>
				{row.original.session}
			</span>
		),
		meta: {
			cellClassName: 'px-4',
		},
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row }) => (
			<span className='text-sm font-semibold text-foreground'>
				{currency.format(row.original.amount)}
			</span>
		),
		meta: {
			cellClassName: 'px-4',
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = statusStyles[row.original.status];
			return (
				<span
					className={cn(
						'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
						status.className
					)}
				>
					<span
						className='size-2.5 rounded-full'
						style={{ backgroundColor: status.dotColor }}
					/>
					{status.label}
				</span>
			);
		},
		meta: {
			cellClassName: 'px-4',
		},
	},
	{
		id: 'actions',
		header: () => <span className='sr-only'>Ações</span>,
		cell: ({ row }) => {
			const status = statusStyles[row.original.status];
			return (
				<div className='flex justify-end pr-5'>
					<PaymentDetailsDialog
						payment={{ ...row.original }}
						statusInfo={status}
						onViewDetails={onViewDetails}
						onEdit={(id) => console.log('Editar pagamento', id)}
						onDelete={(id) => console.log('Excluir pagamento', id)}
					>
						<Button
							type='button'
							variant='ghost'
							size='icon-sm'
							className='rounded-full font-semibold cursor-pointer'
						>
							<EllipsisVertical className='size-4' />
						</Button>
					</PaymentDetailsDialog>
				</div>
			);
		},
	},
];

type Payment = PaymentRow;

export { paymentColumns, paymentStatusInfo, type PaymentStatus };
export type { Payment };
