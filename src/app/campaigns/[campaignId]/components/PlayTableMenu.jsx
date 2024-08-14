"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export default function PlayTableMenu({ campaignId, playData }) {
	const { play, setPlay } = useAppContext();
	const router = useRouter();

	const handleEditClick = (e, playData) => {
		e.preventDefault();
		setPlay(playData);
		router.push(`/campaigns/${campaignId}/${playData.id}`);
	};

	return (
		<div className='flex justify-center flex-none items-center gap-x-4'>
			<Menu as='div' className='relative flex-none'>
				<MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
					<span className='sr-only'>Open options</span>
					<EllipsisVerticalIcon aria-hidden='true' className='h-5 w-5' />
				</MenuButton>
				<MenuItems
					transition
					className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
				>
					<MenuItem>
						<a href={`/campaigns/${campaignId}/${playData.id}`} onClick={(e) => handleEditClick(e, playData)} className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
							Edit<span className='sr-only'>, {}</span>
						</a>
					</MenuItem>
					<MenuItem>
						<a href='#' className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
							Delete<span className='sr-only'>, {}</span>
						</a>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
}
