async function getCampaign(id) {
	const res = await fetch(`${process.env.API_READ}&campaign=true&campaign_id=${id}`);
	const data = await res.json();
	return data;
}

async function getCampaignData(id) {
	const campaignData = await getCampaign(id);
	return campaignData;
}

export { getCampaignData };
