"use client";
export default function SelectField({ label, options, name, placeholder, id, keyLink, play, span, onChange }) {
	return (
		<div className={span}>
			<label htmlFor='location' className='block text-sm font-medium leading-6 text-gray-900'>
				{label}
			</label>
			<select
				id={id}
				name={name}
				onChange={onChange}
				className='mt-1 block w-full rounded-md border-0 py-1.5 pl-1 pr-2 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
				defaultValue={""}
			>
				{/* Render placeholder if it's provided */}
				{placeholder && (
					<option className='text-gray-300' value='' disabled>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
