const formatDate = (dateString) => {
	const date = new Date(dateString);
	const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
};

const adIcon = (type, size, logoSize) => {
	console.log(type);
	switch (type.toLowerCase()) {
		case "direct mail":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#008080" }}>
					<i class={`fas fa-mailbox text-white ${logoSize}`}></i>
				</div>
			);
		case "facebook ad":
		case "facebook carousel ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#4267B2" }}>
					<i className={`fab fa-facebook-f text-white ${logoSize}`}></i>
				</div>
			);
		case "google display ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full bg-slate-100`}>
					<img style={{ width: "13px", height: "auto" }} src='https://cdn.addapptation.com/addapptation-asset-library/google_ad_logo.png' alt='Google Ad Logo' />
				</div>
			);
		case "linkedin ad":
		case "linkedin carousel ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#0a66c2" }}>
					<i className={`fab fa-linkedin-in text-white ${logoSize}`}></i>
				</div>
			);
		case "marketing email":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#FF7F50" }}>
					<i className={`fa fa-envelope text-white ${logoSize}`}></i>
				</div>
			);
		case "programmatic display ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#7851A9" }}>
					<i className={`fas fa-ad text-white ${logoSize}`}></i>
				</div>
			);
		case "programmatic ctv ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#7851A9" }}>
					<i className={`fas fa-tv-retro text-white ${logoSize}`}></i>
				</div>
			);
		case "programmatic video ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#7851A9" }}>
					<i className={`fas fa-video text-white ${logoSize}`}></i>
				</div>
			);
		case "programmatic audio ad":
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "#7851A9" }}>
					<i className={`fas fa-microphone text-white ${logoSize}`}></i>
				</div>
			);
		default:
			return (
				<div className={`flex justify-center items-center ${size} rounded-full`} style={{ backgroundColor: "gray" }}>
					<i className={`fas fa-sun text-white ${logoSize}`}></i>
				</div>
			);
	}
};

const statusBadge = (status) => {
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
};

export { formatDate, adIcon, statusBadge };
