import { createFileRoute } from '@tanstack/react-router';
import { DashboardCards } from '@/components/dashboard-card';
import { DashboardQuickActions } from '@/components/dashboard-quick-actions';
import { DashboardScheduleCard } from '@/components/dashboard-schedule-card';
import { Header } from '@/components/header';
import { HeaderTitle } from '@/components/header-title';

export const Route = createFileRoute('/app/dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-full min-w-full space-y-6'>
			<Header />

			<HeaderTitle
				title='Bem-vindo de volta, Dr. Bueno'
				description='Eis o que está acontecendo hoje'
			/>

			<DashboardCards />

			<div className='grid gap-4 xl:grid-cols-[2fr_1fr]'>
				<DashboardScheduleCard />
				<DashboardQuickActions />
			</div>
		</div>
	);
}
