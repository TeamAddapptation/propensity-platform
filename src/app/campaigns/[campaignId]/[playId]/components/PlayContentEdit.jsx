import TextField from "@/app/components/form/TextField";
import SelectField from "@/app/components/form/SelectField";
import DateField from "@/app/components/form/DateField";
import TextAreaField from "@/app/components/form/TextAreaField";
import UrlField from "@/app/components/form/UrlField";

export default function EditContent({ play, fields, campaignId, changeHandler, editHandler, mutate }) {
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

		console.log("Form Data: ", updatePlayData);

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
		<>
			<div className='flex justify-between items-center px-4 py-5 sm:px-6'>
				<div>
					<p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>{play.Type__c}</p>
					<h3 className='text-xl font-semibold leading-6 text-gray-900'>{play.Name}</h3>
				</div>
				<div className='flex gap-2'>
					<button type='button' onClick={() => editHandler(false, true)} className='text-sm font-semibold leading-6 text-indigo-400'>
						Cancel
					</button>
					<button
						type='submit'
						form='p__edit-play'
						className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					>
						Save
					</button>
				</div>
			</div>
			<form id='p__edit-play' onSubmit={submitHandler}>
				<div className='space-y-12 px-4 py-6'>
					<div className='border-b border-gray-900/10 pb-1'>
						<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<input type='hidden' name='submit_ad' value='update'></input>
							<input type='hidden' name='campaign_id' value={campaignId}></input>
							<input type='hidden' name='play_id' value={play.Id}></input>
							{fields &&
								fields.editFields.map((formField, index) => {
									switch (formField.type) {
										case "date":
											return <DateField key={index} {...formField} play={play} onChange={changeHandler} />;
										case "select":
											return <SelectField key={index} {...formField} play={play} onChange={changeHandler} />;
										case "text":
											return <TextField key={index} {...formField} play={play} onChange={changeHandler} />;
										case "textarea":
											return <TextAreaField key={index} {...formField} play={play} onChange={changeHandler} />;
										case "url":
											return <UrlField key={index} {...formField} play={play} onChange={changeHandler} />;
										default:
											return null;
									}
								})}
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
