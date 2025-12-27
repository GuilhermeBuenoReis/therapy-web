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

const paymentStatusLabels = {
	pending: 'Pendente',
	paid: 'Pago',
	overdue: 'Atrasado',
} as const;

const createPaymentSchema = z.object({
	date: z.string().min(1, { message: 'Informe a data do pagamento.' }),
	patient: z.string().min(1, { message: 'Informe o paciente.' }),
	session: z.string().min(1, { message: 'Informe a sessão.' }),
	amount: z.coerce
		.number()
		.positive({ message: 'Informe um valor maior que zero.' }),
	status: z.enum(['pending', 'paid', 'overdue'], {
		errorMap: () => ({ message: 'Selecione o status.' }),
	}),
});

type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>;

export function CreateNewPayment() {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<CreatePaymentFormValues>({
		resolver: zodResolver(createPaymentSchema),
		defaultValues: {
			date: '',
			patient: '',
			session: '',
			amount: 0,
			status: 'pending',
		},
	});

	async function handleCreateNewPayment(values: CreatePaymentFormValues) {
		const payload = { id: crypto.randomUUID(), ...values };

		console.log('Novo pagamento', payload);
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
				<Button className='cursor-pointer'>Novo pagamento</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo pagamento</DialogTitle>
					<DialogDescription>
						Cadastre um novo pagamento preenchendo os dados abaixo.
					</DialogDescription>
				</DialogHeader>

				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit(handleCreateNewPayment)}
					noValidate
				>
					<FieldGroup>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<Field>
								<FieldLabel>Data</FieldLabel>
								<Input
									type='date'
									{...register('date')}
									aria-invalid={errors.date ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.date ? 'text-destructive' : undefined}
								>
									{errors.date?.message ?? 'Quando o pagamento ocorreu.'}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel>Valor (R$)</FieldLabel>
								<Input
									type='number'
									min={0}
									step='0.01'
									inputMode='decimal'
									{...register('amount')}
									aria-invalid={errors.amount ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.amount ? 'text-destructive' : undefined}
								>
									{errors.amount?.message ?? 'Informe o valor recebido.'}
								</FieldDescription>
							</Field>
						</div>

						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<Field>
								<FieldLabel>Paciente</FieldLabel>
								<Input
									placeholder='Nome do paciente'
									{...register('patient')}
									aria-invalid={errors.patient ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.patient ? 'text-destructive' : undefined}
								>
									{errors.patient?.message ?? 'Quem realizou o pagamento.'}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel>Sessão</FieldLabel>
								<Input
									placeholder='Sessão relacionada'
									{...register('session')}
									aria-invalid={errors.session ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.session ? 'text-destructive' : undefined}
								>
									{errors.session?.message ??
										'Referência da sessão vinculada ao pagamento.'}
								</FieldDescription>
							</Field>
						</div>

						<Field>
							<FieldLabel>Status</FieldLabel>
							<Controller
								name='status'
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value || undefined}
									>
										<SelectTrigger
											ref={field.ref}
											aria-invalid={errors.status ? 'true' : 'false'}
										>
											<SelectValue placeholder='Selecione o status' />
										</SelectTrigger>
										<SelectContent>
											{(
												Object.keys(paymentStatusLabels) as Array<
													keyof typeof paymentStatusLabels
												>
											).map((status) => (
												<SelectItem key={status} value={status}>
													{paymentStatusLabels[status]}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							<FieldDescription
								className={errors.status ? 'text-destructive' : undefined}
							>
								{errors.status?.message ?? 'Situação atual do pagamento.'}
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
							{isSubmitting ? 'Salvando...' : 'Salvar pagamento'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
