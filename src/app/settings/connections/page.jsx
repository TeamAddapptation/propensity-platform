"use client";
import Container from "@/app/components/layout/Container";
import Table from "@/app/components/table/Table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import connectionsColumns from "./tableColumns";
export default function Connections() {
	const {
		data: connections,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["connectionsQuery"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&connections=true`);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	return (
		<div>
			<Container>{<Table columns={connectionsColumns} tableData={connections}></Table>}</Container>
		</div>
	);
}
