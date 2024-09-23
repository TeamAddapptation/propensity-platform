"use client";
import { getCoreRowModel, flexRender, useReactTable } from "@tanstack/react-table";
import { useState } from "react";


export const AccountsTable = (accounts) => {
    const [data, setData] = useState(accounts);
    console.log(data.accounts)
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'accounts_found',
            header: 'Accounts',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'buying_circles_found',
            header: 'Buying Circles',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'signals',
            header: 'Signals',
            cell: (props) => {
                const signals = props.getValue() || [];
                
                return (
                    <div>
                        {signals.map((signal, index) => (
                            <p key={index}>{signal}</p>
                        ))}
                    </div>
                );
            }
        },
        {
            accessorKey: 'list_type',
            header: 'List Type',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'created_date',
            header: 'Date Created',
            cell: (props) => {
                const date = new Date(props.getValue());
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(date)
                return (
                    <p>{formattedDate}</p>
                )
            }
        },
        {
            accessorKey: 'last_enriched',
            header: 'Last Updated',
            cell: (props) => {
                const date = props.getValue();
                let formattedDate = "";
                if(date){
                    const convertedDate = new Date(date)
                    formattedDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(convertedDate)
                }
                
                return (
                    <p>{formattedDate}</p>
                )
            }
        }
    ]
    
    const table = useReactTable({
        data: data.accounts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    
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
														<td key={cell.id} className='whitespace-nowrap px-3 py-4 text-sm text-gray-500' >
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
    )
};