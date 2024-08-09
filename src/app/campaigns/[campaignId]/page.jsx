import { getCampaignData } from "@/app/utilities/getCampaignData";
import CampaignHeader from "./components/CampaignHeader";
export default async function Campaign({ params }) {
	const campaignObj = await getCampaignData(params.campaignId);
	console.log(campaignObj);
	return (
		<div>
			<CampaignHeader campaignData={campaignObj} />
		</div>
	);
}
