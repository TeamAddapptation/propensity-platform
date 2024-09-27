"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import PlayTableMenu from "./components/PlayTableMenu";
import Sidepane from "@/app/components/Sidepane";
import NewPlay from "./components/NewPlay";
import Container from "@/app/components/layout/Container";
import Table from "@/app/components/table/Table";
import { formatDate, adIcon, statusBadge } from "@/app/utilities/helpers";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import TypeFilter from "./components/TypeFilter";

export default function CampaignClient({ campaignId }) {
	const [isSidepaneOpen, setIsSidepaneOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [playTypes, setPlayTypes] = useState([]);

	const {
		data: campaignPlays,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["campaignPlays"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_READ}&campaign=true&campaign_id=${campaignId}`);
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			return data;
		},
	});

	const queryClient = useQueryClient();
	const { mutate: newPlayMutate } = useMutation({
		mutationFn: async (newPlay) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_WRITE}&new_play=true`, {
				method: "POST",
				body: JSON.stringify(newPlay),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Error updating play");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["play"]);
		},
	});

	useEffect(() => {
		if (campaignPlays && campaignPlays.plays) {
			const types = Array.from(new Set(campaignPlays.plays.map((item) => item.type))).sort();
			if (types.length) {
				setPlayTypes(types);
			}
		}
	}, [campaignPlays]);

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const playsColumns = [
		{
			accessorKey: "name",
			header: "Play Name",
			cell: (info) => (
				<div className='flex gap-2 items-center'>
					<span className='p__play-icon'>{adIcon(info.row.original.type, "w-6 h-6", "text-sm")}</span>
					<div className='flex flex-col'>
						<p className='truncate text-xs leading-5 text-gray-500'>{info.row.original.type}</p>
						<Link className='text-gray-500 hover:text-tertiary-400 visited:text-gray-800' href={`${campaignId}/${info.row.original.id}`}>
							{info.getValue()}
						</Link>
					</div>
				</div>
			),
		},
		{
			header: "Run Date",
			accessorKey: "run date",
			classes: "text-center",
			cell: (info) => (
				<div className='text-center'>
					<p className='text-xs'>
						{formatDate(info.row.original.planned_start)} - {formatDate(info.row.original.planned_end)}
					</p>
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			classes: "text-center",
			cell: (info) => <div className='text-center'>{statusBadge(info.row.original.status)}</div>,
		},
		{
			accessorKey: "actions",
			header: "Actions",
			classes: "text-center",
			cell: (info) => <PlayTableMenu campaignId={campaignId} playData={info.row.original} />,
		},
	];

	return (
		<>
			<Container>
				<div className='border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between'>
					<h3 className='text-lg font-semibold leading-6 text-gray-900'>Plays</h3>
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
									placeholder='Search Plays'
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
								/>
							</div>
							<TypeFilter playTypes={playTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
							<button onClick={() => setIsSidepaneOpen(true)} className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'>
								New Play
							</button>
						</div>
					</div>
				</div>
				<Table
					columns={playsColumns}
					tableData={campaignPlays.plays}
					campaignId={campaignId}
					enableSorting={true}
					searchText={searchText}
					initialSorting={[{ id: "name", desc: false }]}
					enablePagination={true}
					pageSize={10}
					typeFilter={selectedType}
				/>
			</Container>
			<Sidepane open={isSidepaneOpen} onClose={() => setIsSidepaneOpen(false)}>
				<NewPlay campaignId={campaignId} newPlayMutate={newPlayMutate} sidepane={setIsSidepaneOpen} />
			</Sidepane>
		</>
	);
}
