import { motion, type Transition } from 'framer-motion';
import { CalendarCheck2, Star, UsersRound, Wallet } from 'lucide-react';

const iconBaseClass =
	'inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary';
const cardBaseClass =
	'h-full rounded-xl border border-border/60 bg-accent/40 p-5 shadow-sm';
const cardMotion = {
	initial: { opacity: 0, y: 14 },
	animate: { opacity: 1, y: 0 },
	whileHover: { y: -3, scale: 1.01 },
};
const cardTransition: Transition = {
	type: 'spring',
	stiffness: 230,
	damping: 18,
};

export function DashboardCards() {
	return (
		<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
			<motion.div
				className={cardBaseClass}
				initial={cardMotion.initial}
				animate={cardMotion.animate}
				whileHover={cardMotion.whileHover}
				transition={{ ...cardTransition, delay: 0.05 }}
			>
				<div className={`${iconBaseClass} bg-sky-100 text-sky-600`}>
					<CalendarCheck2 className='size-5' />
				</div>
				<div className='mt-4 space-y-1'>
					<p className='text-2xl font-semibold leading-tight'>5</p>
					<p className='text-muted-foreground text-sm'>Sessões hoje</p>
				</div>
			</motion.div>

			<motion.div
				className={cardBaseClass}
				initial={cardMotion.initial}
				animate={cardMotion.animate}
				whileHover={cardMotion.whileHover}
				transition={{ ...cardTransition, delay: 0.1 }}
			>
				<div className={`${iconBaseClass} bg-emerald-100 text-emerald-600`}>
					<UsersRound className='size-5' />
				</div>
				<div className='mt-4 space-y-1'>
					<p className='text-2xl font-semibold leading-tight'>42</p>
					<p className='text-muted-foreground text-sm'>Pacientes no total</p>
				</div>
			</motion.div>

			<motion.div
				className={cardBaseClass}
				initial={cardMotion.initial}
				animate={cardMotion.animate}
				whileHover={cardMotion.whileHover}
				transition={{ ...cardTransition, delay: 0.15 }}
			>
				<div className={`${iconBaseClass} bg-purple-100 text-purple-700`}>
					<Wallet className='size-5' />
				</div>
				<div className='mt-4 space-y-1'>
					<p className='text-2xl font-semibold leading-tight'>R$ 8.450</p>
					<p className='text-muted-foreground text-sm'>Receita (mês)</p>
				</div>
			</motion.div>

			<motion.div
				className={cardBaseClass}
				initial={cardMotion.initial}
				animate={cardMotion.animate}
				whileHover={cardMotion.whileHover}
				transition={{ ...cardTransition, delay: 0.2 }}
			>
				<div className={`${iconBaseClass} bg-amber-100 text-amber-600`}>
					<Star className='size-5' />
				</div>
				<div className='mt-4 space-y-1'>
					<p className='text-2xl font-semibold leading-tight'>Ativa</p>
					<p className='text-muted-foreground text-sm'>Assinatura</p>
				</div>
			</motion.div>
		</div>
	);
}
