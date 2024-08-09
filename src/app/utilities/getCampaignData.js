async function getCampaign(id) {
	const res = await fetch(`https://t-propensity-dashboard.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&campaign=true&campaign_id=${id}`);
	const data = await res.json();
	return data;
}

async function getCampaignData(id) {
	const campaignData = await getCampaign(id);
	return campaignData;
}

export { getCampaignData };
