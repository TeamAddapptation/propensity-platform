"use client";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/layout/Container";
import Table from "../components/table/Table";
import styles from "./settings.module.css";

const workspaceColumns = [
	{
		accessorKey: "Name",
		header: "Name",
		width: "30%",
	},
	{
		accessorKey: "users",
		header: "Users",
		enableSorting: false,
		width: "50%",
		cell: (info) => <div className={`${styles.truncate_2_lines}`}>{info.getValue()}</div>,
	},
	{
		accessorKey: "switch",
		header: "Switch Workspace",
		enableSorting: false,
		width: "20%",
		centered: true,
		cell: (info) => (
			<div className='flex justify-center'>
				<button type='button' className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
					Switch
				</button>
			</div>
		),
	},
];

export default function Page() {
	const {
		data: workspaces,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["workspaces"],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_USE}&workspaces=true`);
			const data = await res.json();

			// Add a 'users' field to each workspace with joined user names
			return data.map((workspace) => {
				const users = workspace.Organization_Users__r ? workspace.Organization_Users__r.map((user) => user.User__r.Name).join(", ") : "No Users";
				return { ...workspace, users };
			});
		},
	});

	if (!workspaces) return <p>Loading Workspaces</p>;

	return (
		<div>
			<Container>{<Table columns={workspaceColumns} tableData={workspaces} enableSorting={true} enablePagination={false} pageSize={10} />}</Container>
		</div>
	);
}
