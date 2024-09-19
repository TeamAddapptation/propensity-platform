"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Table from "@/app/components/table/Table";
import Container from "@/app/components/layout/Container";
import usersColumns from "./tableColumns";

export default function Users() {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["connections"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&users=true`);
			const data = await res.json();
			console.log("Users: ", data);

			return data;
		},
	});
	if (isLoading) return <p>Loading</p>;
	return (
		<div>
			<Container>
				<Table columns={usersColumns} tableData={users} enableSorting={true} />
			</Container>
		</div>
	);
}
