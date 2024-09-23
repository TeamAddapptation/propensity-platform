"use client";
import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AccountsTable } from './components/AccountsTable';

function Audiences({params}) {
	const [accounts, setAccounts] = useState(null);

	useEffect(() => {
		async function fetchData() {
			console.log("Fetching account list...");
			const data = await getAccountLists();
			// console.log("Accounts: ", data);
			setAccounts(data);
		}

		fetchData();
	}, []); // Empty dependency array to run only once on mount

	async function getAccountLists() {
		const body = {
			workspace_id: "a0TJw0000016PJkMAM",
			user_id: "a0S8W00000bbCsSUAU"
		}
		const res = await fetch('https://t-propensity-react.addapptation.com/audiences?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac', {method: "POST", headers: {'Content-Type': 'application/json' }, body: JSON.stringify(body)});
		const data = await res.json();
		return data;
	}

	return (
		<div className='bg-white p-4 sm:p-6 lg:p-8 m-4'>
			<h1>MADE IT!</h1>
			{accounts ? (
				<AccountsTable accounts={accounts}/>
			) : (
				<div className='loader'>
					Loading...
				</div>
			)}
		</div>
	);
}

export default Audiences;
