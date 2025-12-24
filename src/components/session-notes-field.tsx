import { useFormContext } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import type { CreateSessionFormValues } from './session-form';

export function SessionNotesField() {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<Field>
			<FieldLabel>Notas</FieldLabel>
			<textarea
				className='border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 min-h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
				rows={4}
				{...register('notes')}
				aria-invalid={errors.notes ? 'true' : 'false'}
				placeholder='Adicione detalhes importantes para esta sessão.'
			/>
			<FieldDescription
				className={errors.notes ? 'text-destructive' : undefined}
			>
				{errors.notes?.message ??
					'Opcional: observações, objetivos ou pontos de atenção.'}
			</FieldDescription>
		</Field>
	);
}
