"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import styles from "./settings.module.css";

const columnDef = [
	{
		accessorKey: "Name",
		header: "Name",
	},
	{
		accessorKey: "users",
		header: "Users",
		cell: (info) => <div className={`${styles.truncate_2_lines}`}>{info.getValue()}</div>,
	},
	{
		accessorKey: "switch",
		header: "Switch Workspace",
		cell: (info) => (
			<button type='button' className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
				Switch
			</button>
		),
	},
];

export default function Page() {
	const finalColumnDef = useMemo(() => columnDef, []);

	const {
		data: workspaces,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["workspaces"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&workspaces=true`);
			const data = await res.json();

			// Add a 'users' field to each workspace with joined user names
			return data.map((workspace) => {
				const users = workspace.Organization_Users__r ? workspace.Organization_Users__r.map((user) => user.User__r.Name).join(", ") : "No Users";
				return { ...workspace, users };
			});
		},
	});

	const table = useReactTable({
		columns: finalColumnDef,
		data: workspaces || [], // Ensure data is always defined
		getCoreRowModel: getCoreRowModel(),
	});

	if (!workspaces) return <p>Loading Workspaces</p>;

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-gray-900'>Users</h1>
					<p className='mt-2 text-sm text-gray-700'>A list of all the users in your account including their name, title, email and role.</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'></div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-300'>
								<thead className='bg-gray-50'>
									{table.getHeaderGroups().map((headerEl) => (
										<tr key={headerEl.id}>
											{headerEl.headers.map((columnEl) => (
												<th key={columnEl.id} colSpan={columnEl.colSpan} className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
													{columnEl.isPlaceholder ? null : flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody className='divide-y divide-gray-200 bg-white'>
									{table.getRowModel().rows.map((rowEl) => (
										<tr key={rowEl.id}>
											{rowEl.getVisibleCells().map((cellEl) => (
												<td key={cellEl.id} className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
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
		</div>
	);
}
