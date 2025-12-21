import { createFileRoute } from '@tanstack/react-router';
import { DashboardCards } from '@/components/dashboard-card';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardQuickActions } from '@/components/dashboard-quick-actions';
import { DashboardScheduleCard } from '@/components/dashboard-schedule-card';

export const Route = createFileRoute('/app/dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-full min-w-full space-y-6'>
			<DashboardHeader />

			<div className='space-y-2'>
				<p className='text-3xl font-bold leading-tight'>
					Bem-vindo de volta, Dr. Bueno
				</p>
				<p className='text-muted-foreground'>Eis o que está acontecendo hoje</p>
			</div>

			<DashboardCards />

			<div className='grid gap-4 xl:grid-cols-[2fr_1fr]'>
				<DashboardScheduleCard />
				<DashboardQuickActions />
			</div>
		</div>
	);
}
