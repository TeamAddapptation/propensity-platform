import { formatDate } from "@/app/utilities/helpers";

export default function PlayContentView({ play, fields, editHandler }) {
	return (
		<div className='bg-white border-t'>
			<div>
				<dl className='divide-y divide-gray-200'>
					{fields &&
						fields.view.map((field, index) => {
							return (
								<div key={index} className='px-3 py-4 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-6'>
									<dt className='text-sm font-medium text-slate-700'>{field.label}</dt>
									<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
										{field.type === "date" ? (
											play[field.value] ? (
												formatDate(play[field.value])
											) : (
												"-"
											)
										) : field.type === "html" ? (
											play[field.value] ? (
												<div className='whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: play[field.value] }} />
											) : (
												"-"
											)
										) : play[field.value] ? (
											play[field.value]
										) : (
											"-"
										)}
									</dd>
								</div>
							);
						})}
				</dl>
			</div>
			<div className='flex justify-end pb-8 px-4'>
				<button
					type='button'
					onClick={() => editHandler(true)}
					className='rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
				>
					Edit Content
				</button>
			</div>
		</div>
	);
}
