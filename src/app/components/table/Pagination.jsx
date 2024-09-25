import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Pagination = ({ table, totalRows }) => {
	const { getState, setPageIndex, getPageCount, previousPage, nextPage, getCanPreviousPage, getCanNextPage } = table;

	const { pageIndex, pageSize } = getState().pagination;
	const totalPageCount = getPageCount();

	// Function to generate page numbers
	const generatePageNumbers = () => {
		const pages = [];
		const maxPageNumbers = 5; // Maximum number of page buttons to display
		const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

		let startPage = Math.max(pageIndex - halfMaxPageNumbers, 0);
		let endPage = Math.min(startPage + maxPageNumbers - 1, totalPageCount - 1);

		if (endPage - startPage < maxPageNumbers - 1) {
			startPage = Math.max(endPage - maxPageNumbers + 1, 0);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return { pages, startPage, endPage };
	};

	const { pages: pageNumbers, startPage, endPage } = generatePageNumbers();

	return (
		<div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
			{/* Mobile view */}
			<div className='flex flex-1 justify-between sm:hidden'>
				<button
					onClick={() => previousPage()}
					disabled={!getCanPreviousPage()}
					className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
				>
					Previous
				</button>
				<button
					onClick={() => nextPage()}
					disabled={!getCanNextPage()}
					className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
				>
					Next
				</button>
			</div>
			{/* Desktop view */}
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm text-gray-700'>
						Showing <span className='font-medium'>{pageIndex * pageSize + 1}</span> to <span className='font-medium'>{Math.min((pageIndex + 1) * pageSize, totalRows)}</span> of{" "}
						<span className='font-medium'>{totalRows}</span> results
					</p>
				</div>
				<div>
					<nav aria-label='Pagination' className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
						<button
							onClick={() => previousPage()}
							disabled={!getCanPreviousPage()}
							className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
						>
							<span className='sr-only'>Previous</span>
							<ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
						</button>

						{/* Render first page and ellipsis if needed */}
						{startPage > 0 && (
							<>
								<button
									onClick={() => setPageIndex(0)}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
										pageIndex === 0
											? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									}`}
								>
									1
								</button>
								{startPage > 1 && <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700'>...</span>}
							</>
						)}

						{/* Page numbers */}
						{pageNumbers.map((pageNumber) => (
							<button
								key={pageNumber}
								onClick={() => setPageIndex(pageNumber)}
								className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
									pageIndex === pageNumber
										? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
								}`}
							>
								{pageNumber + 1}
							</button>
						))}

						{/* Render ellipsis and last page if needed */}
						{endPage < totalPageCount - 1 && (
							<>
								{endPage < totalPageCount - 2 && <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700'>...</span>}
								<button
									onClick={() => setPageIndex(totalPageCount - 1)}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
										pageIndex === totalPageCount - 1
											? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									}`}
								>
									{totalPageCount}
								</button>
							</>
						)}

						<button
							onClick={() => nextPage()}
							disabled={!getCanNextPage()}
							className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
						>
							<span className='sr-only'>Next</span>
							<ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};
