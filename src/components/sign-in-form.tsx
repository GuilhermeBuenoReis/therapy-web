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

const signInSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }),
	password: z
		.string()
		.min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (values: SignInFormValues) => {
		console.log('Login', values);
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
								<h1 className='text-2xl font-bold'>Bem-vindo de volta</h1>
								<p className='text-balance text-sm text-muted-foreground'>
									Acesse sua conta para continuar.
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
										'Digite o e-mail que você usa para acessar sua conta.'}
								</FieldDescription>
							</Field>
							<Field>
								<div className='flex items-center'>
									<FieldLabel htmlFor='password'>Senha</FieldLabel>
									<button
										type='button'
										className='ml-auto text-sm underline-offset-2 hover:underline'
									>
										Esqueceu a senha?
									</button>
								</div>
								<Input
									type='password'
									{...register('password')}
									aria-invalid={errors.password ? 'true' : 'false'}
								/>
								<FieldDescription
									className={errors.password ? 'text-destructive' : undefined}
								>
									{errors.password?.message ?? 'Mínimo de 8 caracteres.'}
								</FieldDescription>
							</Field>
							<Field>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting ? 'Entrando...' : 'Entrar'}
								</Button>
							</Field>
							<FieldDescription className='text-center'>
								Não tem uma conta? <Link to='/auth/sign-up'>Criar conta</Link>
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
