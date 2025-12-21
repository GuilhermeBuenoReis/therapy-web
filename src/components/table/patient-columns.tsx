import type { ColumnDef } from '@tanstack/react-table';
import {
	formatRelativeDate,
	getStatusBadgeClass,
	type Patient,
	PatientInformationsDialog,
} from '@/components/patient-informations-dialog';
import { Button } from '@/components/ui/button';

function getInitial(name: string) {
	const [first] = name.trim();
	return first ? first.toUpperCase() : '?';
}

export const patientColumns: ColumnDef<Patient>[] = [
	{
		accessorKey: 'name',
		header: 'Paciente',
		cell: ({ row }) => {
			const patient = row.original;

			return (
				<div className='flex items-center gap-3'>
					<div className='flex size-10 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-100 dark:ring-sky-900/70'>
						{getInitial(patient.name)}
					</div>
					<div className='leading-tight'>
						<p className='font-semibold text-foreground'>{patient.name}</p>
						<p className='text-xs text-muted-foreground'>{patient.email}</p>
					</div>
				</div>
			);
		},
		meta: {
			headerClassName: 'px-4 py-3 font-semibold',
			cellClassName: 'px-4 py-4',
		},
	},
	{
		accessorKey: 'phone',
		header: 'Contato',
		cell: ({ row }) => (
			<span className='text-muted-foreground'>{row.original.phone}</span>
		),
		meta: {
			headerClassName: 'px-4 py-3 font-semibold',
			cellClassName: 'px-4 py-4 text-muted-foreground',
		},
	},
	{
		accessorKey: 'lastSession',
		header: 'Última sessão',
		cell: ({ row }) => (
			<span className='text-muted-foreground'>
				{formatRelativeDate(row.original.lastSession)}
			</span>
		),
		meta: {
			headerClassName: 'px-4 py-3 font-semibold',
			cellClassName: 'px-4 py-4 text-muted-foreground',
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<span className={getStatusBadgeClass(row.original.status)}>
				{row.original.status === 'active' ? 'Active' : 'Inactive'}
			</span>
		),
		meta: {
			headerClassName: 'px-4 py-3 font-semibold',
			cellClassName: 'px-4 py-4',
		},
	},
	{
		id: 'actions',
		header: () => <div className='text-right'>Ações</div>,
		cell: ({ row }) => (
			<div className='text-right'>
				<PatientInformationsDialog patient={row.original}>
					<Button
						type='button'
						variant='outline'
						size='sm'
						className='rounded-full px-4 font-semibold'
					>
						View
					</Button>
				</PatientInformationsDialog>
			</div>
		),
		meta: {
			headerClassName: 'px-4 py-3 font-semibold text-right',
			cellClassName: 'px-4 py-4',
		},
	},
];

export type { Patient } from '@/components/patient-informations-dialog';
