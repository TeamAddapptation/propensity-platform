import { CampaignsTable } from "./components/CampaignsTable";

async function getCampaigns() {
	const res = await fetch("https://t-propensity-dashboard.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&campaigns=true");
	const data = await res.json();
	return data;
}

export default async function Campaigns() {
	const campaigns = await getCampaigns();
	console.log("Campaigns: ", campaigns);
	return (
		<div className='px-4 sm:px-6 lg:px-8 py-4'>
			<CampaignsTable campaigns={campaigns} />
		</div>
	);
}
