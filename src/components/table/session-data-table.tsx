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
import { sessionStatusInfo } from './session-columns';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	emptyMessage?: string;
};

type ColumnMeta = {
	headerClassName?: string;
	cellClassName?: string;
};

export function SessionDataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = 'Nenhuma sessão para este período.',
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='rounded-2xl border border-border/60 bg-gradient-to-br from-sky-50/60 via-background to-background p-4 shadow-sm dark:from-slate-900/50'>
			<Table className='w-full table-auto border-separate border-spacing-y-4 border-spacing-x-0 text-sm'>
				<TableHeader className='sr-only'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const meta = header.column.columnDef.meta as
									| ColumnMeta
									| undefined;
								return (
									<TableHead
										key={header.id}
										className={cn(meta?.headerClassName)}
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
						table.getRowModel().rows.map((row) => {
							const status = (row.original as { status?: string }).status;
							const tint = status
								? sessionStatusInfo[
										status as keyof typeof sessionStatusInfo
									]
								: undefined;
							const bgTint = tint ? `${tint.dotColor}14` : undefined; // ~8%
							const borderTint = tint ? `${tint.dotColor}33` : undefined; // ~20%

							return (
								<TableRow
									key={row.id}
									className='bg-white/80 dark:bg-slate-900/60 border border-border/70 shadow-sm backdrop-blur-sm'
									style={{
										backgroundColor: bgTint,
										borderColor: borderTint,
									}}
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
													'py-4 align-middle',
													meta?.cellClassName,
													isFirst && 'rounded-l-xl',
													isLast && 'rounded-r-xl'
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
							);
						})
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-20 text-center text-sm text-muted-foreground'
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
