import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { CreateNewRecords } from '@/components/create-new-record';
import { Header } from '@/components/header';
import { HeaderTitle } from '@/components/header-title';
import { RecordsConfidentialCard } from '@/components/records-confidential-card';
import { RecordsList } from '@/components/records-list';
import { RecordsPatientFilter } from '@/components/records-patient-filter';

const recordsSearchSchema = z.object({
	filter: z.string().optional(),
});

export const Route = createFileRoute('/app/records')({
	component: RouteComponent,
	validateSearch: (search) => recordsSearchSchema.parse(search),
});

function RouteComponent() {
	return (
		<div className='min-h-full min-w-full space-y-6'>
			<Header />

			<div className='flex justify-between items-center'>
				<HeaderTitle
					title='Registros Médicos'
					description='Documentação clínica e histórico do paciente'
				/>
				<CreateNewRecords />
			</div>

			<RecordsConfidentialCard />

			<div className='space-y-4'>
				<RecordsPatientFilter />
				<RecordsList />
			</div>
		</div>
	);
}
