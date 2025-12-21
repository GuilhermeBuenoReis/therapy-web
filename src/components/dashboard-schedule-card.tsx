import { motion, type Transition } from 'framer-motion';

interface ScheduleItem {
	time: string;
	patient: string;
	duration: string;
	status: string;
}

const schedule: ScheduleItem[] = [
	{
		time: '09:00',
		patient: 'João Santos',
		duration: 'Sessão de 50 min',
		status: 'Agendado',
	},
	{
		time: '10:30',
		patient: 'Maria Oliveira',
		duration: 'Sessão de 50 min',
		status: 'Agendado',
	},
	{
		time: '14:00',
		patient: 'Pedro Costa',
		duration: 'Sessão de 50 min',
		status: 'Agendado',
	},
	{
		time: '15:30',
		patient: 'Ana Silva',
		duration: 'Sessão de 50 min',
		status: 'Agendado',
	},
];

const itemTransition: Transition = {
	type: 'spring',
	stiffness: 220,
	damping: 18,
};

export function DashboardScheduleCard() {
	return (
		<div className='rounded-xl border border-border/60 bg-card shadow-sm'>
			<div className='border-b border-border/60 px-5 py-3.5'>
				<p className='text-lg font-semibold leading-tight'>Agenda de hoje</p>
			</div>

			<div className='space-y-3 px-4 py-4'>
				{schedule.map((item, index) => (
					<motion.div
						key={`${item.time}-${item.patient}`}
						className='flex items-center gap-4 rounded-lg bg-muted/50 px-4 py-3'
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						whileHover={{ y: -2, scale: 1.005 }}
						transition={{ ...itemTransition, delay: 0.05 * index }}
					>
						<div className='min-w-14 text-sm font-semibold text-foreground'>
							{item.time}
						</div>
						<div className='flex-1 leading-snug'>
							<p className='font-semibold text-foreground'>{item.patient}</p>
							<p className='text-xs text-muted-foreground'>{item.duration}</p>
						</div>
						<span className='rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600'>
							{item.status}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	);
}
