import CampaignClient from "./CampaignClient";

export default function CampaignPage({ params }) {
	const { campaignId } = params;

	return <CampaignClient campaignId={campaignId} />;
}
