import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Patient } from '@/components/patient-informations-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

type PatientUpdateSheetProps = {
	patient: Patient;
	onUpdated?: (payload: Patient) => void;
	children?: ReactNode;
};

const updatePatientSchema = z.object({
	name: z.string().min(1, { message: 'Informe o nome.' }),
	birthDate: z.string().min(1, { message: 'Informe a data de nascimento.' }),
	phone: z.string().min(1, { message: 'Informe o telefone.' }),
	note: z.string().optional().nullable(),
});

type UpdatePatientShemaFormValues = z.infer<typeof updatePatientSchema>;

export function PatientUpdateSheet({
	patient,
	onUpdated,
	children,
}: PatientUpdateSheetProps) {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<UpdatePatientShemaFormValues>({
		resolver: zodResolver(updatePatientSchema),
		defaultValues: {
			name: patient.name ?? '',
			birthDate: patient.birthDate ?? '',
			phone: patient.phone ?? '',
			note: patient.note ?? '',
		},
	});

	useEffect(() => {
		reset({
			name: patient.name ?? '',
			birthDate: patient.birthDate ?? '',
			phone: patient.phone ?? '',
			note: patient.note ?? '',
		});
	}, [patient, reset]);

	async function handleUpdatePatient(values: UpdatePatientShemaFormValues) {
		const payload: Patient = {
			...patient,
			name: values.name,
			birthDate: values.birthDate,
			phone: values.phone,
			note: values.note?.trim() ? values.note : null,
		};

		await fetch(`/api/patients/${patient.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		onUpdated?.(payload);
		setOpen(false);
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				{children ?? (
					<Button type='button' className='w-full sm:flex-1 px-5'>
						Atualizar informações
					</Button>
				)}
			</SheetTrigger>
			<SheetContent side='right' className='sm:max-w-md'>
				<form
					className='flex h-full flex-col gap-6'
					onSubmit={handleSubmit(handleUpdatePatient)}
				>
					<SheetHeader>
						<SheetTitle>Atualizar informações</SheetTitle>
						<SheetDescription>
							Edite os dados do paciente. Caso nenhum campo seja alterado, as
							informações permanecem as mesmas, mas o envio enviará os valores
							atuais.
						</SheetDescription>
					</SheetHeader>

					<div className='flex flex-col gap-4 px-4'>
						<div className='space-y-1'>
							<Label htmlFor='update-name'>Nome</Label>
							<Input
								{...register('name')}
								aria-invalid={errors.name ? 'true' : 'false'}
							/>
							{errors.name?.message ? (
								<p className='text-xs text-destructive'>
									{errors.name.message}
								</p>
							) : null}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='update-birth'>Data de nascimento</Label>
							<Input
								type='date'
								{...register('birthDate')}
								aria-invalid={errors.birthDate ? 'true' : 'false'}
							/>
							{errors.birthDate?.message ? (
								<p className='text-xs text-destructive'>
									{errors.birthDate.message}
								</p>
							) : null}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='update-phone'>Telefone</Label>
							<Input
								type='tel'
								{...register('phone')}
								aria-invalid={errors.phone ? 'true' : 'false'}
							/>
							{errors.phone?.message ? (
								<p className='text-xs text-destructive'>
									{errors.phone.message}
								</p>
							) : null}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='update-note'>Notas</Label>
							<textarea
								{...register('note')}
								rows={4}
								className='border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 min-h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
								placeholder='Adicione observações clínicas, preferências ou alergias.'
							/>
							{errors.note?.message ? (
								<p className='text-xs text-destructive'>
									{errors.note.message}
								</p>
							) : null}
						</div>
					</div>

					<SheetFooter className='mt-auto'>
						<Button
							type='button'
							variant='outline'
							className='w-full'
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							{isSubmitting ? 'Salvando...' : 'Salvar alterações'}
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
