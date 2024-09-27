"use client";
import { useMemo, useState } from "react";
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Pagination } from "./Pagination";

const Table = ({ columns, tableData, enableSorting, initialSorting, enablePagination, pageSize, searchText, typeFilter }) => {
	const finalColumnDef = useMemo(() => columns, []);

	// Filtering the data based on searchText and typeFilter
	const filteredData = useMemo(() => {
		return tableData.filter((row) => {
			// Filter by typeFilter
			if (typeFilter && row.type !== typeFilter) {
				return false;
			}
			// Filter by searchText
			if (searchText) {
				const searchString = searchText.toLowerCase();
				return Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchString));
			}
			return true; // Show all rows if no filters are applied
		});
	}, [tableData, searchText, typeFilter]); // Ensure typeFilter is added to dependencies

	const [sorting, setSorting] = useState(initialSorting || []);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: pageSize || 10,
	});

	const table = useReactTable({
		columns: finalColumnDef,
		data: filteredData, // Use the filtered data here
		getCoreRowModel: getCoreRowModel(),
		...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
		state: {
			sorting: sorting,
			pagination,
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className='flow-root'>
			<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead className='bg-gray-50'>
								{table.getHeaderGroups().map((headerEl) => (
									<tr key={headerEl.id}>
										{headerEl.headers.map((columnEl) => (
											<th
												key={columnEl.id}
												onClick={columnEl.column.getToggleSortingHandler()}
												colSpan={columnEl.colSpan}
												className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
												style={{ width: columnEl.column.columnDef.width }}
											>
												<div className={`flex ${columnEl.column.columnDef.centered ? "justify-center" : "justify-start"} items-center`}>
													{columnEl.isPlaceholder ? null : flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
													<span className='ml-2'>
														{columnEl.column.getIsSorted() === "asc" ? (
															<i className='fas fa-sort-up'></i>
														) : columnEl.column.getIsSorted() === "desc" ? (
															<i className='fas fa-sort-down'></i>
														) : (
															columnEl.column.getCanSort() && <i className='fas fa-sort text-gray-300'></i>
														)}
													</span>
												</div>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody className='divide-y divide-gray-200 bg-white'>
								{table.getRowModel().rows.map((rowEl) => (
									<tr key={rowEl.id}>
										{rowEl.getVisibleCells().map((cellEl) => (
											<td key={cellEl.id} className='py-4 pl-4 pr-3 text-sm font-regular text-gray-900 sm:pl-6' style={{ width: cellEl.column.columnDef.width }}>
												{flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						{enablePagination ? <Pagination table={table} totalRows={filteredData.length} /> : ""}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
