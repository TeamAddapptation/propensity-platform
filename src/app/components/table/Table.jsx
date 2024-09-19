"use client";
import { useMemo, useState } from "react";
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { sampleData } from "./sampleData";

const Table = ({ columns, tableData, enableSorting }) => {
	console.log("Columns: ", columns);
	const finalData = useMemo(() => tableData, []);
	const finalColumnDef = useMemo(() => columns, []);

	const [sorting, setSorting] = useState([]);

	const table = useReactTable({
		columns: finalColumnDef,
		data: finalData,
		getCoreRowModel: getCoreRowModel(),
		...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
		state: {
			sorting: sorting,
		},
		onSortingChange: setSorting,
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className='flow-root'>
			<div className='overflow-x-auto'>
				<div className='inline-block min-w-full py-2 align-middle'>
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
											<td key={cellEl.id} className='py-4 pl-4 pr-3 text-sm font-regular text-gray-900 sm:pl-6'>
												{flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
