import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	emptyMessage?: string;
};

type ColumnMeta = {
	headerClassName?: string;
	cellClassName?: string;
};

export function PaymentDataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = 'Nenhum pagamento encontrado.',
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm dark:bg-slate-950/60'>
			<Table className='min-w-full text-sm'>
				<TableHeader className='bg-slate-50 text-xs uppercase tracking-[0.08em] text-muted-foreground dark:bg-slate-900/40'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className='border-border/60'>
							{headerGroup.headers.map((header) => {
								const meta = header.column.columnDef.meta as
									| ColumnMeta
									| undefined;
								return (
									<TableHead
										key={header.id}
										className={cn(
											'px-4 py-3 font-semibold',
											meta?.headerClassName
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
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
								className='border-border/60 bg-white transition-colors hover:bg-slate-50/70 dark:bg-slate-950/40 dark:hover:bg-slate-900/40'
							>
								{row.getVisibleCells().map((cell, index) => {
									const meta = cell.column.columnDef.meta as
										| ColumnMeta
										| undefined;
									const isFirst = index === 0;
									const isLast = index === row.getVisibleCells().length - 1;

									return (
										<TableCell
											key={cell.id}
											className={cn(
												'px-4 py-4 align-middle',
												meta?.cellClassName,
												isFirst && 'pl-5',
												isLast && 'pr-5'
											)}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
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
		</div>
	);
}
