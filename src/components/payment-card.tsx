import {
	type Payment,
	paymentColumns,
} from '@/components/table/payment-columns';
import { PaymentDataTable } from '@/components/table/payment-data-table';
import { cn } from '@/lib/utils';

const currency = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

const samplePayments: Payment[] = [
	{
		id: '1',
		date: '2024-12-19',
		patient: 'João Santos',
		session: 'Sessão individual - 50min',
		amount: 1200,
		status: 'pending',
	},
	{
		id: '2',
		date: '2024-12-17',
		patient: 'Maria Oliveira',
		session: 'Sessão online - 50min',
		amount: 4200,
		status: 'paid',
	},
	{
		id: '3',
		date: '2024-12-14',
		patient: 'Pedro Costa',
		session: 'Sessão presencial - 50min',
		amount: 3050,
		status: 'paid',
	},
];

export function PaymentCard() {
	const totals = samplePayments.reduce(
		(acc, payment) => {
			acc.month += payment.amount;
			if (payment.status === 'pending') acc.pending += payment.amount;
			if (payment.status === 'paid') acc.received += payment.amount;
			return acc;
		},
		{ month: 0, pending: 0, received: 0 }
	);

	const summary = [
		{
			label: 'This Month',
			value: totals.month,
			className: 'text-sky-600',
			cardClassName:
				'bg-sky-50/60 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/50',
		},
		{
			label: 'Pending',
			value: totals.pending,
			className: 'text-amber-500',
			cardClassName:
				'bg-amber-50/70 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40',
		},
		{
			label: 'Received',
			value: totals.received,
			className: 'text-emerald-600',
			cardClassName:
				'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40',
		},
	];

	return (
		<section className='rounded-xl border border-border/60 bg-card shadow-sm'>
			<div className='grid gap-3 border-b border-border/60 px-5 py-4 md:grid-cols-3'>
				{summary.map((item) => (
					<div
						key={item.label}
						className={cn(
							'rounded-xl border px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]',
							item.cardClassName
						)}
					>
						<p className='text-sm font-semibold text-muted-foreground'>
							{item.label}
						</p>
						<p
							className={cn('text-2xl font-bold leading-tight', item.className)}
						>
							{currency.format(item.value)}
						</p>
					</div>
				))}
			</div>

			<div className='px-5 py-5'>
				<PaymentDataTable
					columns={paymentColumns((paymentId) =>
						console.log('Ver detalhes do pagamento', paymentId)
					)}
					data={samplePayments}
				/>
			</div>
		</section>
	);
}
