import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { patients } from '../../patient';

const createRecordsSchema = z.object({
	patient: z.string().min(1, { message: 'Informe o paciente.' }),
	sessionReferences: z.string().min(1, { message: 'Informe a sessão.' }),
	clinicalNotes: z.string().min(1, { message: 'Informe as notas clínicas.' }),
	observations: z.string(),
});

type CreateRecordsFormValues = z.infer<typeof createRecordsSchema>;

export function CreateNewRecords() {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<CreateRecordsFormValues>({
		resolver: zodResolver(createRecordsSchema),
		defaultValues: {
			patient: '',
			sessionReferences: '',
			clinicalNotes: '',
			observations: '',
		},
	});

	async function handleCreateNewRecords(values: CreateRecordsFormValues) {
		const payload = { id: crypto.randomUUID(), ...values };

		console.log('Novo registro', payload);
		reset();
		setOpen(false);
	}

	function handleOnOpenChange(nextOpen: boolean) {
		setOpen(nextOpen);
		if (!nextOpen) {
			reset();
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOnOpenChange}>
			<DialogTrigger asChild>
				<Button className='cursor-pointer'>Novo registro</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo registro</DialogTitle>
					<DialogDescription>
						Cadastre um novo registro preenchendo os dados abaixo.
					</DialogDescription>
				</DialogHeader>

				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit(handleCreateNewRecords)}
					noValidate
				>
					<FieldGroup>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<Field>
								<FieldLabel>Paciente</FieldLabel>
								<Controller
									name='patient'
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={field.onChange}
											value={field.value || undefined}
										>
											<SelectTrigger
												ref={field.ref}
												aria-invalid={errors.patient ? 'true' : 'false'}
											>
												<SelectValue placeholder='Selecione o paciente' />
											</SelectTrigger>
											<SelectContent>
												{patients.map((patient) => (
													<SelectItem key={patient.userId} value={patient.name}>
														{patient.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								<FieldDescription
									className={errors.patient ? 'text-destructive' : undefined}
								>
									{errors.patient?.message ??
										'Selecione o paciente do registro.'}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel>Data da sessão referente</FieldLabel>
								<Input
									placeholder='Sessão relacionada'
									{...register('sessionReferences')}
									aria-invalid={errors.sessionReferences ? 'true' : 'false'}
								/>
								<FieldDescription
									className={
										errors.sessionReferences ? 'text-destructive' : undefined
									}
								>
									{errors.sessionReferences?.message ??
										'Referência da sessão vinculada ao registro.'}
								</FieldDescription>
							</Field>
						</div>

						<Field>
							<FieldLabel>Notas clínicas</FieldLabel>
							<Textarea
								placeholder='Principais observações clínicas'
								{...register('clinicalNotes')}
								aria-invalid={errors.clinicalNotes ? 'true' : 'false'}
							/>
							<FieldDescription
								className={
									errors.clinicalNotes ? 'text-destructive' : undefined
								}
							>
								{errors.clinicalNotes?.message ??
									'Descreva os achados e condutas clínicas.'}
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel>Observações adicionais</FieldLabel>
							<Textarea
								placeholder='Informações complementares'
								{...register('observations')}
								aria-invalid={errors.observations ? 'true' : 'false'}
							/>
							<FieldDescription
								className={errors.observations ? 'text-destructive' : undefined}
							>
								{errors.observations?.message ??
									'Observações gerais ou recomendações.'}
							</FieldDescription>
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								type='button'
								variant='outline'
								className='cursor-pointer flex-1'
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='cursor-pointer flex-1'
						>
							{isSubmitting ? 'Salvando...' : 'Salvar registro'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
