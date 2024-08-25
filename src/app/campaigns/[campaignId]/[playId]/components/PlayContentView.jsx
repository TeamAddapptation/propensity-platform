import { useState, useEffect } from "react";
import { channelFields } from "../playData/channelFields";
import { formatDate } from "@/app/utilities/helpers";

export default function PlayContentView({ play, editHandler }) {
	const [playFields, setPlayFields] = useState("");
	useEffect(() => {
		// Handle setting play fields based on play type
		switch (play.Type__c) {
			case "Facebook Ad":
				setPlayFields(channelFields.facebook);
				break;
			case "LinkedIn Ad":
				setPlayFields(channelFields.linkedin);
				break;
			case "Marketing Email":
				setPlayFields(channelFields.marketingEmail);
				break;
			default:
				setPlayFields(null);
		}
	}, [play]);
	return (
		<div className='bg-white border-t'>
			<div className='flex justify-between items-center p-4'>
				<button type='button' onClick={() => editHandler(true)} className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
					Edit
				</button>
			</div>
			<div>
				<dl className='divide-y divide-gray-200'>
					{playFields &&
						playFields.fields.map((field, index) => {
							return (
								<div key={index} className='px-3 py-4 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-6'>
									<dt className='text-sm font-medium text-gray-900'>{field.label}</dt>
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
		</div>
	);
}
