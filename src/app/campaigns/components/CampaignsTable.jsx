"use client";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Pagination } from "./Pagination";
export const CampaignsTable = ({ campaigns }) => {
	const sortedCampaigns = campaigns.sort((a, b) => a.name.localeCompare(b.name));
	const [campaignsData, setCampaignsData] = useState(sortedCampaigns);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

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
					<Menu as='div' className='relative flex-none'>
						<MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
							<span className='sr-only'>Open options</span>
							<EllipsisVerticalIcon aria-hidden='true' className='h-5 w-5' />
						</MenuButton>
						<MenuItems
							transition
							className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
						>
							<MenuItem>
								<a href={`/campaigns/${row.original.id}`} className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
									Edit<span className='sr-only'>, {}</span>
								</a>
							</MenuItem>
							<MenuItem>
								<a href='#' className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
									Delete<span className='sr-only'>, {}</span>
								</a>
							</MenuItem>
						</MenuItems>
					</Menu>
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
		<>
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
		</>
	);
};
