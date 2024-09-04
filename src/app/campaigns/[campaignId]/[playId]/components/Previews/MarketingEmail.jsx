import React from "react";

export default function MarketingEmail({ play }) {
	console.log("Marketing Template: ", play);
	return (
		<div className='border rounded bg-white'>
			<div className='mb-5 bg-white'>
				<div className='flex px-4 py-3 border-b justify-between items-center gap-3'>
					<div className='flex flex-col'>
						<h4 className='font-semibold m-0'>Template Preview</h4>
						<p className='text-sm text-slate-500'>This is a basic preview for content review. Email layouts may vary across different email clients.</p>
					</div>
					<div className='flex'>
						<a
							href='https://cdn.propensity.com/propensity/Marketing_Email_Guide.pdf'
							target='_blank'
							className='rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 whitespace-nowrap'
						>
							Email Guide
						</a>
					</div>
				</div>
			</div>
			<div className='bg-slate-100 p-5 border rounded-md h-96 overflow-y-auto mx-10'>
				<div className='flex flex-col gap-2 border-b pb-3'>
					<div className='flex gap-1'>
						<p className='text-sm font-semibold m-0'>To:</p>
						<p className='text-sm font-normal m-0 text-slate-700'>{play.Brand_Name__c ? play.Brand_Name__c : "Example Contact"}</p>
						<p className='text-sm font-normal m-0 text-slate-700'>{play.ABM_Campaign__r.Sender_Address__c ? play.ABM_Campaign__r.Sender_Address__c : "<contactEmail@company.com>"}</p>
					</div>
					<div className='flex gap-1'>
						<p className='text-sm font-semibold m-0'>Subject:</p>
						<p className='text-sm font-normal m-0 text-slate-700'>{play.Subject__c ? play.Subject__c : "Subject line here"}</p>
					</div>
				</div>
				<div className='flex mt-5'>
					<div className='whitespace-pre-wrap font-normal text-sm text-slate-700' dangerouslySetInnerHTML={{ __html: play.Body_Text_Only__c }} />
				</div>
			</div>
			<div className='py-4 px-10'>
				<button
					type='button'
					className='inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Send Test Email
					<i className='fas fa-paper-plane text-white'></i>
				</button>
			</div>
		</div>
	);
}
