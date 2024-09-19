"use client";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const tabs = [
	{ name: "My Workspaces", href: "#", key: "my-workspaces" },
	{ name: "Connections", href: "#", key: "connections" },
	{ name: "Users", href: "#", key: "users" },
	{ name: "Billing", href: "#", key: "billing" },
	{ name: "Installed Packages", href: "#", key: "installed-packages" },
	{ name: "Exclusions", href: "#", key: "exclusions" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function SettingsHeader({ campaignData }) {
	const [activeTab, setActiveTab] = useState("users");

	return (
		<div className='bg-white pt-6 px-6'>
			<div className='flex space-between items-center'>
				<div className='flex items-center sm:w-0 sm:flex-1'>
					<div className='flex flex-col'>
						<h1 id='message-heading' className='text-lg font-semibold leading-6 text-gray-900'>
							Settings
						</h1>
						<div className='flex gap-2'>
							<div className='mt-1 flex items-center text-xs text-gray-400 gap-1'>
								<p className='text-gray-600 font-semibold'>Playbook</p>
							</div>
							<div className='mt-1 flex items-center text-xs text-gray-400 gap-1'>
								<p className='text-gray-600 font-semibold'>Launch Date</p>
							</div>
						</div>
					</div>
				</div>
				<div className='d-flex flex-col'>
					<div className='mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start'>
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
			<div>
				<div className='sm:hidden'>
					<label htmlFor='tabs' className='sr-only'>
						Select a tab
					</label>
					<select
						id='tabs'
						name='tabs'
						value={activeTab}
						onChange={(e) => setActiveTab(e.target.value)}
						className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
					>
						{tabs.map((tab) => (
							<option key={tab.key} value={tab.key}>
								{tab.name}
							</option>
						))}
					</select>
				</div>
				<div className='hidden sm:block'>
					<div className=''>
						<nav aria-label='Tabs' className='-mb-px flex space-x-8'>
							{tabs.map((tab) => (
								<a
									key={tab.key}
									onClick={() => setActiveTab(tab.key)}
									aria-current={activeTab === tab.key ? "page" : undefined}
									className={classNames(
										activeTab === tab.key ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
										"whitespace-nowrap border-b-2 px-1 pt-6 pb-2 text-sm font-medium cursor-pointer"
									)}
								>
									{tab.name}
								</a>
							))}
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}
