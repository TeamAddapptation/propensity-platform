import CurrencyField from "@/app/components/form/CurrencyField";
import TextField from "@/app/components/form/TextField";
import SelectField from "@/app/components/form/SelectField";
import DateField from "@/app/components/form/DateField";
import TextAreaField from "@/app/components/form/TextAreaField";
import UrlField from "@/app/components/form/UrlField";

export default function LaunchEdit({ play, fields, campaignId, editHandler, mutate }) {
	const submitHandler = (e) => {
		e.preventDefault();

		// Collect all form data
		const formData = new FormData(e.target);

		formData.forEach((value, key) => {
			console.log(`${key}: ${value}`);
		});

		const updatePlayData = {
			submit_ad: formData.get("submit_ad"),
			campaign_id: formData.get("campaign_id"),
			play_id: formData.get("play_id"),
		};

		// Collect additional fields dynamically
		fields.editFields.forEach((field) => {
			updatePlayData[field.name] = formData.get(field.name);
		});

		// Trigger the mutation
		mutate(updatePlayData, {
			onSuccess: () => {
				console.log("Play updated successfully");
				editHandler(false, false); // Optionally close the form on success
			},
			onError: (error) => {
				console.error("Error updating play:", error);
			},
		});
	};

	return (
		<div className='bg-white'>
			<form id='p__edit-play' onSubmit={submitHandler}>
				<div className='space-y-12 px-4 py-2'>
					<div className='pb-1'>
						<div className='grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6'>
							<input type='hidden' name='submit_ad' value='update'></input>
							<input type='hidden' name='campaign_id' value={campaignId}></input>
							<input type='hidden' name='play_id' value={play.Id}></input>
							{fields &&
								fields.launchFields.map((formField, index) => {
									switch (formField.type) {
										case "currency":
											return <CurrencyField key={index} {...formField} play={play} />;
										case "date":
											return <DateField key={index} {...formField} play={play} />;
										case "select":
											return <SelectField key={index} {...formField} play={play} />;
										case "text":
											return <TextField key={index} {...formField} play={play} />;
										case "textarea":
											return <TextAreaField key={index} {...formField} play={play} />;
										case "url":
											return <UrlField key={index} {...formField} play={play} />;
										default:
											return null;
									}
								})}
						</div>
					</div>
				</div>
			</form>
			<div className='flex justify-end items-center p-4 pb-8 sm:px-6'>
				<div className='flex gap-2'>
					<button type='button' onClick={() => editHandler(false, true)} className='text-xs font-semi leading-6 text-indigo-400'>
						Cancel
					</button>
					<button
						type='submit'
						form='p__edit-play'
						className='rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
