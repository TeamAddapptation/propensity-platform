"use client";
import { CampaignsTable } from "./components/CampaignsTable";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/layout/Container";
import Table from "../components/table/Table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
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
			<Container>{<Table columns={campaignColumns} tableData={campaigns} enableSorting={true} initialSorting={[{ id: "name", desc: false }]} enablePagination={true} pageSize={10} />}</Container>
		</div>
	);
}
