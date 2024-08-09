"use client";
import { useState } from "react";
import Link from "next/link";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Pagination } from "./Pagination";
export const CampaignsTable = ({ campaigns }) => {
	const [campaignsData, setCampaignsData] = useState(campaigns);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	console.log("Campaings Data: ", campaignsData);

	const selectPlay = (play) => {
		console.log(play);
	};

	const columnHelper = createColumnHelper();
	const campaignColumns = [
		columnHelper.accessor("name", {
			cell: (info) => (
				<Link className='text-tertiary-500 hover:text-tertiary-400 visited:text-tertiary-800' href={`campaigns/${info.row.original.id}`}>
					{info.getValue()}
				</Link>
			),
		}),
		columnHelper.accessor("status", {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("playbook", {
			cell: (info) => info.getValue(),
		}),
		{
			header: "Actions",
			id: "actions",
			classes: "flex justify-center",
			size: 150,
			cell: ({ row }) => (
				<div className='flex justify-center gap-2'>
					{/* Example buttons */}
					<button
						type='button'
						onClick={() => selectPlay(row.original, true)}
						className='rounded bg-primary-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Edit
					</button>
					<button type='button' className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						Delete
					</button>
				</div>
			),
		},
	];

	const table = useReactTable({
		data: campaignsData,
		columns: campaignColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			pagination,
		},
	});

	if (campaignsData && campaignsData.length == 0) return <p>Loading Campaign Data</p>;

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			{table && table.getHeaderGroups().length > 0 && (
				<div>
					<div className='sm:flex sm:items-center'>
						<div className='sm:flex-auto'>
							<h1 className='text-base font-semibold leading-6 text-gray-900'>ABM Campaigns</h1>
							<p className='mt-2 text-sm text-gray-700'>
								Welcome to your ABM Campaign Overview. Here, you can view all your active and past campaigns, track their current status, and see which playbook each campaign is utilizing. Quickly
								identify progress and make informed decisions to optimize your account-based marketing strategies.
							</p>
						</div>
						<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
							<button
								type='button'
								className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								New Campaign
							</button>
						</div>
					</div>
					<div className='mt-8 flow-root'>
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
											{table.getRowModel().rows.map((row) => (
												<tr key={row.id}>
													{row.getVisibleCells().map((cell) => (
														<td key={cell.id} className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
									<Pagination table={table} totalPages={campaignsData.length} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
