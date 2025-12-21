import { useMemo } from 'react';
import type { PatientFilterValues } from './patient-filter';
import { type Patient, patientColumns } from './table/patient-columns';
import { PatientDataTable } from './table/patient-data-table';

type PatientsTableProps = {
	filters: PatientFilterValues;
};

const dayInMs = 1000 * 60 * 60 * 24;

const patients: Patient[] = [
	{
		id: 'joao-santos',
		name: 'João Santos',
		email: 'joao@email.com',
		phone: '(11) 98765-4321',
		birthDate: '1987-04-12',
		lastSession: new Date(Date.now() - 2 * dayInMs),
		status: 'active',
		note: 'Prefere consultas no período da manhã.',
		createdAt: '2024-12-21T14:19:09.240Z',
		updatedAt: null,
	},
	{
		id: 'maria-oliveira',
		name: 'Maria Oliveira',
		email: 'maria@email.com',
		phone: '(11) 98765-4322',
		birthDate: '1992-08-05',
		lastSession: new Date(Date.now() - 7 * dayInMs),
		status: 'active',
		note: null,
		createdAt: '2024-11-15T10:02:00.000Z',
		updatedAt: '2024-12-01T18:30:00.000Z',
	},
	{
		id: 'pedro-costa',
		name: 'Pedro Costa',
		email: 'pedro@email.com',
		phone: '(11) 98765-4323',
		birthDate: '1984-02-22',
		lastSession: new Date(Date.now() - 21 * dayInMs),
		status: 'active',
		note: 'Em acompanhamento para ansiedade.',
		createdAt: '2024-10-10T09:00:00.000Z',
		updatedAt: null,
	},
	{
		id: 'ana-silva',
		name: 'Ana Silva',
		email: 'ana@email.com',
		phone: '(11) 98765-4324',
		birthDate: '1990-12-01',
		lastSession: new Date(Date.now() - 60 * dayInMs),
		status: 'inactive',
		note: null,
		createdAt: '2024-08-02T15:45:00.000Z',
		updatedAt: '2024-10-20T11:10:00.000Z',
	},
];

export function PatientsTable({ filters }: PatientsTableProps) {
	const filteredPatients = useMemo(() => {
		const normalizedFilter = filters.filter.trim().toLowerCase();
		const normalizedStatus = filters.status.toLowerCase();

		return patients.filter((patient) => {
			const matchesStatus =
				normalizedStatus === 'all' ||
				patient.status.toLowerCase() === normalizedStatus;

			if (!normalizedFilter) {
				return matchesStatus;
			}

			const matchableFields = [
				patient.name.toLowerCase(),
				patient.email.toLowerCase(),
				patient.phone.toLowerCase(),
			];

			const matchesQuery = matchableFields.some((field) =>
				field.includes(normalizedFilter)
			);

			return matchesStatus && matchesQuery;
		});
	}, [filters.filter, filters.status]);

	return (
		<div className='rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden'>
			<div className='flex items-center justify-between border-b border-border/60 px-5 py-4'>
				<div>
					<p className='text-lg font-semibold leading-tight'>Pacientes</p>
					<p className='text-sm text-muted-foreground'>
						Acompanhe os últimos contatos e status dos pacientes.
					</p>
				</div>
				<span className='text-sm text-muted-foreground'>
					{filteredPatients.length}{' '}
					{filteredPatients.length === 1 ? 'paciente' : 'pacientes'}
				</span>
			</div>

			<PatientDataTable
				columns={patientColumns}
				data={filteredPatients}
				emptyMessage='Nenhum paciente encontrado com os filtros selecionados.'
			/>
		</div>
	);
}
