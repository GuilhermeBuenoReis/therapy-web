import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
	type SessionScheduleRow,
	createSessionColumns,
	sessionStatusInfo,
} from '@/components/table/session-columns';
import { SessionDetailsDialog } from '@/components/session-details-dialog';
import { SessionMonthCard } from '@/components/session-month-card';
import { SessionWeekCard } from '@/components/session-week-card';
import { SessionDataTable } from '@/components/table/session-data-table';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type ViewMode = 'day' | 'week' | 'month';

type SessionEvent = {
	id: string;
	patient: string;
	patientId: string;
	professionalId: string;
	price: number;
	notes: string;
	status: SessionScheduleRow['status'];
	start: string; // ISO
	end: string; // ISO
	sessionDate: string; // ISO
	createdAt: string; // ISO
	updatedAt: string | null;
	location?: string;
};

const events: SessionEvent[] = [
	{
		id: '1',
		patient: 'João Santos',
		patientId: '11111111-1111-1111-1111-111111111111',
		professionalId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		price: 200,
		notes: 'Sessão de acompanhamento.',
		status: 'scheduled',
		start: '2024-12-19T09:00:00',
		end: '2024-12-19T09:50:00',
		sessionDate: '2024-12-19T09:00:00',
		createdAt: '2024-12-10T10:00:00Z',
		updatedAt: null,
		location: 'Sala 1',
	},
	{
		id: '2',
		patient: 'Maria Oliveira',
		patientId: '22222222-2222-2222-2222-222222222222',
		professionalId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		price: 200,
		notes: 'Primeira sessão do mês.',
		status: 'scheduled',
		start: '2024-12-19T10:30:00',
		end: '2024-12-19T11:20:00',
		sessionDate: '2024-12-19T10:30:00',
		createdAt: '2024-12-10T10:10:00Z',
		updatedAt: null,
		location: 'Sala 2',
	},
	{
		id: '3',
		patient: 'Pedro Costa',
		patientId: '33333333-3333-3333-3333-333333333333',
		professionalId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		price: 200,
		notes: 'Retorno sobre ansiedade.',
		status: 'scheduled',
		start: '2024-12-19T14:00:00',
		end: '2024-12-19T14:50:00',
		sessionDate: '2024-12-19T14:00:00',
		createdAt: '2024-12-10T10:20:00Z',
		updatedAt: null,
		location: 'Sala 1',
	},
	{
		id: '4',
		patient: 'Ana Silva',
		patientId: '44444444-4444-4444-4444-444444444444',
		professionalId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		price: 200,
		notes: 'Avaliação inicial.',
		status: 'scheduled',
		start: '2024-12-19T15:30:00',
		end: '2024-12-19T16:20:00',
		sessionDate: '2024-12-19T15:30:00',
		createdAt: '2024-12-10T10:30:00Z',
		updatedAt: null,
		location: 'Sala 2',
	},
	{
		id: '5',
		patient: 'João Santos',
		patientId: '11111111-1111-1111-1111-111111111111',
		professionalId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		price: 220,
		notes: 'Sessão extra.',
		status: 'in-progress',
		start: '2024-12-20T09:00:00',
		end: '2024-12-20T09:50:00',
		sessionDate: '2024-12-20T09:00:00',
		createdAt: '2024-12-10T10:40:00Z',
		updatedAt: null,
		location: 'Sala 1',
	},
	{
		id: '6',
		patient: 'Maria Oliveira',
		patientId: '22222222-2222-2222-2222-222222222222',
		professionalId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		price: 200,
		notes: 'Acompanhamento mensal.',
		status: 'scheduled',
		start: '2024-12-20T11:00:00',
		end: '2024-12-20T11:50:00',
		sessionDate: '2024-12-20T11:00:00',
		createdAt: '2024-12-10T10:50:00Z',
		updatedAt: null,
		location: 'Sala 2',
	},
	{
		id: '7',
		patient: 'Pedro Costa',
		patientId: '33333333-3333-3333-3333-333333333333',
		professionalId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		price: 200,
		notes: 'Sessão concluída.',
		status: 'completed',
		start: '2024-12-18T16:00:00',
		end: '2024-12-18T16:50:00',
		sessionDate: '2024-12-18T16:00:00',
		createdAt: '2024-12-10T11:00:00Z',
		updatedAt: '2024-12-18T17:00:00Z',
		location: 'Sala 1',
	},
	{
		id: '8',
		patient: 'Ana Silva',
		patientId: '44444444-4444-4444-4444-444444444444',
		professionalId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		price: 200,
		notes: 'Cancelada pelo paciente.',
		status: 'canceled',
		start: '2024-12-22T10:00:00',
		end: '2024-12-22T10:50:00',
		sessionDate: '2024-12-22T10:00:00',
		createdAt: '2024-12-10T11:10:00Z',
		updatedAt: '2024-12-21T09:00:00Z',
		location: 'Online',
	},
	{
		id: '9',
		patient: 'Lucas Mendes',
		patientId: '55555555-5555-5555-5555-555555555555',
		professionalId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		price: 210,
		notes: 'Sessão de rotina.',
		status: 'scheduled',
		start: '2024-12-27T13:00:00',
		end: '2024-12-27T13:50:00',
		sessionDate: '2024-12-27T13:00:00',
		createdAt: '2024-12-10T11:20:00Z',
		updatedAt: null,
		location: 'Sala 3',
	},
	{
		id: '10',
		patient: 'Bruna Rocha',
		patientId: '66666666-6666-6666-6666-666666666666',
		professionalId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		price: 230,
		notes: 'Sessão inicial de janeiro.',
		status: 'scheduled',
		start: '2025-01-03T09:30:00',
		end: '2025-01-03T10:20:00',
		sessionDate: '2025-01-03T09:30:00',
		createdAt: '2024-12-10T11:30:00Z',
		updatedAt: null,
		location: 'Sala 1',
	},
];

