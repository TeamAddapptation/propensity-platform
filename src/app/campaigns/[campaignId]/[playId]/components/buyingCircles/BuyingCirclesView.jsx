"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserGroupIcon } from "@heroicons/react/20/solid";

export default function ViewBuyingCircles({ connected, filteredBuyingCircles, campaignId, playId, outline, mutate }) {
	const [loadingStatus, setLoadingStatus] = useState({}); // Track the loading status of each buying circle
	const queryClient = useQueryClient();

	const { mutate: connectBuyingCircle } = useMutation({
		mutationFn: async ({ connect, id, campaignId, playId }) => {
			setLoadingStatus((prevState) => ({
				...prevState,
				[id]: connect ? "connecting" : "disconnecting",
			}));

			const buyingCircleAction = connect ? "connect=true" : "disconnect=true";
			const response = await fetch(`https://t-propensity-react.addapptation.com/data_write?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&buying_circle_connect=true&${buyingCircleAction}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ campaign_id: campaignId, play_id: playId, bc_id: id }),
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		},
		onSuccess: (data, { id, connect }) => {
			queryClient.invalidateQueries(["buyingCircles", campaignId, playId]);
			setLoadingStatus((prevState) => ({
				...prevState,
				[id]: connect ? "connected" : "disconnected",
			}));
		},
		onError: (error, { id }) => {
			console.error("Error connecting/disconnecting buying circle:", error);
			setLoadingStatus((prevState) => ({
				...prevState,
				[id]: null,
			}));
		},
	});

	function renderStatusIndicator(text) {
		return (
			<span className='inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium text-red-700'>
				<svg className='h-1.5 w-1.5 fill-red-500' viewBox='0 0 6 6' aria-hidden='true'>
					<circle cx={3} cy={3} r={3} />
				</svg>
				{text}
			</span>
		);
	}

	return (
		<>
			{/* Connected Buying Circles */}
			<div>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center' aria-hidden='true'>
						<div className='w-full border-t border-gray-300' />
					</div>
					<div className='relative flex justify-start'>
						<span className='bg-white pr-3 text-sm font-medium leading-6 text-slate-600'>Connected</span>
					</div>
				</div>
				{connected && connected.length === 0 ? (
					<div className='relative flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center mt-3'>
						<UserGroupIcon className='text-gray-400 w-8 h-8' />
						<span className='mt-2 block text-sm font-semibold text-gray-400'>No Connected Buying Circles</span>
					</div>
				) : (
					<ul role='list' className='flex flex-col gap-2'>
						{connected.map((buyingCircle, index) => (
							<li key={index} className='flex items-center justify-between gap-x-6 p-2 border rounded border-gray-300'>
								<div className='flex items-start gap-x-3'>
									<p className='text-sm leading-6 text-gray-900'>{buyingCircle.Buying_Circle__r.Name}</p>
								</div>
								<div className='flex ml-auto'>
									<button
										type='button'
										onClick={() => connectBuyingCircle({ connect: false, id: buyingCircle.Id, campaignId, playId })}
										className={`bg-white rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
											loadingStatus[buyingCircle.Id] ? "opacity-50 animate-pulse" : ""
										}`}
										disabled={loadingStatus[buyingCircle.Id] === "connecting" || loadingStatus[buyingCircle.Id] === "disconnecting"}
									>
										{loadingStatus[buyingCircle.Id] === "disconnecting" ? "Disconnecting..." : "Disconnect"}
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			{/* Not Connected Buying Circles */}
			<div className='pt-4'>
				<div className='relative mb-4'>
					<div className='absolute inset-0 flex items-center' aria-hidden='true'>
						<div className='w-full border-t border-gray-300' />
					</div>
					<div className='relative flex justify-start'>
						<span className='bg-white pr-3 text-sm font-medium leading-6 text-slate-700'>Buying Circles</span>
					</div>
				</div>
				{filteredBuyingCircles && filteredBuyingCircles.length === 0 ? (
					<button
						type='button'
						className='relative flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-3'
					>
						<UserGroupIcon className='text-gray-400 w-8 h-8' />
						<span className='mt-2 block text-sm font-semibold text-gray-400'>No Connected Buying Circles</span>
					</button>
				) : (
					<ul role='list' className='flex flex-col gap-2'>
						{filteredBuyingCircles.map((buyingCircle, index) => (
							<li key={index} className='flex items-center justify-between gap-x-6 p-2 border rounded border-gray-300'>
								<div className='min-w-0'>
									<div className='flex items-start gap-x-3'>
										<p className='text-sm leading-6 text-gray-900 m-0'>{buyingCircle.Name}</p>
									</div>
									<div className='flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
										<p className='whitespace-nowrap'>{buyingCircle.Total__c ? buyingCircle.Total__c.toLocaleString() : "0"} Contacts</p>
									</div>
								</div>
								<div className='flex flex-none items-center gap-x-4'>
									{buyingCircle.Total__c < outline.min_contacts && renderStatusIndicator(`Under ${outline.min_contacts} Contacts`)}
									{!buyingCircle.Enriched__c && renderStatusIndicator("Not Enriched")}
									{buyingCircle.Total__c > outline.min_contacts && buyingCircle.Enriched__c && (
										<button
											type='button'
											onClick={() => connectBuyingCircle({ connect: true, id: buyingCircle.Id, campaignId, playId })}
											className={`bg-white rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
												loadingStatus[buyingCircle.Id] ? "opacity-50 animate-pulse" : ""
											}`}
											disabled={loadingStatus[buyingCircle.Id] === "connecting" || loadingStatus[buyingCircle.Id] === "disconnecting"}
										>
											{loadingStatus[buyingCircle.Id] === "connecting" ? "Connecting..." : "Connect"}
										</button>
									)}
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}
