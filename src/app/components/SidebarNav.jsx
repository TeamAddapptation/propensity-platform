"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild } from "@headlessui/react";
import { Bars3Icon, BellIcon, Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "@/context/index";
import Link from "next/link";

const navigation = [
	{ name: "Dashboard", href: "/", icon: HomeIcon, current: true },
	{ name: "Audience", href: "/audience", icon: UsersIcon, current: false },
	{ name: "ABM Campaigns", href: "/campaigns", icon: UsersIcon, current: false },
];
const teams = [
	{ id: 1, name: "ABM Tools", href: "#", initial: "A", current: false },
	{ id: 2, name: "CRM Tools", href: "#", initial: "C", current: false },
];
const userNavigation = [
	{ name: "Your profile", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function SidebarNav() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { userData } = useAppContext();
	console.log("User DAta: ", userData);
	return (
		<div>
			<Dialog open={sidebarOpen} onClose={setSidebarOpen} className='relative z-50 lg:hidden'>
				<DialogBackdrop transition className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0' />

				<div className='fixed inset-0 flex'>
					<DialogPanel transition className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'>
						<TransitionChild>
							<div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
								<button type='button' onClick={() => setSidebarOpen(false)} className='-m-2.5 p-2.5'>
									<span className='sr-only'>Close sidebar</span>
									<XMarkIcon aria-hidden='true' className='h-6 w-6 text-white' />
								</button>
							</div>
						</TransitionChild>
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10'>
							<div className='flex h-16 shrink-0 items-center'>
								<img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Propensity' />
							</div>
							<nav className='flex flex-1 flex-col'>
								<ul role='list' className='flex flex-1 flex-col gap-y-7'>
									<li>
										<ul role='list' className='-mx-2 space-y-1'>
											{navigation.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className={classNames(
															item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}
													>
														<item.icon aria-hidden='true' className='h-6 w-6 shrink-0' />
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</li>
									<li>
										<div className='text-xs font-semibold leading-6 text-gray-400'>ABM Tools</div>
										<ul role='list' className='-mx-2 mt-2 space-y-1'>
											{teams.map((team) => (
												<li key={team.name}>
													<a
														href={team.href}
														className={classNames(
															team.current ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}
													>
														<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
															{team.initial}
														</span>
														<span className='truncate'>{team.name}</span>
													</a>
												</li>
											))}
										</ul>
									</li>
									<li className='mt-auto'>
										<Link href='/settings' className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'>
											<Cog6ToothIcon aria-hidden='true' className='h-6 w-6 shrink-0' />
											Settings
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			{/* Static sidebar for desktop */}
			<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col'>
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4'>
					<div className='flex h-16 shrink-0 items-center'>
						<img className='h-6 w-auto' src='https://cdn.propensity.com/addapptation-customer-assets/propensity/propensity-data/propensity_long_light.png' alt='Propensity' />
					</div>
					<nav className='flex flex-1 flex-col'>
						<ul role='list' className='flex flex-1 flex-col gap-y-7'>
							<li>
								<ul role='list' className='-mx-2 space-y-1'>
									{navigation.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className={classNames(
													item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
													"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
												)}
											>
												<item.icon aria-hidden='true' className='h-6 w-6 shrink-0' />
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</li>
							<li>
								<div className='text-xs font-semibold leading-6 text-gray-400'>Utilities</div>
								<ul role='list' className='-mx-2 mt-2 space-y-1'>
									{teams.map((team) => (
										<li key={team.name}>
											<a
												href={team.href}
												className={classNames(
													team.current ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
													"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
												)}
											>
												<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
													{team.initial}
												</span>
												<span className='truncate'>{team.name}</span>
											</a>
										</li>
									))}
								</ul>
							</li>
							<li className='mt-auto'>
								<Link href='/settings' className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'>
									<Cog6ToothIcon aria-hidden='true' className='h-6 w-6 shrink-0' />
									Settings
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className='lg:pl-64'>
				<div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
					<button type='button' onClick={() => setSidebarOpen(true)} className='-m-2.5 p-2.5 text-gray-700 lg:hidden'>
						<span className='sr-only'>Open sidebar</span>
						<Bars3Icon aria-hidden='true' className='h-6 w-6' />
					</button>

					{/* Separator */}
					<div aria-hidden='true' className='h-6 w-px bg-gray-900/10 lg:hidden' />

					<div className='flex items-center flex-1 gap-x-4 self-stretch lg:gap-x-6'>
						<div className='flex flex-col flex-1'>
							<p className='relative flex text-xs text-gray-400 uppercase'>{userData?.Access_Level__c || ""}</p>
							<h4 className='relative flex text-lg text-gray-500'>{userData?.Name || "Workspace"}</h4>
						</div>

						<div className='flex items-center gap-x-4 lg:gap-x-6'>
							<button type='button' className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>View notifications</span>
								<BellIcon aria-hidden='true' className='h-6 w-6' />
							</button>

							{/* Separator */}
							<div aria-hidden='true' className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10' />

							{/* Profile dropdown */}
							<Menu as='div' className='relative'>
								<MenuButton className='-m-1.5 flex items-center p-1.5'>
									<span className='sr-only'>Open user menu</span>
									<img
										alt=''
										src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
										className='h-8 w-8 rounded-full bg-gray-50'
									/>
									<span className='hidden lg:flex lg:items-center'>
										<span aria-hidden='true' className='ml-4 text-sm font-semibold leading-6 text-gray-900'>
											{userData?.First_Name__c || ""} {userData?.Last_Name__c || ""}
										</span>
										<ChevronDownIcon aria-hidden='true' className='ml-2 h-5 w-5 text-gray-400' />
									</span>
								</MenuButton>
								<MenuItems
									transition
									className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
								>
									{userNavigation.map((item) => (
										<MenuItem key={item.name}>
											<a href={item.href} className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
												{item.name}
											</a>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
