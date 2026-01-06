import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';

type RecordsPaginationProps = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	pageSize: number;
	onPageChange: (page: number) => void;
};

export function RecordsPagination({
	currentPage,
	totalPages,
	totalItems,
	pageSize,
	onPageChange,
}: RecordsPaginationProps) {
	if (totalItems === 0) return null;

	const start = (currentPage - 1) * pageSize + 1;
	const end = Math.min(start + pageSize - 1, totalItems);
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

	function handleChange(page: number) {
		if (page === currentPage) return;
		onPageChange(Math.max(1, Math.min(page, totalPages)));
	}

	return (
		<div className='flex flex-col gap-3 rounded-xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
			<Pagination className='sm:w-auto sm:justify-end'>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink
							href='#'
							aria-disabled={currentPage === 1}
							onClick={(event) => {
								event.preventDefault();
								if (currentPage > 1) handleChange(currentPage - 1);
							}}
							className={
								currentPage === 1 ? 'pointer-events-none opacity-50' : undefined
							}
							size='default'
						>
							Anterior
						</PaginationLink>
					</PaginationItem>

					{pages.map((pageNumber) => (
						<PaginationItem key={pageNumber}>
							<PaginationLink
								href='#'
								isActive={pageNumber === currentPage}
								onClick={(event) => {
									event.preventDefault();
									handleChange(pageNumber);
								}}
								size='default'
							>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationLink
							href='#'
							aria-disabled={currentPage === totalPages}
							onClick={(event) => {
								event.preventDefault();
								if (currentPage < totalPages) handleChange(currentPage + 1);
							}}
							className={
								currentPage === totalPages
									? 'pointer-events-none opacity-50'
									: undefined
							}
							size='default'
						>
							Próximo
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
