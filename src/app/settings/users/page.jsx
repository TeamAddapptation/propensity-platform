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
		isFetching,
	} = useQuery({
		queryKey: ["usersQuery"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&users=true`);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!users) return <p>No Data To Show</p>;
	console.log(users);
	return (
		<div>
			<Container>{<Table columns={usersColumns} tableData={users} enableSorting={true} enablePagination={true} pageSize={10} />}</Container>
		</div>
	);
}
