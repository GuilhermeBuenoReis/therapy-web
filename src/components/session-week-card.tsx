import dayjs from 'dayjs';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { sessionStatusInfo } from './table/session-columns';

type SessionWeekCardProps = {
	session: {
		id: string;
		patient: string;
		start: string;
		end: string;
		status: keyof typeof sessionStatusInfo;
		location?: string;
		professional?: string;
	};
	onSelect: () => void;
};

export function SessionWeekCard({ session, onSelect }: SessionWeekCardProps) {
	const start = dayjs(session.start).format('HH:mm');
	const end = dayjs(session.end).format('HH:mm');
	const duration = dayjs(session.end).diff(session.start, 'minute');
	const tint = sessionStatusInfo[session.status];
	const bgTint = tint ? `${tint.dotColor}0F` : undefined;
	const borderTint = tint ? `${tint.dotColor}33` : undefined;

	return (
		<Button
			type='button'
			variant='ghost'
			onClick={onSelect}
			className='group w-full min-h-59 rounded-md border border-border/60 px-3 py-3 text-left shadow-none transition-colors hover:border-border/80 hover:bg-muted/40'
			style={{
				backgroundColor: bgTint,
				borderColor: borderTint,
				borderTopWidth: 4,
				borderTopColor: tint?.dotColor ?? undefined,
			}}
		>
			<div className='flex h-full flex-col gap-3'>
				<div className='flex-none h-12 w-full overflow-hidden px-1 py-1.5'>
					<div className='flex h-full flex-col items-center justify-center space-y-1'>
						<p className='truncate text-sm font-semibold leading-tight'>
							{session.patient}
						</p>
						<span
							className={cn(
								'w-fit rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-none text-left',
								'bg-white/80 dark:bg-slate-950/70'
							)}
							style={{
								color: tint?.dotColor,
								borderColor: borderTint ?? 'var(--border)',
							}}
						>
							{tint?.label ?? session.status}
						</span>
					</div>
				</div>

				<div className='flex-none h-20 w-full rounded-sm border border-dashed border-border/60 bg-white/70 px-3 py-4 text-center dark:bg-slate-950/60'>
					<div className='flex h-full flex-col items-center justify-center gap-2'>
						<p className='text-base font-semibold leading-tight'>
							{start} – {end}
						</p>
						<p className='text-[11px] text-muted-foreground'>{duration} min</p>
					</div>
				</div>

				<div className='flex-none h-12 w-full overflow-hidden text-[11px] text-muted-foreground'>
					<div className='flex h-full flex-col justify-center space-y-1.5'>
						<div className='flex items-center gap-1.5'>
							<MapPin className='size-3 shrink-0 text-muted-foreground/60' />
							<span className='truncate'>
								{session.location ?? 'Sala não informada'}
							</span>
						</div>
						<span className='truncate text-muted-foreground/80'>
							{session.professional ?? 'Profissional não informado'}
						</span>
					</div>
				</div>

				<div className='flex-none h-6 w-full' aria-hidden />
			</div>
		</Button>
	);
}
