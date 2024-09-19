"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export default function Connections() {
	const {
		data: connections,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["connections"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&connections=true`);
			const data = await res.json();
			console.log("Connections: ", data);

			return data;
		},
	});
	return <div>Connections</div>;
}
