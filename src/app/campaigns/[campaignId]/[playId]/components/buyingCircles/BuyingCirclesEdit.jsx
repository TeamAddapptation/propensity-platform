"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { connectBuyingCircleHandler, disconnectBuyingCircleHandler } from "@/app/utilities/buyingCircleFunctions";
import { classNames } from "@/app/utilities/helpers";

export default function EditBuyingCircles({ connected, filteredBuyingCircles, campaignId, playId, dataVersionHandler, outline }) {
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
	const addHandler = (id, campaignId, playId) => {
		connectBuyingCircleHandler(id, campaignId, playId);
		dataVersionHandler();
	};
	const disconnectHandler = (id, campaignId, playId) => {
		disconnectBuyingCircleHandler(id);
		dataVersionHandler();
	};
	return (
		<>
			{/* Connected Buying Circles */}
			<div>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center' aria-hidden='true'>
						<div className='w-full border-t border-gray-300' />
					</div>
					<div className='relative flex justify-start'>
						<span className='bg-white pr-3 text-base font-semibold leading-6 text-gray-900'>Connected</span>
					</div>
				</div>
				{connected && connected.length === 0 ? (
					<div className='relative flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center mt-3'>
						<UserGroupIcon className='text-gray-400 w-8 h-8' />
						<span className='mt-2 block text-sm font-semibold text-gray-400'>No Connected Buying Circles</span>
					</div>
				) : (
					<ul role='list' className='divide-y divide-gray-100 px-4 py-2'>
						{connected.map((buyingCircle, index) => (
							<li key={index} className='flex items-center justify-between gap-x-6 py-2'>
								<div className='min-w-0'>
									<div className='flex items-start gap-x-3'>
										<p className='text-sm leading-6 text-gray-900'>{buyingCircle.Buying_Circle__r.Name}</p>
										{/* <p className={classNames(statuses[buyingCircle.Enriched__c], "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset")}>
													{buyingCircle.Enriched__c ? "Enriched" : "Not Enriched"}
												</p> */}
									</div>
									{/* <div className='mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
												<p className='whitespace-nowrap'>Total Contacts {buyingCircle.Total__c ? buyingCircle.Total__c.toLocaleString() : "0"}</p>
											</div> */}
								</div>
								<div className='flex flex-none items-center gap-x-4'>
									<button
										type='button'
										onClick={() => disconnectHandler(buyingCircle.Id)}
										className='bg-white rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
									>
										Disconnect
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			{/* Not Connected Buying Circles */}
			<div className='pt-4'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center' aria-hidden='true'>
						<div className='w-full border-t border-gray-300' />
					</div>
					<div className='relative flex justify-start'>
						<span className='bg-white pr-3 text-base font-semibold leading-6 text-gray-900'>Connect</span>
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
					<ul role='list' className='divide-y divide-gray-100 px-4 py-2'>
						{filteredBuyingCircles.map((buyingCircle, index) => (
							<li key={index} className='flex items-center justify-between gap-x-6 py-2'>
								<div className='min-w-0'>
									<div className='flex items-start gap-x-3'>
										<p className='text-sm leading-6 text-gray-900'>{buyingCircle.Name}</p>
									</div>
									<div className='mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
										<p className='whitespace-nowrap'>Total Contacts {buyingCircle.Total__c ? buyingCircle.Total__c.toLocaleString() : "0"}</p>
									</div>
								</div>
								<div className='flex flex-none items-center gap-x-4'>
									{buyingCircle.Total__c < outline.min_contacts && renderStatusIndicator(`Under ${outline.min_contacts} Contacts`)}
									{!buyingCircle.Enriched__c && renderStatusIndicator("Not Enriched")}
									{buyingCircle.Total__c > outline.min_contacts && buyingCircle.Enriched__c && (
										<button
											type='button'
											onClick={() => addHandler(buyingCircle.Id, campaignId, playId)}
											className='bg-white rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
										>
											Connect
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
