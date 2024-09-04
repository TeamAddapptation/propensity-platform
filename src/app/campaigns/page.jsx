import { CampaignsTable } from "./components/CampaignsTable";

async function getCampaigns() {
	const res = await fetch(`${process.env.API_READ}&campaigns=true`);
	const data = await res.json();
	return data;
}

export default async function Campaigns() {
	const campaigns = await getCampaigns();
	return (
		<div className='bg-white p-4 sm:p-6 lg:p-8 m-4'>
			<CampaignsTable campaigns={campaigns} />
		</div>
	);
}
