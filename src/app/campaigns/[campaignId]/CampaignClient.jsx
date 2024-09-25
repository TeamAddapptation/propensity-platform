"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlaysTable from "./components/PlaysTable";
import Sidepane from "@/app/components/Sidepane";
import NewPlay from "./components/NewPlay";

export default function CampaignClient({ campaignId }) {
	const [isSidepaneOpen, setIsSidepaneOpen] = useState(false);

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

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	return (
		<>
			<div className='flex flex-col lg:flex-row'>
				<div className='w-full lg:w-3/3 bg-white p-4 sm:p-6 lg:p-8 m-4'>
					<div className='sm:flex sm:items-center'>
						<div className='sm:flex-auto'>
							<h1 className='text-base font-semibold leading-6 text-gray-900'>Plays</h1>
						</div>
						<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
							<button onClick={() => setIsSidepaneOpen(true)} className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'>
								New Play
							</button>
						</div>
					</div>
					<PlaysTable campaignId={campaignId} playsData={campaignPlays.plays} />
				</div>
			</div>
			{/* Always render Sidepane and control visibility via the 'open' prop */}
			<Sidepane open={isSidepaneOpen} onClose={() => setIsSidepaneOpen(false)}>
				<NewPlay />
			</Sidepane>
		</>
	);
}
