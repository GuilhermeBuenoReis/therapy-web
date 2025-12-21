import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const createPatientSchema = z.object({
	name: z.string().min(1, { message: 'Informe o nome do paciente.' }),
	birthDate: z.string().min(1, { message: 'Informe a data de nascimento.' }),
	phone: z.string().min(1, { message: 'Informe o telefone.' }),
	note: z
		.string()
		.max(20_000, { message: 'Limite máximo de 20.000 caracteres.' })
		.optional(),
});

type CreatePatientFormValues = z.infer<typeof createPatientSchema>;

export function CreateNewPatient() {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreatePatientFormValues>({
		resolver: zodResolver(createPatientSchema),
		defaultValues: {
			name: '',
			birthDate: '',
			phone: '',
			note: '',
		},
	});

	const onSubmit = async (values: CreatePatientFormValues) => {
		console.log('Novo paciente', values);
		reset();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen) => {
				setOpen(nextOpen);
				if (!nextOpen) {
					reset();
				}
			}}
		>
			<DialogTrigger asChild>
				<Button className='cursor-pointer'>Novo paciente</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo paciente</DialogTitle>
					<DialogDescription>
						Cadastre um novo paciente preenchendo os dados abaixo.
					</DialogDescription>
				</DialogHeader>

				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Nome</FieldLabel>
							<Input
								placeholder='Nome completo'
								{...register('name')}
								aria-invalid={errors.name ? 'true' : 'false'}
							/>
							<FieldDescription
								className={errors.name ? 'text-destructive' : undefined}
							>
								{errors.name?.message ?? 'Digite o nome completo do paciente.'}
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel>Data de nascimento</FieldLabel>
							<Input
								type='date'
								{...register('birthDate')}
								aria-invalid={errors.birthDate ? 'true' : 'false'}
							/>
							<FieldDescription
								className={errors.birthDate ? 'text-destructive' : undefined}
							>
								{errors.birthDate?.message ?? 'Informe a data de nascimento.'}
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel>Telefone</FieldLabel>
							<Input
								type='tel'
								placeholder='(00) 00000-0000'
								{...register('phone')}
								aria-invalid={errors.phone ? 'true' : 'false'}
							/>
							<FieldDescription
								className={errors.phone ? 'text-destructive' : undefined}
							>
								{errors.phone?.message ?? 'Adicione um número para contato.'}
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel>Observações</FieldLabel>
							<textarea
								className='border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 min-h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
								rows={4}
								{...register('note')}
								aria-invalid={errors.note ? 'true' : 'false'}
							/>
							<FieldDescription
								className={errors.note ? 'text-destructive' : undefined}
							>
								{errors.note?.message ??
									'Opcional: inclua informações adicionais sobre o paciente.'}
							</FieldDescription>
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								type='button'
								variant='outline'
								className='cursor-pointer'
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='cursor-pointer'
						>
							{isSubmitting ? 'Salvando...' : 'Salvar paciente'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
