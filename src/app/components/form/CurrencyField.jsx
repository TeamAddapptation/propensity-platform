"use client";
export default function CurrencyField({ label, name, placeholder, id, play, span, onChange }) {
	return (
		<div className={span}>
			<label htmlFor={name} className='block text-sm font-medium leading-6 text-slate-600'>
				{label}
			</label>
			<div className='mt-1'>
				<div className='flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
					<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
						<span className='text-gray-400 sm:text-sm'>$</span>
					</div>
					<input
						type='text'
						name={name}
						id={id}
						defaultValue={play[name]}
						{...(onChange ? { onChange } : {})}
						autoComplete='username'
						className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						placeholder={placeholder}
					/>
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
						<span id='price-currency' className='text-gray-400 sm:text-sm'>
							USD
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
