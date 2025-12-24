import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { SessionDateTimeFields } from './session-date-time-fields';
import { SessionDurationPriceFields } from './session-duration-price-fields';
import { SessionNotesField } from './session-notes-field';
import type { PatientOption } from './session-patient-select-field';
import { SessionPatientSelectField } from './session-patient-select-field';
import type { ProfessionalOption } from './session-professional-select-field';
import { SessionProfessionalSelectField } from './session-professional-select-field';
import { SessionStatusSelectField } from './session-status-select-field';

enum SessionStatus {
	scheduled = 'scheduled',
	inProgress = 'in-progress',
	completed = 'completed',
	canceled = 'canceled',
}

const sessionSchema = z.object({
	id: z.string().uuid(),
	patientId: z.string().uuid(),
	professionalId: z.string().uuid(),
	price: z.number(),
	notes: z.string(),
	sessionDate: z.string().datetime(),
	status: z.enum([
		SessionStatus.scheduled,
		SessionStatus.inProgress,
		SessionStatus.completed,
		SessionStatus.canceled,
	]),
	durationMinutes: z.number(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime().nullable(),
});

const createSessionSchema = z
	.object({
		patientId: z.string().uuid({ message: 'Selecione o paciente.' }),
		professionalId: z.string().uuid({
			message: 'Selecione o profissional.',
		}),
		date: z.string().min(1, { message: 'Informe a data da sessão.' }),
		time: z
			.string()
			.regex(/^\d{2}:\d{2}$/, { message: 'Informe o horário (HH:MM).' }),
		price: z.coerce.number().min(0, { message: 'Informe um valor válido.' }),
		status: z.enum(
			[
				SessionStatus.scheduled,
				SessionStatus.inProgress,
				SessionStatus.completed,
				SessionStatus.canceled,
			],
			{ errorMap: () => ({ message: 'Selecione o status.' }) }
		),
		durationMinutes: z.coerce
			.number()
			.int({ message: 'Use apenas números inteiros.' })
			.positive({ message: 'Informe a duração em minutos.' }),
		notes: z
			.string()
			.max(20_000, { message: 'Limite máximo de 20.000 caracteres.' })
			.optional(),
	})
	.superRefine((data, ctx) => {
		const candidate = dayjs(`${data.date}T${data.time}`);

		if (!candidate.isValid()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Informe uma data e horário válidos.',
				path: ['date'],
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Informe uma data e horário válidos.',
				path: ['time'],
			});
		}
	});

type CreateSessionFormValues = z.infer<typeof createSessionSchema>;
type SessionPayload = z.infer<typeof sessionSchema>;

type SessionFormProps = {
	open: boolean;
	onSubmit: (
		payload: SessionPayload,
		helpers: { reset: () => void }
	) => Promise<void> | void;
	onCancel: () => void;
	patientOptions: PatientOption[];
	professionalOptions: ProfessionalOption[];
};

function SessionForm({
	open,
	onSubmit,
	onCancel,
	patientOptions,
	professionalOptions,
}: SessionFormProps) {
	const methods = useForm<CreateSessionFormValues>({
		resolver: zodResolver(createSessionSchema),
		defaultValues: {
			patientId: '',
			professionalId: '',
			date: '',
			time: '',
			price: 0,
			status: SessionStatus.scheduled,
			durationMinutes: 50,
			notes: '',
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = methods;

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	const onFormSubmit = async (values: CreateSessionFormValues) => {
		const sessionDate = dayjs(`${values.date}T${values.time}`);

		const payload: SessionPayload = {
			id: crypto.randomUUID(),
			patientId: values.patientId,
			professionalId: values.professionalId,
			price: values.price,
			notes: values.notes?.trim() ?? '',
			sessionDate: sessionDate.toISOString(),
			status: values.status,
			durationMinutes: values.durationMinutes,
			createdAt: dayjs().toISOString(),
			updatedAt: null,
		};

		await onSubmit(payload, { reset });
	};

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col gap-6'
				onSubmit={handleSubmit(onFormSubmit)}
				noValidate
			>
				<FieldGroup>
					<SessionPatientSelectField options={patientOptions} />
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<SessionProfessionalSelectField options={professionalOptions} />
						<SessionStatusSelectField />
					</div>
					<SessionDateTimeFields />
					<SessionDurationPriceFields />
					<SessionNotesField />
				</FieldGroup>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							type='button'
							variant='outline'
							className='cursor-pointer'
							onClick={onCancel}
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type='submit'
						disabled={isSubmitting}
						className='cursor-pointer'
					>
						{isSubmitting ? 'Agendando...' : 'Agendar sessão'}
					</Button>
				</DialogFooter>
			</form>
		</FormProvider>
	);
}

export type { CreateSessionFormValues, SessionPayload };
export { SessionForm, SessionStatus, createSessionSchema, sessionSchema };
