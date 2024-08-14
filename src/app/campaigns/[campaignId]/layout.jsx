import { getCampaignData } from "@/app/utilities/getCampaignData";
import CampaignHeader from "./components/CampaignHeader";
import PlaysTable from "./components/PlaysTable";
export default async function campaignLayout({ children, params }) {
	const campaignObj = await getCampaignData(params.campaignId);
	return (
		<>
			<div className='bg-white p-4 sm:p-6 lg:p-8'>
				<CampaignHeader campaignData={campaignObj} />
			</div>
			<div>{children}</div>
		</>
	);
}
