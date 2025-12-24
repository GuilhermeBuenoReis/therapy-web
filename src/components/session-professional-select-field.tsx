import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { CreateSessionFormValues } from './session-form';

type ProfessionalOption = {
	id: string;
	name: string;
};

type SessionProfessionalSelectFieldProps = {
	options: ProfessionalOption[];
};

export function SessionProfessionalSelectField({
	options,
}: SessionProfessionalSelectFieldProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<Field>
			<FieldLabel>Profissional</FieldLabel>
			<Controller
				name='professionalId'
				control={control}
				render={({ field }) => (
					<Select
						onValueChange={field.onChange}
						value={field.value || undefined}
					>
						<SelectTrigger
							ref={field.ref}
							aria-invalid={errors.professionalId ? 'true' : 'false'}
						>
							<SelectValue placeholder='Selecione o profissional' />
						</SelectTrigger>
						<SelectContent>
							{options.map((professional) => (
								<SelectItem key={professional.id} value={professional.id}>
									{professional.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			<FieldDescription
				className={errors.professionalId ? 'text-destructive' : undefined}
			>
				{errors.professionalId?.message ?? 'Defina o responsável pela sessão.'}
			</FieldDescription>
		</Field>
	);
}

export type { ProfessionalOption };
