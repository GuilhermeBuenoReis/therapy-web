import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	emptyMessage?: string;
};

type ColumnMeta = {
	headerClassName?: string;
	cellClassName?: string;
};

export function PatientDataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = 'No results found.',
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table className='min-w-full text-sm'>
			<TableHeader className='bg-muted/40 text-xs uppercase tracking-[0.08em] text-muted-foreground'>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id} className='border-border/60'>
						{headerGroup.headers.map((header) => {
							const meta = header.column.columnDef.meta as
								| ColumnMeta
								| undefined;

							return (
								<TableHead
									key={header.id}
									className={cn('px-4 py-3 font-semibold', meta?.headerClassName)}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							className='border-border/60 bg-card transition-colors hover:bg-muted/50'
						>
							{row.getVisibleCells().map((cell) => {
								const meta = cell.column.columnDef.meta as
									| ColumnMeta
									| undefined;
								return (
									<TableCell
										key={cell.id}
										className={cn('px-4 py-4', meta?.cellClassName)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								);
							})}
						</TableRow>
					))
				) : (
					<TableRow className='border-border/60'>
						<TableCell
							colSpan={columns.length}
							className='h-24 text-center text-sm text-muted-foreground'
						>
							{emptyMessage}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
