import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export const PatientFilterSchema = z.object({
	filter: z.string(),
	status: z.string(),
});

export type PatientFilterValues = z.infer<typeof PatientFilterSchema>;

type PatientFilterProps = {
	onFiltersChange?: (values: PatientFilterValues) => void;
	onOpenFilters?: () => void;
};

const statusOptions = [
	{ label: 'All Status', value: 'all' },
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

export function PatientFilter({
	onFiltersChange,
	onOpenFilters,
}: PatientFilterProps) {
	const { register, watch, setValue } = useForm<PatientFilterValues>({
		resolver: zodResolver(PatientFilterSchema),
		defaultValues: {
			filter: '',
			status: statusOptions[0]?.value ?? 'all',
		},
	});

	const currentStatus = watch('status');

	useEffect(() => {
		const subscription = watch((values) => {
			onFiltersChange?.(values as PatientFilterValues);
		});

		return () => subscription.unsubscribe();
	}, [watch, onFiltersChange]);

	return (
		<div className='flex items-center gap-3 rounded-xl border bg-muted/50 p-3 shadow-xs'>
			<div className='relative flex-1'>
				<Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
				<Input
					{...register('filter')}
					placeholder='Search patients...'
					className='pl-9'
					aria-label='Pesquisar pacientes'
				/>
			</div>

			<div className='flex items-center gap-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type='button'
							variant='outline'
							className='min-w-[8.5rem] justify-between'
							aria-label='Filtrar por status'
						>
							{statusOptions.find((option) => option.value === currentStatus)
								?.label ?? 'All Status'}
							<ChevronDown className='size-4 text-muted-foreground' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='min-w-[9.5rem]'>
						<DropdownMenuRadioGroup
							value={currentStatus}
							onValueChange={(value) =>
								setValue('status', value, {
									shouldDirty: true,
									shouldTouch: true,
								})
							}
						>
							{statusOptions.map((option) => (
								<DropdownMenuRadioItem key={option.value} value={option.value}>
									{option.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					type='button'
					variant='outline'
					size='icon'
					onClick={onOpenFilters}
					aria-label='Abrir filtros'
				>
					<Filter className='size-4' />
				</Button>
			</div>
		</div>
	);
}
