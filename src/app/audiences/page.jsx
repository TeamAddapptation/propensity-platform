// import { CampaignsTable } from "./components/CampaignsTable";

async function getCampaigns() {
	const res = await fetch("https://t-propensity-dashboard.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&campaigns=true");
	const data = await res.json();
	return data;
}

export default async function Audiences() {
	// const campaigns = await getCampaigns();
	return (
		<div className='bg-white p-4 sm:p-6 lg:p-8 m-4'>
			<h1>MADE IT</h1>
			{/* <CampaignsTable campaigns={campaigns} /> */}
		</div>
	);
}