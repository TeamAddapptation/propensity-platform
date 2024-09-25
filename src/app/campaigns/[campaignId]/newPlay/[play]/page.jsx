"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Container from "@/app/components/layout/Container";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { adIcon } from "@/app/utilities/helpers";
import plays from "../plays";

export default function PlayDetails() {
	const router = useRouter();
	const params = useParams();
	const playParam = params.play;

	const decodedPlayName = decodeURIComponent(playParam);

	const play = plays.find((p) => p.name === decodedPlayName);
	console.log(play);

	const handleSave = () => {
		console.log("Play saved:", {
			playName,
			startDate,
			endDate,
		});

		// Redirect back to the plays list or another page
		router.push("/new-play");
	};

	return (
		<Container>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSave();
				}}
			>
				<div className='space-y-12'>
					<div className='grid grid-cols-1 gap-x-16 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
						<div>
							<div className='flex-shrink-0 mb-3'>{adIcon(play.name, "w-10 h-10", "text-xl")}</div>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>{play.name}</h2>
							<p className='mt-1 text-sm leading-6 text-gray-600'>{play.description}</p>
						</div>

						<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
							<div className='sm:col-span-4'>
								<label htmlFor='website' className='block text-sm font-medium leading-6 text-gray-900'>
									Play Name
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
										<input
											id='name'
											name='Name'
											type='text'
											placeholder='New Play'
											className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										/>
									</div>
								</div>
							</div>
							<div className='sm:col-span-4'>
								<label htmlFor='website' className='block text-sm font-medium leading-6 text-gray-900'>
									Start Date
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
										<input
											id='start_date'
											name='start_date'
											type='date'
											placeholder=''
											className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										/>
									</div>
								</div>
							</div>
							<div className='sm:col-span-4'>
								<label htmlFor='website' className='block text-sm font-medium leading-6 text-gray-900'>
									End Date
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
										<input
											id='end_date'
											name='end_date'
											type='date'
											placeholder=''
											className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
						Cancel
					</button>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Save
					</button>
				</div>
			</form>
		</Container>
	);
}
