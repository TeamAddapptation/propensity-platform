"use client";
import Link from "next/link";
import Container from "@/app/components/layout/Container";
import { adIcon } from "@/app/utilities/helpers";
import plays from "./plays";

export default function NewPlay() {
	return (
		<Container>
			<ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{plays.map((play) => (
					<li key={play.name} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'>
						<Link href={`./newPlay/${encodeURIComponent(play.name)}`}>
							<div className='flex w-full justify-between space-x-6 p-6 cursor-pointer'>
								<div className='flex'>
									<div className='flex-shrink-0'>{adIcon(play.name, "w-10 h-10", "text-xl")}</div>
								</div>
								<div className='flex-1'>
									<div className='flex items-center space-x-3'>
										<h3 className='text-sm font-medium text-gray-900'>{play.name}</h3>
									</div>
									<p className='mt-1 text-sm text-gray-500'>{play.description}</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</Container>
	);
}
