"use client";
import { useState, useEffect } from "react";
import styles from "../../css/facebookAd.module.css";

export default function GoogleDisplayAd({ assets }) {
	// Filter assets to only include those with available images
	const availableAssets = assets.filter((asset) => asset.has_asset && asset.image);

	// Initialize state with the first available asset
	const [selectedAsset, setSelectedAsset] = useState(availableAssets[0] || null);

	// Handle the change event for the dropdown
	const handleChange = (event) => {
		const selectedSize = event.target.value;
		const asset = availableAssets.find((a) => a.size === selectedSize);
		setSelectedAsset(asset);
	};

	return (
		<div className='border rounded'>
			<div className='bg-white'>
				<div className='flex px-4 py-3 border-b justify-between items-center gap-3'>
					<div className='flex flex-col'>
						<h4 className='font-semibold m-0'>Ad Preview</h4>
					</div>
					{/* Dropdown for selecting ad size */}
					<select onChange={handleChange} className='p-2 border rounded text-sm text-gray-500' value={selectedAsset ? selectedAsset.size : ""}>
						{availableAssets.map((asset) => (
							<option key={asset.asset_id} value={asset.size}>
								{asset.size}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='px-10 py-5 bg-slate-50'>
				<div className={`${styles.p__facebook_ad_preview} p-3 border rounded-md`}>
					{/* Display Image */}
					{selectedAsset ? (
						<img src={selectedAsset.image} alt={selectedAsset.image_name} className='mx-auto' style={{ maxWidth: "100%" }} />
					) : (
						<div className='text-center text-gray-500'>No image selected or available for preview.</div>
					)}
				</div>
			</div>
		</div>
	);
}
