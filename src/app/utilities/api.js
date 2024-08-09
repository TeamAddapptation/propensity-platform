export async function fetchCampaigns(params = {}) {
	const apiKey = "6d5b9cb6-d85e-43c8-a892-b9c18dd77bac";
	const baseUrl = "https://t-propensity-dashboard.addapptation.com/account_lists_data";

	// Construct the URL with the base URL, API key, and additional parameters
	const url = new URL(baseUrl);
	url.searchParams.append("api_key", apiKey);

	// Add additional parameters from the `params` object
	Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error("Failed to fetch campaigns");
	}
	const data = await response.json();
	return data;
}
