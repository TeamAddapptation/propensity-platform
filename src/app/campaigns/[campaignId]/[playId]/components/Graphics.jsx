import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";

export default function Graphics({ assets }) {
	const columnHelper = createColumnHelper();
	const assetColumns = [
		columnHelper.accessor("image", {
			header: "Image",
			id: "image",
			cell: ({ row }) => (
				<div className='flex justify-center gap-2 w-16'>
					<img src={row.original.image} />
				</div>
			),
		}),
		columnHelper.accessor("description", {
			header: "Details",
			id: "details",
			cell: ({ row }) => (
				<div className='flex flex-col justify-center gap-2 w-16'>
					<p className='text-sm'>{row.original.image_name}</p>
					<p className='text-xs'>{row.original.size}</p>
				</div>
			),
		}),
		columnHelper.accessor("actions", {
			header: "Actions",
			id: "actions",
			cell: ({ row }) => <div className='flex flex-col justify-center gap-2 w-16'>Edit</div>,
		}),
	];

	const table = useReactTable({
		data: assets,
		columns: assetColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			{table && table.getHeaderGroups().length > 0 && (
				<div>
					<div className='flow-root'>
						<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
							<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
								<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
									<table className='min-w-full divide-y divide-gray-300'>
										<thead className='bg-gray-50'>
											{table.getHeaderGroups().map((headerGroup) => (
												<tr key={headerGroup.id}>
													{headerGroup.headers.map((header) => (
														<th key={header.id} scope='col' className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${header.column.columnDef.classes}`}>
															{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
														</th>
													))}
												</tr>
											))}
										</thead>
										<tbody className='divide-y divide-gray-200 bg-white'>
											{table.getRowModel().rows.map((row, index) => (
												<tr key={index}>
													{row.getVisibleCells().map((cell) => (
														<td key={cell.id} className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
				</div>
			)}
		</>
	);
}
