import React from "react";

export default function Container({ children }) {
	return (
		<div className='flex flex-col lg:flex-row'>
			<div className='w-full lg:w-3/3 bg-white p-4 sm:p-6 lg:p-8 m-4'>{children}</div>
		</div>
	);
}
