"use client";
import { useState } from "react";
import { adIcon } from "@/app/utilities/helpers";
import plays from "../newPlay/plays";
import TextField from "@/app/components/form/TextField";

export default function NewPlay({ campaignId, newPlayMutate, sidepane }) {
	const [selectedPlay, setSelectedPlay] = useState(null); // Change to null for no selection initially

	const handleBackClick = () => {
		setSelectedPlay(null); // Clear the selected play when the back button is clicked
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formObject = {};

		formData.forEach((value, key) => {
			formObject[key] = value;
		});

		newPlayMutate(formObject, {
			onSuccess: () => {
				console.log("Play updated successfully");
				sidepane(false);
			},
			onError: (error) => {
				console.error("Error updating play:", error);
			},
		});
	};

	return (
		<>
			{!selectedPlay && (
				<ul role='list' className='grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-1'>
					{plays.map((play) => (
						<li key={play.name} className='col-span-1 rounded-lg bg-white border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
							<button type='button' onClick={() => setSelectedPlay({ name: play.name, description: play.description })}>
								<div className='flex w-full justify-between space-x-6 p-6 cursor-pointer'>
									<div className='flex'>
										<div className='flex-shrink-0'>{adIcon(play.name, "w-10 h-10", "text-xl")}</div>
									</div>
									<div className='flex-1'>
										<div className='flex items-center space-x-3'>
											<h3 className='text-md font-medium text-gray-600'>{play.name}</h3>
										</div>
										<p className='mt-1 text-sm text-left text-gray-500'>{play.description}</p>
									</div>
								</div>
							</button>
						</li>
					))}
				</ul>
			)}

			{selectedPlay && (
				<div className='c__new-play-form'>
					<button type='button' onClick={handleBackClick} className='mb-4 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded'>
						Back to Play List
					</button>
					<div className='flex gap-4'>
						<div className='flex-shrink-0 mb-3'>{adIcon(selectedPlay.name, "w-10 h-10", "text-xl")}</div>
						<div className='flex flex-col'>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>{selectedPlay.name}</h2>
							<p className='mt-1 text-sm leading-6 text-gray-600'>{selectedPlay.description}</p>
						</div>
					</div>
					<form onSubmit={submitHandler} className='space-y-6 mt-6'>
						<div>
							<label htmlFor='Name' className='block text-sm font-medium leading-6 text-gray-900'>
								Play Name
							</label>
							<div className='mt-2'>
								<input
									id='Name'
									name='Name'
									type='text'
									required
									className='block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>
						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<label htmlFor='start_date' className='block text-sm font-medium leading-6 text-gray-900'>
									Start Date
								</label>
								<div className='mt-2'>
									<input
										id='start_date'
										name='start_date'
										type='date'
										required
										className='block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div className='sm:col-span-3'>
								<label htmlFor='end_date' className='block text-sm font-medium leading-6 text-gray-900'>
									End Date
								</label>
								<div className='mt-2'>
									<input
										id='end_date'
										name='end_date'
										type='date'
										required
										className='block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
						<input value={selectedPlay.name} name='Type__c' type='hidden' />
						<input value={campaignId} name='campaign_id' type='hidden' />
						<input value='true' name='new_play' type='hidden' />
						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Add Play
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}
