import { useState, useEffect } from "react";
import { channelFields } from "../playData/channelFields";
import { formatDate } from "@/app/utilities/helpers";

export default function PlayContentView({ play }) {
	const [playFields, setPlayFields] = useState("");
	console.log("Content View Play: ", play);
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
				setPlayFields(adFields.marketingEmail);
				break;
			default:
				setPlayFields(null);
		}
	}, [play]);
	return (
		<div className='border border-gray-100'>
			<dl className='divide-y divide-gray-100'>
				{playFields &&
					playFields.fields.map((field, index) => {
						return (
							<div key={index} className='px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-6'>
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
	);
}
