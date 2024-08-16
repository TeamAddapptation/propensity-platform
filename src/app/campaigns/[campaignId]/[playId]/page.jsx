"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayContentView from "./components/PlayContentView";
import FacebookAd from "./components/AdPreviews/FacebookAd";
import Loading from "@/app/components/Loading";
import AdIcon from "./components/AdIcon";

export default function Play({ params }) {
	const [editMode, setEditMode] = useState(false);
	const [initialPlayData, setInitialPlayData] = useState(null);

	function editHandler(isEdit, isCancel) {
		setEditMode(isEdit);
		if (isCancel) setPlayData(initialPlayData);
		console.log(editMode);
	}

	const {
		data: playData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["play"],
		queryFn: async () => {
			const res = await fetch(
				`https://t-propensity-react.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&play_buying_circles=true&campaign_id=${params.campaignId}&play_id=${params.playId}`
			);
			const data = await res.json();
			return data ? data : {}; // Ensure data is always a plain object
		},
	});

	if (isLoading) {
		return <Loading text={"Loading Play Data"} />;
	}

	if (error) {
		return <p>Error loading data: {error.message}</p>;
	}

	// Ensure we are accessing the correct nested object
	const play = playData?.play;
	if (!play) {
		return <p>No play data found</p>;
	}

	// Status badge rendering
	function getStatusBadge(status) {
		if (!status) {
			return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
		}

		switch (status.toLowerCase()) {
			case "active":
				return <span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600'>Active</span>;
			case "paused":
				return <span className='inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600'>Paused</span>;
			case "inactive":
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Inactive</span>;
			case "ended":
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Ended</span>;
			default:
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
		}
	}

	return (
		<div className='rounded-lg bg-white m-4'>
			<div className='overflow-hidden border-b border-gray-200 mb-4'>
				<h2 id='play-overview-title' className='sr-only'>
					Play Overview
				</h2>
				<div className='p-4'>
					<div className='sm:flex sm:items-center sm:justify-between'>
						<div className='sm:flex sm:space-x-5 items-center'>
							<div className='flex-shrink-0'>
								<AdIcon type={play.Type__c} />
							</div>
							<div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
								<p className='text-sm font-medium text-gray-600'>{play.Type__c || "No type available"}</p>
								<p className='text-lg font-semibold text-gray-900 sm:text-lg'>{play.Name || "No name available"}</p>
								<p className='text-sm font-medium text-gray-600'>{getStatusBadge(play.Status__c)}</p>
							</div>
						</div>
						<div className='mt-5 flex justify-center sm:mt-0'>
							<a href='#' className='rounded bg-red px-2 py-1 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50'>
								Not Launch Ready
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col lg:flex-row p-2 sm:p-6 lg:p-4 gap-3'>
				<div className='w-full lg:w-6/12 bg-white'>
					<PlayContentView play={play} editHandler={editHandler} />
				</div>
				<div className='w-full lg:w-6/12 bg-gray-100 p-10'>
					<FacebookAd play={play} />
				</div>
			</div>
		</div>
	);
}
