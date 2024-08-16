"use client";
import { useParams } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@/app/utilities/helpers";
import Link from "next/link";
export default function CampaignHeader({ campaignData }) {
	const campaign = campaignData.campaign;
	const { campaignId } = useParams();

	function campaignStatus(campaign) {
		switch (campaign.Status__c.toLowerCase()) {
			case "active":
				return <span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600'>Cohort {campaign.Cohort_Number__c} - Active</span>;

			case "paused":
				return <span className='inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600'>Cohort {campaign.Cohort_Number__c} - Paused</span>;

			case "inactive":
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Cohort {campaign.Cohort_Number__c} - Inactive</span>;

			case "ended":
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Cohort {campaign.Cohort_Number__c} - Ended</span>;

			default:
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Cohort {campaign.Cohort_Number__c} - Unknown</span>;
		}
	}

	return (
		<div>
			<div className='flex space-between items-center'>
				<div className='flex items-center sm:w-0 sm:flex-1'>
					<div className='flex flex-col'>
						<div className='flex'>
							<nav aria-label='Breadcrumb' className='hidden sm:flex'>
								<ol role='list' className='flex items-center space-x-4'>
									<li>
										<div className='flex'>
											<Link href={`/campaigns`} className='text-xs font-medium text-gray-500 hover:text-gray-700'>
												Campaigns
											</Link>
										</div>
									</li>
									<li>
										<div className='flex items-center'>
											<ChevronRightIcon aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-gray-400' />
											<Link href={`/campaigns/${campaignId}`} className='ml-4 text-xs font-medium text-gray-500 hover:text-gray-700'>
												Plays
											</Link>
										</div>
									</li>
								</ol>
							</nav>
						</div>

						<h1 id='message-heading' className='text-lg font-semibold leading-6 text-gray-900'>
							{campaign.Name}
						</h1>
						<div className='flex gap-2'>
							<div className='mt-1 flex items-center text-xs text-gray-400 gap-1'>
								<p className='text-gray-600 font-semibold'>Playbook</p>
								{campaignData.campaign.Playbook__r.Name}
							</div>
							<div className='mt-1 flex items-center text-xs text-gray-400 gap-1'>
								<p className='text-gray-600 font-semibold'>Launch Date</p>
								{formatDate(campaignData.campaign.Start_Date__c)}
							</div>
						</div>
					</div>
				</div>

				<div className='mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start'>
					{campaignStatus(campaign)}
					<Menu as='div' className='relative ml-3 inline-block text-left'>
						<div>
							<MenuButton className='-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
								<span className='sr-only'>Open options</span>
								<EllipsisVerticalIcon aria-hidden='true' className='h-5 w-5' />
							</MenuButton>
						</div>

						<MenuItems
							transition
							className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
						>
							<div className='py-1'>
								<MenuItem>
									<a href='#' className='flex justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'>
										<span>Edit</span>
									</a>
								</MenuItem>
								<MenuItem>
									<a href='#' className='flex justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'>
										<span>Duplicate</span>
									</a>
								</MenuItem>
								<MenuItem>
									<button type='button' className='flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'>
										<span>Archive</span>
									</button>
								</MenuItem>
							</div>
						</MenuItems>
					</Menu>
				</div>
			</div>
		</div>
	);
}
