"use client";
export default function CampaignHeader({ campaignData }) {
	console.log(campaignData);
	return <div>{campaignData.campaign[0].Name}</div>;
}
