import { useFormContext } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { CreateSessionFormValues } from './session-form';

export function SessionDurationPriceFields() {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<Field>
				<FieldLabel>Duração (min)</FieldLabel>
				<Input
					type='number'
					min={0}
					{...register('durationMinutes')}
					aria-invalid={errors.durationMinutes ? 'true' : 'false'}
				/>
				<FieldDescription
					className={errors.durationMinutes ? 'text-destructive' : undefined}
				>
					{errors.durationMinutes?.message ??
						'Tempo total da sessão em minutos.'}
				</FieldDescription>
			</Field>

			<Field>
				<FieldLabel>Preço (R$)</FieldLabel>
				<Input
					type='number'
					min={0}
					step='0.01'
					inputMode='decimal'
					{...register('price')}
					aria-invalid={errors.price ? 'true' : 'false'}
				/>
				<FieldDescription className={errors.price ? 'text-destructive' : undefined}>
					{errors.price?.message ?? 'Valor cobrado pela sessão, em reais.'}
				</FieldDescription>
			</Field>
		</div>
	);
}
