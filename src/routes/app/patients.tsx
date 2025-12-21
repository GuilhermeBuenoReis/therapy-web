import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CreateNewPatient } from '@/components/create-new-patient';
import { Header } from '@/components/header';
import { HeaderTitle } from '@/components/header-title';
import {
	PatientFilter,
	type PatientFilterValues,
} from '@/components/patient-filter';
import { PatientsTable } from '@/components/patients-table';

export const Route = createFileRoute('/app/patients')({
	component: RouteComponent,
});

function RouteComponent() {
	const [filters, setFilters] = useState<PatientFilterValues>({
		filter: '',
		status: 'all',
	});

	return (
		<div className='min-h-full min-w-full space-y-6'>
			<Header />

			<div className='flex justify-between items-center'>
				<HeaderTitle
					title='Pacientes'
					description='Gerencie o registros dos seus pacientes'
				/>
				<CreateNewPatient />
			</div>

			<PatientFilter onFiltersChange={setFilters} />

			<PatientsTable filters={filters} />
		</div>
	);
}
