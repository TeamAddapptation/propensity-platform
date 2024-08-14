"use client";
import { BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ChevronRightIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { formatDate } from "@/app/utilities/helpers";
export default function CampaignHeader({ campaignData }) {
	console.log(campaignData);
	return (
		<div className='lg:flex lg:items-center lg:justify-between'>
			<div className='min-w-0 flex-1'>
				<div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
					<div className='mt-2 flex items-center text-sm text-gray-500'>
						{campaignData.campaign.Status__c ? (
							<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700'>Active - Cohort {campaignData.campaign.Cohort_Number__c}</span>
						) : (
							<span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Inactive</span>
						)}
					</div>
				</div>
				<h2 className='mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{campaignData.campaign.Name}</h2>
				<div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
					<div className='mt-2 flex items-center text-sm text-gray-500'>
						<CalendarIcon aria-hidden='true' className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' />
						{formatDate(campaignData.campaign.Start_Date__c)} - {formatDate(campaignData.campaign.End_Date__c)}
					</div>
				</div>
			</div>
			<div className='mt-5 flex lg:ml-4 lg:mt-0'>
				<span className='hidden sm:block'>
					<button type='button' className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						<PencilIcon aria-hidden='true' className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' />
						Edit
					</button>
				</span>

				<span className='ml-3 hidden sm:block'>
					<button type='button' className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						<LinkIcon aria-hidden='true' className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' />
						View
					</button>
				</span>

				<span className='sm:ml-3'>
					<button
						type='button'
						className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						<CheckIcon aria-hidden='true' className='-ml-0.5 mr-1.5 h-5 w-5' />
						Publish
					</button>
				</span>

				{/* Dropdown */}
				<Menu as='div' className='relative ml-3 sm:hidden'>
					<MenuButton className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400'>
						More
						<ChevronDownIcon aria-hidden='true' className='-mr-1 ml-1.5 h-5 w-5 text-gray-400' />
					</MenuButton>

					<MenuItems
						transition
						className='absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
					>
						<MenuItem>
							<a href='#' className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'>
								Edit
							</a>
						</MenuItem>
						<MenuItem>
							<a href='#' className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'>
								View
							</a>
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
		</div>
	);
}
