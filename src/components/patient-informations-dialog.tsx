import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { ReactNode } from 'react';
import { useState } from 'react';
import 'dayjs/locale/pt-br';
import { PatientUpdateSheet } from '@/components/patient-update';
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

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export type PatientStatus = 'active' | 'inactive';

export type Patient = {
	id: string;
	name: string;
	email: string;
	phone: string;
	birthDate: string;
	lastSession: Date;
	status: PatientStatus;
	note: string | null;
	createdAt: string;
	updatedAt: string | null;
};

const statusStyles: Record<PatientStatus, string> = {
	active:
		'border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-100',
	inactive:
		'border border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200',
};

export function getStatusBadgeClass(status: PatientStatus, extra?: string) {
	return cn(
		'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
		statusStyles[status],
		extra
	);
}

export function formatRelativeDate(date: Date) {
	const parsed = dayjs(date);
	if (!parsed.isValid()) return '';
	return parsed.fromNow();
}

type PatientInformationsDialogProps = {
	patient: Patient;
	children?: ReactNode;
	onDeleted?: (id: string) => void;
};

function formatDateString(date: string) {
	const parsed = dayjs(date);
	return parsed.isValid() ? parsed.format('DD/MM/YYYY') : date;
}

function formatTimeString(date: string) {
	const parsed = dayjs(date);
	return parsed.isValid() ? parsed.format('HH:mm') : '';
}

export function PatientInformationsDialog({
	patient,
	children,
	onDeleted,
}: PatientInformationsDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const createdAtDate = formatDateString(patient.createdAt);
	const createdAtTime = formatTimeString(patient.createdAt);

	const updatedAtDate = patient.updatedAt
		? formatDateString(patient.updatedAt)
		: null;
	const updatedAtTime = patient.updatedAt
		? formatTimeString(patient.updatedAt)
		: null;

	async function handleDeletePatient() {
		setIsDeleting(true);
		await fetch(`/api/patients/${patient.id}`, { method: 'DELETE' });
		onDeleted?.(patient.id);
		setIsDeleting(false);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children ?? (
					<Button
						type='button'
						variant='outline'
						size='sm'
						className='rounded-full px-4 font-semibold'
					>
						View
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='sm:max-w-xl'>
				<DialogHeader className='gap-3 text-left'>
					<div className='flex items-center gap-2'>
						<div
							className={getStatusBadgeClass(
								patient.status,
								'px-2 py-0.5 text-xs'
							)}
						>
							{patient.status === 'active' ? 'Active' : 'Inactive'}
						</div>
						<span className='text-xs text-muted-foreground'>
							Última sessão: {formatRelativeDate(patient.lastSession)}
						</span>
					</div>
					<DialogTitle className='text-xl'>{patient.name}</DialogTitle>
					<p className='text-sm text-muted-foreground'>{patient.email}</p>
				</DialogHeader>

				<div className='grid gap-3 rounded-lg border border-border/70 bg-muted/30 p-4'>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Contato
						</span>
						<span className='font-semibold'>{patient.phone}</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Data de nascimento
						</span>
						<span className='font-semibold'>
							{formatDateString(patient.birthDate)}
						</span>
					</div>
					<div className='grid gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							Notas
						</span>
						<span className='text-sm text-foreground'>
							{patient.note?.trim()
								? patient.note
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
							{createdAtDate}{' '}
							{createdAtTime ? (
								<span className='text-muted-foreground'>{createdAtTime}</span>
							) : null}
						</p>
					</div>
					<div className='space-y-1 rounded-lg border border-border/60 bg-background p-3'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							Atualizado em
						</p>
						{updatedAtDate ? (
							<p className='font-semibold'>
								{updatedAtDate}{' '}
								{updatedAtTime ? (
									<span className='text-muted-foreground'>{updatedAtTime}</span>
								) : null}
							</p>
						) : (
							<p className='text-muted-foreground'>Nunca atualizado</p>
						)}
					</div>
				</div>

				<DialogFooter className='pt-2 sm:w-full sm:justify-between'>
					<DialogClose asChild>
						<Button
							type='button'
							variant='destructive'
							className='w-full sm:flex-1 px-5 cursor-pointer'
							onClick={handleDeletePatient}
							disabled={isDeleting}
						>
							{isDeleting ? 'Excluindo...' : 'Excluir paciente'}
						</Button>
					</DialogClose>
					<PatientUpdateSheet patient={patient}>
						<Button
							type='button'
							className='w-full sm:flex-1 px-5 cursor-pointer'
						>
							Atualizar informações
						</Button>
					</PatientUpdateSheet>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
