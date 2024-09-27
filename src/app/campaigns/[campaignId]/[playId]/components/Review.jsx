import React from "react";
import { formatDate } from "@/app/utilities/helpers";

export default function Review({ play }) {
	return (
		<div className='p-4 bg-white'>
			<div className='px-4 sm:px-0'>
				<h3 className='text-base font-semibold leading-7 text-gray-900'>Overview</h3>
			</div>
			<dl className='grid grid-cols-1 sm:grid-cols-2'>
				<div className='px-4 py-3 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Start Date</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.Planned_Start_Date__c ? formatDate(play.Planned_Start_Date__c) : "-"}</dd>
				</div>
				<div className='border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>End Date</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.Planned_End_Date__c ? formatDate(play.Planned_End_Date__c) : "-"}</dd>
				</div>
				<div className='border-t border-gray-100 px-4 py-3 sm:col-span-2 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Click URL</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.Click_URL__c ? play.Click_URL__c : "-"}</dd>
				</div>
				<div className='border-t-d border-gray-100 px-4 pb-3 pt-6 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Manager ID</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.Google_Manager_Id__c ? play.Google_Manager_Id__c : "-"}</dd>
				</div>
				<div className='border-t border-gray-100 px-4 pb-3 pt-6 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Customer ID</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.Google_Customer_Id__c ? play.Google_Customer_Id__c : "-"}</dd>
				</div>
				<div className='border-t border-gray-200 px-4 py-3 sm:col-span-2 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Campaign Objective</dt>
					<dd className='text-sm leading-6 text-gray-700'></dd>
				</div>
				<div className='border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Daily Budget</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.External_Ad_Options__c.daily_budget ? play.External_Ad_Options__c.daily_budget : "-"}</dd>
				</div>
				<div className='border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-gray-900'>Bid Amount</dt>
					<dd className='text-sm leading-6 text-gray-700'>{play.External_Ad_Options__c.cpc_bid ? play.External_Ad_Options__c.cpc_bid : "-"}</dd>
				</div>
			</dl>
		</div>
	);
}
