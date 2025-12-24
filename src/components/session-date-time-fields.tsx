import { useFormContext } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { CreateSessionFormValues } from './session-form';

export function SessionDateTimeFields() {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<Field>
				<FieldLabel>Data</FieldLabel>
				<Input
					type='date'
					{...register('date')}
					aria-invalid={errors.date ? 'true' : 'false'}
				/>
				<FieldDescription className={errors.date ? 'text-destructive' : undefined}>
					{errors.date?.message ?? 'Escolha o dia do atendimento.'}
				</FieldDescription>
			</Field>

			<Field>
				<FieldLabel>Horário</FieldLabel>
				<Input
					type='time'
					{...register('time')}
					aria-invalid={errors.time ? 'true' : 'false'}
				/>
				<FieldDescription className={errors.time ? 'text-destructive' : undefined}>
					{errors.time?.message ?? 'Informe o horário de início.'}
				</FieldDescription>
			</Field>
		</div>
	);
}
