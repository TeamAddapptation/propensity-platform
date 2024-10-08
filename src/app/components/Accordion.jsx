"use client";
import { useState } from "react";

export default function Accordion({ title, children, open, status }) {
	const [isOpen, setIsOpen] = useState(open);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className='border-b-2 border-gray-200'>
			<button className='w-full text-left py-4 px-4 bg-white hover:bg-gray-50 flex justify-between items-center' onClick={toggleAccordion}>
				<div className='flex items-center gap-2'>
					<div className={`flex-none rounded-full  p-1 ${status ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
						<div className={`h-1.5 w-1.5 rounded-full' ${status ? "bg-emerald-500" : "bg-red-500"}`} />
					</div>
					<h4 className='font-semibold m-0 text-slate-800'>{title}</h4>
				</div>
				<svg className={`w-6 h-6 transition-transform transform ${isOpen ? "rotate-180" : ""}`} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
				</svg>
			</button>
			<div className={`transition-max-height bg-white duration-300 ease-in-out overflow-hidden ${isOpen ? "auto" : "max-h-0"}`}>
				<div>{children}</div>
			</div>
		</div>
	);
}