export function SessionSchedule() {
	dayjs.locale('pt-br');
	const [view, setView] = useState<ViewMode>('day');
	const [currentDate, setCurrentDate] = useState(() => dayjs('2024-12-19'));
	const [selectedSession, setSelectedSession] = useState<SessionEvent | null>(
		null
	);
	const [daySessionsModal, setDaySessionsModal] = useState<{
		dayLabel: string;
		items: SessionEvent[];
	} | null>(null);

	const dateLabel = useMemo(
		() => currentDate.locale('pt-br').format('dddd, D [de] MMMM, YYYY'),
		[currentDate]
	);

	const eventsById = useMemo(() => {
		const map: Record<string, SessionEvent> = {};
		for (const event of events) {
			map[event.id] = event;
		}
		return map;
	}, []);

	const handleOpenSessionDetails = useCallback(
		(sessionId: string) => {
			const session = eventsById[sessionId] ?? null;
			if (session) setSelectedSession(session);
		},
		[eventsById]
	);

	const dayColumns = useMemo(
		() => createSessionColumns(handleOpenSessionDetails),
		[handleOpenSessionDetails]
	);

	const sessionsForDay = useMemo(() => {
		return events
			.filter((event) => dayjs(event.start).isSame(currentDate, 'day'))
			.sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf())
			.map((event) => {
				const start = dayjs(event.start);
				const end = dayjs(event.end);
				return {
					id: event.id,
					start: start.format('HH:mm'),
					patient: event.patient,
					durationMinutes: end.diff(start, 'minute'),
					price: event.price,
					status: event.status,
				} satisfies SessionScheduleRow;
			});
	}, [currentDate]);

	const weekDays = useMemo(() => {
		const start = currentDate.startOf('week');
		return Array.from({ length: 7 }, (_, index) => start.add(index, 'day'));
	}, [currentDate]);

	const weekSessions = useMemo(
		() =>
			weekDays.map((day) => {
				const items = events
					.filter((event) => dayjs(event.start).isSame(day, 'day'))
					.sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf());

				return { day, items };
			}),
		[weekDays]
	);

	const monthGrid = useMemo(() => {
		const startOfMonth = currentDate.startOf('month');
		const daysInMonth = currentDate.daysInMonth();
		const leadingPlaceholders = startOfMonth.day(); // 0 (Sun) - 6 (Sat)

		const leadingCells = Array.from({ length: leadingPlaceholders }, () => ({
			day: null,
			items: [],
			isCurrentMonth: false,
			isPlaceholder: true,
		}));

		const monthCells = Array.from({ length: daysInMonth }, (_, index) => {
			const day = startOfMonth.add(index, 'day');
			const items = events
				.filter((event) => dayjs(event.start).isSame(day, 'day'))
				.sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf());

			return { day, items, isCurrentMonth: true, isPlaceholder: false };
		});

		return [...leadingCells, ...monthCells];
	}, [currentDate]);

	const handlePrev = () => {
		setCurrentDate((prev) => prev.subtract(1, view));
	};

	const handleNext = () => {
		setCurrentDate((prev) => prev.add(1, view));
	};

	return (
		<div className='space-y-4 rounded-3xl border border-border/60 bg-gradient-to-b from-white to-sky-50/40 p-5 shadow-sm dark:from-slate-950 dark:to-slate-900/60'>
			<header className='flex flex-wrap items-center justify-between gap-3'>
				<div className='flex items-center gap-2 rounded-full border border-border/60 bg-white/70 p-1 shadow-xs dark:bg-slate-900/70'>
					{(
						[
							{ mode: 'day', label: 'Dia' },
							{ mode: 'week', label: 'Semana' },
							{ mode: 'month', label: 'Mês' },
						] as { mode: ViewMode; label: string }[]
					).map(({ mode, label }) => (
						<Button
							key={mode}
							size='sm'
							variant={view === mode ? 'default' : 'ghost'}
							className='capitalize rounded-full px-4'
							onClick={() => setView(mode)}
						>
							{label}
						</Button>
					))}
				</div>

				<div className='flex items-center gap-3 rounded-full border border-border/60 bg-white/70 px-3 py-2 shadow-xs dark:bg-slate-900/70'>
					<Button
						type='button'
						variant='ghost'
						size='icon-sm'
						className='rounded-full'
						onClick={handlePrev}
						aria-label='Anterior'
					>
						<ChevronLeft className='size-4' aria-hidden />
					</Button>
					<p className='text-sm font-semibold text-foreground'>{dateLabel}</p>
					<Button
						type='button'
						variant='ghost'
						size='icon-sm'
						className='rounded-full'
						onClick={handleNext}
						aria-label='Próximo'
					>
						<ChevronRight className='size-4' aria-hidden />
					</Button>
				</div>
			</header>

			{view === 'day' ? (
				<SessionDataTable columns={dayColumns} data={sessionsForDay} />
			) : null}

			{view === 'week' ? (
				<section className='overflow-x-auto rounded-xl border border-border/60 bg-white/70 shadow-xs dark:bg-slate-950/50'>
					<div className='grid min-w-[960px] grid-cols-7 divide-x divide-border/60 text-sm'>
						{weekSessions.map(({ day, items }) => {
							const visible = items.slice(0, 2);
							const hiddenCount = items.length - visible.length;
							const dayLabel = day
								.locale('pt-br')
								.format('dddd, D [de] MMMM');
							const isToday = day.isSame(dayjs(), 'day');

							return (
								<div
									key={day.toString()}
									className={cn(
										'relative flex flex-col gap-2 p-3 transition-colors',
										isToday && 'bg-primary/5'
									)}
								>
									{isToday ? (
										<span
											aria-hidden
											className='absolute left-3 right-3 top-0 h-0.5 rounded-full bg-primary/60'
										/>
									) : null}

									<header className='flex items-start justify-between gap-3'>
										<div className='flex flex-col gap-0.5'>
											<span className='text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
												{day.format('ddd')}
											</span>
											<span className='text-sm font-semibold leading-tight'>
												{day.format('D MMM')}
											</span>
										</div>
										<span className='text-[11px] text-muted-foreground'>
											{items.length} {items.length === 1 ? 'sessão' : 'sessões'}
										</span>
									</header>

									<div className='space-y-1.5'>
												{items.length ? (
											<>
												{visible.map((session) => (
													<SessionWeekCard
														key={session.id}
														session={session}
														onSelect={() => setSelectedSession(session)}
													/>
												))}
												{hiddenCount > 0 ? (
													<button
														type='button'
														className='text-[11px] font-semibold text-primary hover:underline'
														onClick={() =>
															setDaySessionsModal({
																dayLabel,
																items,
															})
														}
													>
														Mostrar mais (+{hiddenCount})
													</button>
												) : null}
											</>
										) : (
											<p className='text-[12px] text-muted-foreground'>
												Sem sessões
											</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</section>
			) : null}

			{view === 'month' ? (
				<section className='rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:bg-slate-900/70'>
					<div className='grid grid-cols-7 gap-2 text-xs font-semibold uppercase text-muted-foreground'>
						{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((label) => (
							<span key={label} className='text-center'>
								{label}
							</span>
						))}
					</div>
					<div className='mt-3 grid grid-cols-7 gap-2 text-sm'>
						{monthGrid.map(
							({ day, items, isCurrentMonth, isPlaceholder }, index) => (
								<div
									key={day ? day.toString() : `placeholder-${index}`}
									className={cn(
										'min-h-[100px] rounded-xl border px-3 py-2 shadow-xs transition-colors',
										isPlaceholder
											? 'border-transparent bg-transparent'
											: isCurrentMonth
												? 'border-border/70 bg-slate-50/70 dark:bg-slate-900/60'
												: 'border-border/40 bg-muted/30 text-muted-foreground dark:bg-slate-950/40'
									)}
								>
									{day ? (
										<>
											<div className='flex items-center justify-between text-xs font-semibold'>
												<span>{day.format('D')}</span>
												{day.isSame(dayjs(), 'day') ? (
													<span className='rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary'>
														Hoje
													</span>
												) : null}
											</div>
											<div className='mt-2 space-y-2'>
												{items.slice(0, 3).map((session) => {
													const color =
														sessionStatusInfo[session.status]?.dotColor ??
														'#e5e7eb';
													const bgTint = `${color}1A`; // ~10% opacity
													const borderTint = `${color}33`; // ~20% opacity

													return (
														<button
															type='button'
															key={session.id}
															onClick={() => setSelectedSession(session)}
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
												})}
												{items.length > 3 ? (
													<button
														type='button'
														className='text-[11px] font-semibold text-primary hover:underline'
														onClick={() =>
															setDaySessionsModal({
																dayLabel: day
																	.locale('pt-br')
																	.format('dddd, D [de] MMMM'),
																items,
															})
														}
													>
														+{items.length - 3} mais
													</button>
												) : null}
											</div>
										</>
									) : null}
								</div>
							)
						)}
					</div>
				</section>
			) : null}

			<Dialog
				open={!!daySessionsModal}
				onOpenChange={(open) => {
					if (!open) setDaySessionsModal(null);
				}}
			>
				<DialogContent className='sm:max-w-2xl'>
					<DialogHeader>
						<DialogTitle>
							{daySessionsModal?.dayLabel ?? 'Sessões do dia'}
						</DialogTitle>
						<DialogDescription>
							Lista completa de agendamentos deste dia.
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className='max-h-[70vh]'>
						<div className='space-y-3 py-1 pr-2'>
							{(daySessionsModal?.items ?? []).map((session) => (
								<SessionWeekCard
									key={session.id}
									session={session}
									onSelect={() => setSelectedSession(session)}
								/>
							))}
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>

			<SessionDetailsDialog
				session={selectedSession}
				onOpenChange={(open) => {
					if (!open) setSelectedSession(null);
				}}
			/>
		</div>
	);
}
