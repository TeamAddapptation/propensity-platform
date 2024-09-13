

async function getAccountLists() {
	const res = await fetch("https://t-propensity-react.addapptation.com/audiences?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac");
	const data = await res.json();
	console.log(data)
	return data;
}
console.log("SEE THIS?")
export default async function Audiences() {
	console.log("get account list")
	const accounts = await getAccountLists();
	console.log("ACCOUNTS: ",accounts)
	return (
		<div className='bg-white p-4 sm:p-6 lg:p-8 m-4'>
			<h1>MADE IT!</h1>
			{JSON.stringify(accounts, null, 2)}
		</div>
	);
}