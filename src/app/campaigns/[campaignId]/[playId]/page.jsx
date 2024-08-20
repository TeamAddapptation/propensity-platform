"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import PlayContentView from "./components/PlayContentView";
import PlayContentEdit from "./components/PlayContentEdit";
import { channelFields } from "./playData/channelFields";
import { updatePlay } from "@/app/utilities/updatePlay";
import FacebookAd from "./components/AdPreviews/FacebookAd";
import Loading from "@/app/components/Loading";
import AdIcon from "./components/AdIcon";

export default function Play({ params }) {
	const [fetchedPlayData, setFetchedPlayData] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [playFields, setPlayFields] = useState("");
	const [playType, setPlayType] = useState(undefined);
	const [initialPlayData, setInitialPlayData] = useState(null);

	function setPlayTypeHandler(type) {
		console.log("Type: ", type);
		// Handle setting play fields based on play type
		switch (type) {
			case "Facebook Ad":
				setPlayFields(channelFields.facebook);
				break;
			case "LinkedIn Ad":
				setPlayFields(channelFields.linkedin);
				break;
			case "Marketing Email":
				setPlayFields(adFields.marketingEmail);
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

	const {
		data: playData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["play", params.campaignId, params.playId],
		queryFn: async () => {
			const res = await fetch(
				`https://t-propensity-react.addapptation.com/account_lists_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&play_buying_circles=true&campaign_id=${params.campaignId}&play_id=${params.playId}`
			);
			const data = await res.json();
			return data;
		},
	});

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
	});

	// Run your function after data is successfully fetched
	useEffect(() => {
		if (playData) {
			console.log("Data fetched successfully:", playData);
			// Run any function you want here
			setFetchedPlayData(playData);
			setPlayTypeHandler(playData.play.Type__c);
			setInitialPlayData(playData.play);
		}
	}, [playData]); // This will run whenever playData changes

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
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Ended</span>;
			default:
				return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
		}
	}

	console.log("Fetched Play Fields: ", fetchedPlayData);
	return (
		<div className='rounded-lg bg-white m-4'>
			<div className='overflow-hidden border-b border-gray-200 mb-4'>
				<h2 id='play-overview-title' className='sr-only'>
					Play Overview
				</h2>
				<div className='p-4'>
					<div className='sm:flex sm:items-center sm:justify-between'>
						<div className='sm:flex sm:space-x-5 items-center'>
							<div className='flex-shrink-0'>
								<AdIcon type={play.Type__c} />
							</div>
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
			<div className='flex flex-col lg:flex-row p-2 sm:p-6 lg:p-4 gap-3'>
				<div className='w-full lg:w-6/12 bg-white'>
					{editMode ? (
						<PlayContentEdit play={play} fields={playFields} editHandler={editHandler} mutate={mutate} campaignId={params.campaignId} changeHandler={changeHandler} />
					) : (
						<PlayContentView play={play} type={playType} editHandler={editHandler} />
					)}
				</div>
				<div className='w-full lg:w-6/12 bg-gray-100 p-10'>
					<FacebookAd play={play} />
				</div>
			</div>
		</div>
	);
}
