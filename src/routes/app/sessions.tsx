import { createFileRoute } from '@tanstack/react-router';
import { CreateNewSession } from '@/components/create-new-session';
import { Header } from '@/components/header';
import { HeaderTitle } from '@/components/header-title';
import { SessionSchedule } from '@/components/session-schedule';

export const Route = createFileRoute('/app/sessions')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-full min-w-full space-y-6'>
			<Header />

			<div className='flex justify-between items-center'>
				<HeaderTitle
					title='Sessions'
					description='Gerencie sua agenda de compromissos'
				/>

				<CreateNewSession />
			</div>

			<SessionSchedule />
		</div>
	);
}
