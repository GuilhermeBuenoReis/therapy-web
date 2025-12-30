import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

export const recordsFilterSchema = z.object({
	filter: z.string().optional(),
});

type RecordsFilterFormValues = z.infer<typeof recordsFilterSchema>;

export function RecordsPatientFilter() {
	const navigateToRecords = useNavigate({ from: '/app/records' });
	const searchParams = useSearch({ from: '/app/records' });

	const { register, watch, setValue } = useForm<RecordsFilterFormValues>({
		resolver: zodResolver(recordsFilterSchema),
		defaultValues: {
			filter: searchParams.filter ?? '',
		},
	});

	const filterValue = watch('filter');

	useEffect(() => {
		const normalizedFilter = filterValue?.trim() ?? '';

		navigateToRecords({
			search: (previousSearch) => ({
				...previousSearch,
				filter: normalizedFilter || undefined,
			}),
			replace: true,
		});
	}, [filterValue, navigateToRecords]);

	useEffect(() => {
		setValue('filter', searchParams.filter ?? '', {
			shouldDirty: false,
			shouldTouch: false,
		});
	}, [searchParams.filter, setValue]);

	return (
		<div className='flex items-center gap-3 rounded-xl border bg-muted/50 p-3 shadow-xs'>
			<div className='relative flex-1'>
				<Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-amber-600' />
				<Input
					{...register('filter')}
					placeholder='Search patient by name'
					className='pl-9'
					aria-label='Buscar paciente por nome'
				/>
			</div>
		</div>
	);
}
