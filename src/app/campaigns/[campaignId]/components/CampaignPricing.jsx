"use client";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CampaignPricing({ pricing, isOpen, setIsOpen }) {
	const projects = [
		{
			id: 1,
			name: "Logo redesign",
			description: "New logo and digital asset playbook.",
			hours: "20.0",
			rate: "$100.00",
			price: "$2,000.00",
		},
		// More projects...
	];
	console.log("Pricing: ", pricing);
	if (!pricing) return <p>Loading</p>;
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-10 mt-5'>
			<DialogBackdrop transition className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0' />
			<div className='fixed inset-0' />
			<div className='fixed inset-0 overflow-hidden'>
				<div className='absolute inset-0 overflow-hidden'>
					<div className='pointer-events-none fixed inset-y-0 right-0 top-16 flex max-w-full pl-10'>
						<DialogPanel transition className='pointer-events-auto w-screen max-w-4xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'>
							<div className='flex h-[calc(100vh-64px)] flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
								<div className='px-4 sm:px-6'>
									<div className='flex items-start justify-between'>
										<DialogTitle className='text-base font-semibold leading-6 text-gray-900'>Campaign Pricing</DialogTitle>
										<div className='ml-3 flex h-7 items-center'>
											<button
												type='button'
												onClick={() => setIsOpen(false)}
												className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
											>
												<span className='absolute -inset-2.5' />
												<span className='sr-only'>Close panel</span>
												<XMarkIcon aria-hidden='true' className='h-6 w-6' />
											</button>
										</div>
									</div>
								</div>
								<div className='relative mt-2 flex-1 px-4 sm:px-6'>
									<div className='-mx-4 mt-8 flow-root sm:mx-0'>
										<table className='min-w-full'>
											<colgroup>
												<col className='w-full sm:w-1/2' />
												<col className='w-full sm:w-1/4' />
												<col className='w-full sm:w-1/4' />
											</colgroup>
											<thead className='border-b border-gray-300 text-gray-900'>
												<tr>
													<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
														Item
													</th>
													<th scope='col' className='hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell'>
														Quantity
													</th>
													<th scope='col' className='py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'>
														Total
													</th>
												</tr>
											</thead>
											<tbody>
												<tr className='bg-gray-100'>
													<td colSpan={3} className='py-2 pl-2 pr-4 text-left text-sm font-semibold text-gray-900'>
														Data
													</td>
												</tr>
												{pricing.campaign_budget.data.map((item, index) => (
													<tr key={index} className='border-b border-gray-200'>
														<td className='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
															<div className='font-medium text-gray-900'>{item.label}</div>
															<div className='mt-1 truncate text-gray-500 text-xs'>{item.cost}</div>
														</td>
														<td className='hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell'>{item.quantity}</td>
														<td className='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{item.total}</td>
													</tr>
												))}
												<tr className='bg-gray-100'>
													<td colSpan={3} className='py-2 pl-2 pr-4 text-left text-sm font-semibold text-gray-900'>
														Channels
													</td>
												</tr>
												{pricing.campaign_budget.channels.map((item, index) => (
													<tr key={index} className='border-b border-gray-200'>
														<td className='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
															<div className='font-medium text-gray-900'>{item.label}</div>
															<div className='mt-1 truncate text-gray-500 text-xs'>{item.cost}</div>
														</td>
														<td className='hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell'>{item.quantity}</td>
														<td className='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{item.total}</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr>
													<th scope='row' colSpan={2} className='hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'>
														Subtotal
													</th>
													<th scope='row' className='pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden'>
														Subtotal
													</th>
													<td className='pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-0'>${pricing.campaign_budget.totals.subtotal}</td>
												</tr>
												{pricing.campaign_budget.discount && (
													<tr>
														<th scope='row' colSpan={2} className='hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'>
															Discount
														</th>
														<th scope='row' className='pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden'>
															Discount
														</th>
														<td className='pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0'>${pricing.campaign_budget.totals.discount}</td>
													</tr>
												)}
												<tr>
													<th scope='row' colSpan={2} className='hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0'>
														Total
													</th>
													<th scope='row' className='pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden'>
														Total
													</th>
													<td className='pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'>{pricing.campaign_budget.totals.total}</td>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
