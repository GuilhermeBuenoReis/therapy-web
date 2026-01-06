import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type RecordNoteType =
	| 'Progress Note'
	| 'Follow-up'
	| 'Treatment Plan'
	| 'Evaluation'
	| 'Medication Update';

export type MedicalRecord = {
	id: string;
	patientName: string;
	date: string; // ISO date
	sessionLabel: string;
	noteType: RecordNoteType;
	summary: string;
};

const noteTypeStyles: Record<RecordNoteType, string> = {
	'Progress Note':
		'border border-sky-100 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100',
	'Follow-up':
		'border border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100',
	'Treatment Plan':
		'border border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-100',
	Evaluation:
		'border border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100',
	'Medication Update':
		'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100',
};

export function RecordCard({ record }: { record: MedicalRecord }) {
	const formattedDate = dayjs(record.date).format('MMM D, YYYY');
	const initial = record.patientName.at(0)?.toUpperCase() ?? '?';

	return (
		<article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60'>
			<header className='flex items-start justify-between gap-4'>
				<div className='flex items-start gap-3'>
					<div className='grid size-10 place-items-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-100 dark:ring-sky-900/50'>
						<span className='text-sm font-bold'>{initial}</span>
					</div>

					<div className='space-y-0.5'>
						<p className='text-base font-semibold leading-tight text-slate-900 dark:text-slate-100'>
							{record.patientName}
						</p>
						<p className='text-sm text-muted-foreground'>
							{formattedDate}{' '}
							<span aria-hidden className='mx-1 text-slate-300'>
								•
							</span>
							{record.sessionLabel}
						</p>
					</div>
				</div>

				<span
					className={cn(
						'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize',
						noteTypeStyles[record.noteType]
					)}
				>
					{record.noteType}
				</span>
			</header>

			<p className='mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-inner dark:bg-slate-900/70 dark:text-slate-100'>
				{record.summary}
			</p>

			<div className='mt-4'>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='cursor-pointer rounded-lg border-slate-200 bg-slate-50 px-4 text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800'
				>
					View Full Record
				</Button>
			</div>
		</article>
	);
}
