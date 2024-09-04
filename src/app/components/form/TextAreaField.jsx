"use client";
export default function TextAreaField({ label, name, placeholder, id, play, span, onChange }) {
	const textValue = play[name];
	return (
		<div className={span}>
			<label htmlFor='comment' className='block text-sm font-medium leading-6 text-slate-600'>
				{label}
			</label>
			<div className='mt-1'>
				<textarea
					rows={4}
					name={name}
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					defaultValue={textValue}
				/>
			</div>
		</div>
	);
}
