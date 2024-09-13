"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function CampaignBudget({ campaignId }) {
	const {
		data: playData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["budget", campaignId],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_READ}&campaign_pricing=true&campaign_id=${campaignId}`);
			const data = await res.json();
			console.log("Budget: ", data);
			return data;
		},
	});
	return <div>CampaignBudget</div>;
}
