import { getCampaignData } from "@/app/utilities/getCampaignData";
import CampaignHeader from "./components/CampaignHeader";
import PlaysTable from "./components/PlaysTable";
export default async function Campaign({ params }) {
	const campaignObj = await getCampaignData(params.campaignId);
	return (
		<>
			<div className='flex flex-col lg:flex-row'>
				<div className='w-full lg:w-2/3 bg-white p-4 sm:p-6 lg:p-8 m-4'>
					<PlaysTable campaignId={params.campaignId} playsData={campaignObj.plays} />
				</div>
				<div className='w-full lg:w-1/3 bg-white p-4 sm:p-6 lg:p-8 m-4'>Sidebar</div>
			</div>
		</>
	);
}
