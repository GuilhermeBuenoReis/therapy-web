import dayjs from 'dayjs';
import { Clock3 } from 'lucide-react';
import { sessionStatusInfo } from './table/session-columns';

type SessionMonthCardProps = {
	session: {
		id: string;
		patient: string;
		start: string;
		status: keyof typeof sessionStatusInfo;
	};
	onSelect: () => void;
};

export function SessionMonthCard({ session, onSelect }: SessionMonthCardProps) {
	const tint = sessionStatusInfo[session.status];
	const color = tint?.dotColor ?? '#e5e7eb';
	const bgTint = `${color}1A`; // ~10% opacity
	const borderTint = `${color}33`; // ~20% opacity

	return (
		<button
			type='button'
			onClick={onSelect}
			className='w-full rounded-lg px-2 py-1 text-xs shadow-sm border text-left transition-[transform,box-shadow] hover:shadow-sm'
			style={{
				backgroundColor: bgTint,
				borderColor: borderTint,
			}}
		>
			<p className='font-semibold'>{session.patient}</p>
			<p className='flex items-center gap-1 text-[11px] text-muted-foreground'>
				<Clock3 className='size-3' />
				{dayjs(session.start).format('HH:mm')}
			</p>
		</button>
	);
}
