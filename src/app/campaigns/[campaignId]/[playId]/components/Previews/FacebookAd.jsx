import { GlobeAmericasIcon, XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import styles from "../../css/facebookAd.module.css";

export default function FacebookAd({ play }) {
	console.log("Preview Facebook: ", play);
	function toSentenceCase(text) {
		let words = text.split("_");
		let titleCasedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
		return titleCasedWords.join(" ");
	}

	return (
		<div className='border rounded'>
			<div className='bg-white'>
				<div className='flex px-4 py-3 border-b justify-between items-center gap-3'>
					<div className='flex flex-col'>
						<h4 className='font-semibold m-0'>Ad Preview</h4>
						<p className='text-sm text-slate-500'>This is a basic preview for content review. Ad design may vary slightly across different devices and platforms.</p>
					</div>
				</div>
			</div>
			<div className='px-10 py-5 bg-slate-50'>
				<div className={`${styles.p__facebook_ad_preview} p-3 border rounded-md`}>
					{/* Header Section */}
					<div className='p__header flex justify-between'>
						<div className='flex gap-2'>
							<div className={styles.p__profile_image}></div>
							<div className='flex-column'>
								<p>Propensity</p>
								<div className='flex items-center gap-1'>
									<p className='text-xs text-slate-500'>Sponsored</p>
									<p className='text-xs text-slate-500'>•</p>
									<span className={`${styles.p__globe_icon} text-slate-500`}>
										<GlobeAmericasIcon />
									</span>
								</div>
							</div>
						</div>
						<div className='flex gap-3 items-center justify-end'>
							<XMarkIcon className={styles.p__header_btns} />
							<EllipsisVerticalIcon className={styles.p__header_btns} />
						</div>
					</div>
					{/* Primary Text */}
					<div>
						{play.Body_Text_Only__c ? (
							<p className='text-sm py-3 whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: play.Body_Text_Only__c }}></p>
						) : (
							<p className='text-sm py-3 whitespace-pre-wrap'>Primary text here</p>
						)}
					</div>
					{/* Display Image */}
					<div>
						<div className={styles.p__image}></div>
					</div>
					{/* Headline & Button */}
					<div className='p-2 py-4 bg-slate-50 flex justify-between items-center'>
						<div className='flex-column basis-2/3'>
							<p className='text-xs text-slate-500'>company.com</p>
							<p className='font-medium'>{play.Subject__c ? play.Subject__c : "Headline here"}</p>
						</div>
						<div className='basis-1/3 flex justify-end'>
							<button type='button' className='rounded-md bg-zinc-200 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-zinc-300'>
								{play.Call_To_Action__c ? toSentenceCase(play.Call_To_Action__c) : "Learn More"}
							</button>
						</div>
					</div>
					{/* Social Buttons */}
					<div className='p-2 pt-5'>
						<hr></hr>
						<div className='flex pt-3 justify-around'>
							<div className='flex gap-2 text-slate-500 items-center'>
								<HandThumbUpIcon className={styles.p__social_btns} />
								<p className='text-sm font-medium'>Like</p>
							</div>
							<div className='flex gap-2 text-slate-500 items-center'>
								<ChatBubbleLeftIcon className={styles.p__social_btns} />
								<p className='text-sm font-medium'>Comment</p>
							</div>
							<div className='flex gap-2 text-slate-500 items-center'>
								<ShareIcon className={styles.p__social_btns} />
								<p className='text-sm font-medium'>Comment</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
