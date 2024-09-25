import React from "react";

export default function Container({ children }) {
	return (
		<div className='flex flex-col lg:flex-row'>
			<div className='w-full lg:w-3/3 bg-white p-2 sm:p-4 m-4'>{children}</div>
		</div>
	);
}
