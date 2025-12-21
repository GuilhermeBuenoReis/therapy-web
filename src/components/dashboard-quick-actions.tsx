import { motion, type Transition } from 'framer-motion';
import { CalendarPlus, FilePlus2, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

interface QuickActionProps {
	icon: ReactNode;
	label: string;
	description: string;
colorClasses: string;
	delay?: number;
}

function QuickActionRow({
	icon,
	label,
	description,
	colorClasses,
	delay = 0,
}: QuickActionProps) {
	return (
		<motion.div
			className='flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3'
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -2, scale: 1.01 }}
			transition={{ ...rowTransition, delay }}
		>
			<div
				className={`flex h-10 w-10 items-center justify-center rounded-md ${colorClasses}`}
			>
				{icon}
			</div>
			<div className='leading-snug'>
				<p className='font-semibold text-foreground'>{label}</p>
				<p className='text-xs text-muted-foreground'>{description}</p>
			</div>
		</motion.div>
	);
}

const rowTransition: Transition = {
	type: 'spring',
	stiffness: 220,
	damping: 18,
};

export function DashboardQuickActions() {
	return (
		<div className='rounded-xl border border-border/60 bg-card shadow-sm'>
			<div className='border-b border-border/60 px-5 py-3.5'>
				<p className='text-lg font-semibold leading-tight'>Ações rápidas</p>
			</div>

			<div className='space-y-3 px-4 py-4'>
				<QuickActionRow
					icon={<Plus className='size-5' />}
					label='Novo paciente'
					description='Adicionar um paciente'
					colorClasses='bg-sky-100 text-sky-600'
					delay={0}
				/>
				<QuickActionRow
					icon={<CalendarPlus className='size-5' />}
					label='Nova sessão'
					description='Agendar uma sessão'
					colorClasses='bg-emerald-100 text-emerald-600'
					delay={0.05}
				/>
				<QuickActionRow
					icon={<FilePlus2 className='size-5' />}
					label='Novo registro'
					description='Adicionar anotações'
					colorClasses='bg-purple-100 text-purple-700'
					delay={0.1}
				/>
			</div>
		</div>
	);
}
