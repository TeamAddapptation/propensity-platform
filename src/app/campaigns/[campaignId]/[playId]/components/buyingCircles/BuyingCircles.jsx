"use client";
import { useEffect, useState } from "react";
import ViewBuyingCircles from "./BuyingCirclesView";
import EditBuyingCircles from "./BuyingCirclesEdit";

export default function BuyingCircles({ buyingCircles, connected, campaignId, playId, dataVersionHandler, outline }) {
	const [filteredBuyingCircles, setFilteredBuyingCircles] = useState([]);
	const [editBuyingCircles, setEditBuyingCircles] = useState(false);
	useEffect(() => {
		const connectedNamesSet = new Set(connected.map((persona) => persona.Buying_Circle__r.Name));
		const filtered = buyingCircles.filter((buyingCircle) => {
			return !connectedNamesSet.has(buyingCircle.Name);
		});
		setFilteredBuyingCircles(filtered);
	}, [buyingCircles, connected]);

	function editHandler() {
		setEditBuyingCircles((prevState) => !prevState);
	}

	return (
		<div className='bg-white rounded-lg border border-gray-300'>
			<div className='p-4 sm:px-6 flex justify-between items-center'>
				<div className='flex'>
					<h3 className='text-xl font-semibold leading-6 text-gray-900'>Buying Circles</h3>
					{/* <p>Connected Contacts: {connected.reduce((sum, item) => sum + item.Total__c, 0)}</p> */}
				</div>

				<button type='button' onClick={() => editHandler()} className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
					{editBuyingCircles ? "Save" : "Edit"}
				</button>
			</div>
			<div className='border-t border-gray-100 px-4 py-5 sm:px-6 '>
				<div>
					{editBuyingCircles ? (
						<EditBuyingCircles connected={connected} filteredBuyingCircles={filteredBuyingCircles} campaignId={campaignId} playId={playId} dataVersionHandler={dataVersionHandler} outline={outline} />
					) : (
						<ViewBuyingCircles connected={connected} filteredBuyingCircles={filteredBuyingCircles} outline={outline} />
					)}
				</div>
			</div>
		</div>
	);
}
