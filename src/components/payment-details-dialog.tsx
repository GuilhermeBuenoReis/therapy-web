import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type PaymentStatus = 'pending' | 'paid' | 'overdue';

type PaymentStatusStyle = {
	label: string;
	className: string;
	dotColor: string;
};

type PaymentDetails = {
	id: string;
	date: string;
	patient: string;
	session: string;
	amount: number;
	status: PaymentStatus;
	patientEmail?: string;
	patientPhone?: string;
	method?: string;
	note?: string;
	createdAt?: string;
	updatedAt?: string | null;
};

type PaymentDetailsDialogProps = {
	payment: PaymentDetails;
	statusInfo?: PaymentStatusStyle;
	onViewDetails?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	children: ReactNode;
};

const currency = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

const fallbackStatus: Record<PaymentStatus, PaymentStatusStyle> = {
	paid: {
		label: 'Pago',
		className:
			'border border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-900/40 dark:text-emerald-50',
		dotColor: '#059669',
	},
	pending: {
		label: 'Pendente',
		className:
			'border border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/40 dark:text-amber-50',
		dotColor: '#d97706',
	},
	overdue: {
		label: 'Atrasado',
		className:
			'border border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-900/50 dark:bg-rose-900/40 dark:text-rose-50',
		dotColor: '#e11d48',
	},
};

function formatDate(date?: string | null, withTime = false) {
	if (!date) return 'Não informado';
	const parsed = dayjs(date);
	if (!parsed.isValid()) return date;
	return withTime
		? parsed.format('DD/MM/YYYY HH:mm')
		: parsed.format('DD/MM/YYYY');
}

export function PaymentDetailsDialog({
	payment,
	statusInfo,
	onEdit,
	onDelete,
	children,
}: PaymentDetailsDialogProps) {
	dayjs.locale('pt-br');
	const tint = statusInfo ?? fallbackStatus[payment.status];

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className='sm:max-w-xl'>
				<DialogHeader className='gap-2 text-left'>
					<div className='flex items-center gap-2'>
						<span
							className={cn(
								'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
								tint.className
							)}
						>
							<span
								className='size-2.5 rounded-full'
								style={{ backgroundColor: tint.dotColor }}
							/>
							{tint.label}
						</span>
						<span className='text-xs text-muted-foreground'>
							Recebido em {formatDate(payment.date)}
						</span>
					</div>
					<DialogTitle className='text-2xl'>{payment.patient}</DialogTitle>
					{payment.patientEmail ? (
						<p className='text-sm text-muted-foreground'>
							{payment.patientEmail}
						</p>
					) : null}
				</DialogHeader>

				<div className='grid gap-3 rounded-lg border border-border/70 bg-muted/30 p-4'>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Contato
						</span>
						<span className='font-semibold'>
							{payment.patientPhone ?? 'Não informado'}
						</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Sessão
						</span>
						<span className='font-semibold'>{payment.session}</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Valor
						</span>
						<span className='font-semibold'>
							{currency.format(payment.amount)}
						</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Método
						</span>
						<span className='font-semibold'>
							{payment.method ?? 'Não informado'}
						</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Notas
						</span>
						<span className='text-sm text-foreground'>
							{payment.note?.trim()
								? payment.note
								: 'Nenhuma anotação adicionada.'}
						</span>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-3 text-sm'>
					<div className='space-y-1 rounded-lg border border-border/60 bg-background p-3'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							Criado em
						</p>
						<p className='font-semibold'>
							{formatDate(payment.createdAt, true)}
						</p>
					</div>
					<div className='space-y-1 rounded-lg border border-border/60 bg-background p-3'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							Atualizado em
						</p>
						<p className='font-semibold'>
							{payment.updatedAt
								? formatDate(payment.updatedAt, true)
								: 'Nunca atualizado'}
						</p>
					</div>
				</div>

				<DialogFooter className='pt-2 sm:w-full sm:justify-between'>
					<DialogClose asChild>
						<Button
							type='button'
							variant='destructive'
							className='w-full sm:flex-1 px-5 cursor-pointer'
							onClick={() => onDelete?.(payment.id)}
						>
							Excluir pagamento
						</Button>
					</DialogClose>
					<Button
						type='button'
						className='w-full sm:flex-1 px-5 cursor-pointer bg-blue-600 hover:bg-blue-700'
						onClick={() => onEdit?.(payment.id)}
					>
						Atualizar informações
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export type { PaymentDetails };
