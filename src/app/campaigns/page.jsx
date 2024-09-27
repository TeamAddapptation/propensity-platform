"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/layout/Container";
import Table from "../components/table/Table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const campaignColumns = [
	{
		accessorKey: "name",
		header: "Name",
		cell: (info) => (
			<Link className='text-tertiary-500 hover:text-tertiary-400 visited:text-tertiary-800' href={`campaigns/${info.row.original.id}`}>
				{info.getValue()}
			</Link>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "playbook",
		header: "Playbook",
	},
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

export default function Campaigns() {
	const [searchText, setSearchText] = useState("");
	const {
		data: campaigns,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["campaignsData"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_READ}&campaigns=true`);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading || isFetching) return <p>Loading...</p>;
	return (
		<div>
			<Container>
				<div className='border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between'>
					<h3 className='text-lg font-semibold leading-6 text-gray-900'>ABM Campaigns</h3>
					<div className='mt-3 sm:ml-4 sm:mt-0'>
						<label htmlFor='mobile-search-candidate' className='sr-only'>
							Search
						</label>
						<label htmlFor='desktop-search-candidate' className='sr-only'>
							Search
						</label>
						<div className='flex gap-2 items-center rounded-md shadow-sm'>
							<div className='relative flex-grow focus-within:z-10'>
								<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
									<MagnifyingGlassIcon aria-hidden='true' className='h-5 w-5 text-gray-400' />
								</div>
								<input
									id='search-input'
									name='search-input'
									type='text'
									placeholder=''
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
								/>
							</div>
						</div>
					</div>
				</div>
				{<Table columns={campaignColumns} tableData={campaigns} enableSorting={true} searchText={searchText} initialSorting={[{ id: "name", desc: false }]} enablePagination={true} pageSize={10} />}
			</Container>
		</div>
	);
}
