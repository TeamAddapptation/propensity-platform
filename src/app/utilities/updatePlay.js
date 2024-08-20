async function updatePlay(formElement, play_id, campaign_id) {
	const formData = new FormData(formElement);

	try {
		const response = await fetch(`https://t-propensity-dashboard.addapptation.com/data_write?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&update_play=true`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			console.error(`Error: ${response.status} ${response.statusText}`);
			throw new Error(`Network response was not ok: ${response.status}`);
			return false;
		}

		const data = await response.json();
		console.log("Form submitted successfully:", data);
		return true;
	} catch (error) {
		console.error("Error submitting form:", error);
		return false;
	}
}

export { updatePlay };
