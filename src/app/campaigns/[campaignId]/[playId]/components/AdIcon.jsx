import styles from "../css/adIcon.module.css";

export default function AdIcon({ type }) {
	switch (type.toLowerCase()) {
		case "facebook ad":
		case "facebook carousel":
			return (
				<div className='flex justify-center items-center w-16 h-16 rounded-full' style={{ backgroundColor: "#4267B2" }}>
					<i className='fab fa-facebook-f text-white text-2xl'></i>
				</div>
			);
		case "linkedin ad":
		case "linkedin carousel":
			return (
				<div className='flex justify-center items-center w-16 h-16 rounded-full' style={{ backgroundColor: "#0a66c2" }}>
					<i className='fab fa-linkedin-in text-white text-2xl'></i>
				</div>
			);
		case "google display ad":
			return (
				<div className='flex justify-center items-center w-16 h-16 rounded-full' style={{ backgroundColor: "#4267B2" }}>
					<i className='fab fa-facebook-f text-white text-2xl'></i>
				</div>
			);
		default:
			return <span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Unknown</span>;
	}
}
