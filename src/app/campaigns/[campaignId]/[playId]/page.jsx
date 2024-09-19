"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PlayContentView from "./components/PlayContentView";
import PlayContentEdit from "./components/PlayContentEdit";
import PlayLaunchEdit from "./components/PlayLaunchEdit";
import BuyingCircles from "./components/buyingCircles/BuyingCircles";
import Graphics from "./components/Graphics";
import { channelFields } from "./playData/channelFields";
import FacebookAd from "./components/Previews/FacebookAd";
import FacebookCarouselAd from "./components/Previews/FacebookCarouselAd";
import LinkedinAd from "./components/Previews/LinkedInAd";
import MarketingEmail from "./components/Previews/MarketingEmail";
import DisplayAd from "./components/Previews/DisplayAd";
import Loading from "@/app/components/Loading";
import { adIcon } from "@/app/utilities/helpers";
import Accordion from "@/app/components/Accordion";
import Review from "./components/Review";

export default function Play({ params }) {
	const [fetchedPlayData, setFetchedPlayData] = useState({});
	const [editMode, setEditMode] = useState(true);
	const [playFields, setPlayFields] = useState("");
	const [playType, setPlayType] = useState(undefined);
	const [dataVersion, setDataVersion] = useState(0);
	const [initialPlayData, setInitialPlayData] = useState(null);

	function setPlayTypeHandler(type) {
		setPlayType(type);
		switch (type) {
			case "Facebook Ad":
			case "Facebook Carousel Ad":
				setPlayFields(channelFields.facebook);
				break;
			case "Google Display Ad":
				setPlayFields(channelFields.googleDisplayAd);
				break;
			case "LinkedIn Ad":
				setPlayFields(channelFields.linkedin);
				break;
			case "Marketing Email":
				setPlayFields(channelFields.marketingEmail);
				break;
			case "Programmatic Display Ad":
				setPlayFields(channelFields.programmaticDisplayAd);
				break;
			default:
				setPlayFields(null);
		}
	}

	function editHandler(isEdit, isCancel) {
		setEditMode(isEdit);
		if (isCancel) setPlayData(initialPlayData);
	}

	function changeHandler(e) {
		setFetchedPlayData((prevState) => ({
			...prevState,
			play: {
				...prevState.play,
				[e.target.name]: e.target.value,
			},
		}));
	}
	function dataVersionHandler() {
		setDataVersion((prevVersion) => prevVersion + 1);
	}
	const {
		data: playData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["play", params.campaignId, params.playId],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_READ}&play_buying_circles=true&campaign_id=${params.campaignId}&play_id=${params.playId}`);
			const data = await res.json();
			return data;
		},
	});

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (updatePlay) => {
			const response = await fetch("https://t-propensity-dashboard.addapptation.com/data_write?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&update_play=true", {
				method: "POST",
				body: JSON.stringify(updatePlay),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Error updating play");
			}

			return response.json();
		},
		onSuccess: () => {
			// Invalidate the query to refetch the play data
			queryClient.invalidateQueries(["play"]);
		},
	});

	useEffect(() => {
		if (playData) {
			setFetchedPlayData(playData);
			setPlayTypeHandler(playData.play.Type__c);
			setInitialPlayData(playData.play);
		}
	}, [playData]);

	if (isLoading) {
		return <Loading text={"Loading Play Data"} />;
	}

	if (error) {
		return <p>Error loading data: {error.message}</p>;
	}

	// Ensure we are accessing the correct nested object
	const play = fetchedPlayData?.play;
	if (!play) {
		return <p>No play data found</p>;
	}
	console.log("Play Data: ", fetchedPlayData);

	// Status badge rendering
	function getStatusBadge(status) {
		if (!status) {
			return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
		}

		switch (status.toLowerCase()) {
			case "active":
				return <span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600'>Active</span>;
			case "paused":
				return <span className='inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600'>Paused</span>;
			case "inactive":
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Inactive</span>;
			case "ended":
				return <span className='inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600'>Ended</span>;
			default:
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
		}
	}

	return (
		<div className='rounded-lg m-4'>
			<div className='overflow-hidden border border-gray-200 mb-4 bg-white rounded-lg'>
				<h2 id='play-overview-title' className='sr-only'>
					Play Overview
				</h2>
				<div className='p-4'>
					<div className='sm:flex sm:items-center sm:justify-between'>
						<div className='sm:flex sm:space-x-5 items-center'>
							<div className='flex-shrink-0'>{adIcon(play.Type__c, "w-14 h-14", "text-xl")}</div>
							<div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
								<p className='text-sm font-medium text-gray-600'>{play.Type__c || "No type available"}</p>
								<p className='text-lg font-semibold text-gray-900 sm:text-lg'>{play.Name || "No name available"}</p>
								<p className='text-sm font-medium text-gray-600'>{getStatusBadge(play.Status__c)}</p>
							</div>
						</div>
						<div className='mt-5 flex justify-center sm:mt-0'>
							<a href='#' className='rounded bg-red px-2 py-1 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50'>
								Not Launch Ready
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
				<div className='md:col-span-6'>
					<div className='border border-gray-200'>
						<Accordion title={"Content"} open={true} status={true}>
							{editMode ? (
								<PlayContentEdit play={play} fields={playFields} editHandler={editHandler} mutate={mutate} campaignId={params.campaignId} changeHandler={changeHandler} />
							) : (
								<PlayContentView play={play} fields={playFields} editHandler={editHandler} />
							)}
						</Accordion>

						<Accordion title={"Graphics"} open={false} status={false}>
							<Graphics assets={fetchedPlayData.assets}></Graphics>
						</Accordion>

						<Accordion title={"Launch Settings"} open={false} status={false}>
							<PlayLaunchEdit play={play} fields={playFields} editHandler={editHandler} mutate={mutate} campaignId={params.campaignId} />
						</Accordion>
						<Accordion title={"Buying Circles"} open={false} status={true}>
							<BuyingCircles
								connected={fetchedPlayData.connected_buying_circles}
								buyingCircles={fetchedPlayData.buying_circles}
								campaignId={params.campaignId}
								outline={playFields}
								playId={params.playId}
								type={play.Type__c}
								mutate={mutate}
							/>
						</Accordion>
					</div>
				</div>
				<div className='md:col-span-6'>
					{playType == "Facebook Ad" ? <FacebookAd play={play} /> : ""}
					{playType == "Facebook Carousel Ad" ? <FacebookCarouselAd play={play} assets={fetchedPlayData.assets} /> : ""}
					{playType == "Marketing Email" ? <MarketingEmail play={play} /> : ""}
					{playType == "LinkedIn Ad" ? <LinkedinAd play={play} /> : ""}
					{playType == "Google Display Ad" || playType == "Programmatic Display Ad" ? <DisplayAd assets={fetchedPlayData.assets} /> : ""}
					<div className='p__review'>{playType == "Google Display Ad" ? <Review play={play} /> : ""}</div>
				</div>
			</div>
		</div>
	);
}
