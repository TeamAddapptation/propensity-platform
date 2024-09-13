"use client";
import { useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import PlayTableMenu from "./PlayTableMenu";
import Link from "next/link";
import { formatDate, adIcon, statusBadge } from "@/app/utilities/helpers";

export default function PlaysTable({ campaignId, playsData }) {
	const sortedPlays = playsData.sort((a, b) => a.name.localeCompare(b.name));
	console.log("Plays Data: ", playsData);
	const [plays, setPlays] = useState(sortedPlays);

	const columnHelper = createColumnHelper();
	const playsColumns = [
		columnHelper.accessor("name", {
			header: "Play Name",
			cell: (info) => (
				<div className='flex gap-2 items-center'>
					<span className='p__play-icon'>{adIcon(info.row.original.type, "w-6 h-6", "text-sm")}</span>
					<div className='flex flex-col'>
						<Link className='text-gray-500 hover:text-tertiary-400 visited:text-gray-800' href={`${campaignId}/${info.row.original.id}`}>
							{info.getValue()}
						</Link>
						<p className='truncate text-xs leading-5 text-gray-500'>{info.row.original.type}</p>
					</div>
				</div>
			),
		}),
		columnHelper.accessor("run date", {
			header: "Run Date",
			classes: "text-center",
			cell: (info) => (
				<div className='text-center'>
					<p className='text-xs'>
						{formatDate(info.row.original.planned_start)} - {formatDate(info.row.original.planned_end)}
					</p>
				</div>
			),
		}),
		columnHelper.accessor("status", {
			header: "Status",
			classes: "text-center",
			cell: (info) => <div className='text-center'>{statusBadge(info.row.original.status)}</div>,
		}),

		columnHelper.accessor("actions", {
			header: "Actions",
			classes: "text-center",
			cell: (info) => <PlayTableMenu campaignId={campaignId} playData={info.row.original} />,
		}),
	];

	const table = useReactTable({
		data: plays,
		columns: playsColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			{table && table.getHeaderGroups().length > 0 && (
				<div>
					<div className='sm:flex sm:items-center'>
						<div className='sm:flex-auto'>
							<h1 className='text-base font-semibold leading-6 text-gray-900'>Plays</h1>
						</div>
						<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
							<button
								type='button'
								className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								New Play
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
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
