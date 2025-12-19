import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LogotypeCarely } from '@/components/logotype-carely';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }),
	password: z
		.string()
		.min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: SignupFormValues) => {
		console.log('Cadastro', values);
	};

	return (
		<div
			className={cn(
				'flex min-h-screen w-full flex-col items-center justify-center bg-muted/20',
				className
			)}
			{...props}
		>
			<Card className='h-full w-full max-w-6xl overflow-hidden p-0'>
				<CardContent className='grid h-full items-stretch p-0 md:grid-cols-2'>
					<form
						className='flex flex-col gap-4 p-6 md:p-8'
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='text-2xl font-bold'>Crie sua conta</h1>
								<p className='text-balance text-sm text-muted-foreground'>
									Informe seu e-mail abaixo para criar sua conta.
								</p>
							</div>
							<Field>
								<FieldLabel htmlFor='email'>E-mail</FieldLabel>
								<Input
									type='email'
									placeholder='seuemail@exemplo.com'
									{...register('email')}
									aria-invalid={errors.email ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.email ? 'text-destructive' : undefined}
								>
									{errors.email?.message ??
										'Usaremos este e-mail para contato. Não compartilharemos seu endereço com terceiros.'}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor='password'>Senha</FieldLabel>
								<Input
									type='password'
									{...register('password')}
									aria-invalid={errors.password ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.password ? 'text-destructive' : undefined}
								>
									{errors.password?.message ??
										'Deve ter pelo menos 8 caracteres.'}
								</FieldDescription>
							</Field>
							<Field>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting ? 'Enviando...' : 'Criar conta'}
								</Button>
							</Field>
							<FieldDescription className='text-center'>
								Já tem uma conta? <Link to='/auth/sign-in'>Entrar</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className='relative hidden bg-muted md:block'>
						<div className='absolute inset-0'>
							<LogotypeCarely fit='cover' className='h-full w-full' />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
