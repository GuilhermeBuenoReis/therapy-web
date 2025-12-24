import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { sessionStatusInfo } from '@/components/table/session-columns';
import type { CreateSessionFormValues, SessionStatus } from './session-form';

export function SessionStatusSelectField() {
	const {
		control,
		formState: { errors },
	} = useFormContext<CreateSessionFormValues>();

	return (
		<Field>
			<FieldLabel>Status</FieldLabel>
			<Controller
				name='status'
				control={control}
				render={({ field }) => (
					<Select onValueChange={field.onChange} value={field.value ?? ''}>
						<SelectTrigger
							ref={field.ref}
							aria-invalid={errors.status ? 'true' : 'false'}
						>
							<SelectValue placeholder='Selecione o status' />
						</SelectTrigger>
						<SelectContent>
							{(Object.keys(sessionStatusInfo) as SessionStatus[]).map(
								(status) => (
									<SelectItem key={status} value={status}>
										<span className='inline-flex items-center gap-2'>
											<span
												className='size-2.5 rounded-full'
												style={{
													backgroundColor:
														sessionStatusInfo[status]?.dotColor,
												}}
											/>
											{sessionStatusInfo[status]?.label ?? status}
										</span>
									</SelectItem>
								)
							)}
						</SelectContent>
					</Select>
				)}
			/>
			<FieldDescription
				className={errors.status ? 'text-destructive' : undefined}
			>
				{errors.status?.message ?? 'Acompanhe o estágio da sessão.'}
			</FieldDescription>
		</Field>
	);
}
