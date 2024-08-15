"use client";
import { useState, useEffect } from "react";
import PlayContentView from "./components/PlayContentView";
import FacebookAd from "./components/AdPreviews/FacebookAd";

export default function Play({ params }) {
	const [play, setPlay] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(true);
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(
					`https://t-propensity-dashboard.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&play_buying_circles=true&campaign_id=${params.campaignId}&play_id=${params.playId}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const result = await response.json();
				setPlay(result.play);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	console.log("Play Data: ", play);
	const user = {
		name: "Rebecca Nicholas",
		role: "Product Designer",
		imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	};
	function getStatusBadge(status) {
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
	if (loading) return <p>Loading</p>;
	return (
		<div className='rounded-lg bg-white m-4'>
			<div className='overflow-hidden border-b border-gray-200 mb-4'>
				<h2 id='play-overview-title' className='sr-only'>
					Play Overview
				</h2>
				<div className='p-4'>
					<div className='sm:flex sm:items-center sm:justify-between'>
						<div className='sm:flex sm:space-x-5'>
							<div className='flex-shrink-0'></div>
							<div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
								<p className='text-sm font-medium text-gray-600'>{play.Type__c}</p>
								<p className='text-xl font-bold text-gray-900 sm:text-2xl'>{play.Name}</p>
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
					<PlayContentView play={play} />
				</div>
				<div className='w-full lg:w-6/12 bg-gray-100 p-10'>
					<FacebookAd play={play} />
				</div>
			</div>
		</div>
	);
}
