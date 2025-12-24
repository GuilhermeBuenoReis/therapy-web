import dayjs from 'dayjs';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { sessionStatusInfo } from './table/session-columns';

type SessionDetails = {
	id: string;
	patient: string;
	patientId: string;
	professionalId: string;
	price: number;
	notes: string;
	status: keyof typeof sessionStatusInfo;
	start: string;
	end: string;
	sessionDate: string;
	createdAt: string;
	updatedAt: string | null;
	location?: string;
};

type SessionDetailsDialogProps = {
	session: SessionDetails | null;
	onOpenChange: (open: boolean) => void;
};

export function SessionDetailsDialog({
	session,
	onOpenChange,
}: SessionDetailsDialogProps) {
	return (
		<Dialog open={!!session} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Detalhes da sessão</DialogTitle>
					<DialogDescription>
						Informações completas da sessão selecionada.
					</DialogDescription>
				</DialogHeader>
				{session ? (
					<div className='space-y-3 text-sm'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>
									Paciente
								</p>
								<p className='text-base font-semibold'>{session.patient}</p>
							</div>
							<span
								className={cn(
									'px-3 py-1 text-[11px] font-semibold rounded-full border',
									sessionStatusInfo[session.status]?.className ??
										'bg-muted text-foreground border-border'
								)}
							>
								{sessionStatusInfo[session.status]?.label ?? session.status}
							</span>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>Data</p>
								<p className='font-medium'>
									{dayjs(session.sessionDate).format('DD/MM/YYYY HH:mm')}
								</p>
							</div>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>
									Duração
								</p>
								<p className='font-medium'>
									{dayjs(session.end).diff(dayjs(session.start), 'minute')} min
								</p>
							</div>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>Preço</p>
								<p className='font-medium'>
									{new Intl.NumberFormat('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									}).format(session.price)}
								</p>
							</div>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>
									Local
								</p>
								<p className='font-medium'>
									{session.location ?? 'Não informado'}
								</p>
							</div>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>
									Paciente ID
								</p>
								<p className='font-mono text-xs'>{session.patientId}</p>
							</div>
							<div>
								<p className='text-xs uppercase text-muted-foreground'>
									Profissional ID
								</p>
								<p className='font-mono text-xs'>{session.professionalId}</p>
							</div>
						</div>
						<div>
							<p className='text-xs uppercase text-muted-foreground'>Notas</p>
							<p className='whitespace-pre-wrap'>
								{session.notes || 'Sem observações'}
							</p>
						</div>
						<div className='grid grid-cols-2 gap-3 text-xs text-muted-foreground'>
							<div>
								Criada em:{' '}
								{dayjs(session.createdAt).format('DD/MM/YYYY HH:mm')}
							</div>
							<div>
								Atualizada em:{' '}
								{session.updatedAt
									? dayjs(session.updatedAt).format('DD/MM/YYYY HH:mm')
									: 'Nunca'}
							</div>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
}
