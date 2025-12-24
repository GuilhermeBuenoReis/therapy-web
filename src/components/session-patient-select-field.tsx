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

type PatientOption = {
	id: string;
	name: string;
};

type SessionPatientSelectFieldProps = {
	options: PatientOption[];
};

export function SessionPatientSelectField({
	options,
}: SessionPatientSelectFieldProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<Field>
			<FieldLabel>Paciente</FieldLabel>
			<Controller
				name='patientId'
				control={control}
				render={({ field }) => (
					<Select
						onValueChange={field.onChange}
						value={field.value || undefined}
					>
						<SelectTrigger
							ref={field.ref}
							aria-invalid={errors.patientId ? 'true' : 'false'}
						>
							<SelectValue placeholder='Selecione um paciente' />
						</SelectTrigger>
						<SelectContent>
							{options.map((patient) => (
								<SelectItem key={patient.id} value={patient.id}>
									{patient.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			<FieldDescription
				className={errors.patientId ? 'text-destructive' : undefined}
			>
				{errors.patientId?.message ?? 'Escolha quem participará da sessão.'}
			</FieldDescription>
		</Field>
	);
}

export type { PatientOption };
