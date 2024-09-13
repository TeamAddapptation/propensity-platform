"use client";
import { useMemo } from "react";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import columnDef from "./audienceColumns";
import dataJSON from "./data.json";

const AudienceTable = () => {
	const finalData = useMemo(() => dataJSON, []);
	const finalColumnDef = useMemo(() => columnDef, []);

	const table = useReactTable({
		columns: finalColumnDef,
		data: finalData,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<h3>Audience Table</h3>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerEl) => {
						return (
							<tr key={headerEl.id}>
								{headerEl.headers.map((columnEl) => {
									return (
										<th key={columnEl.id} colSpan={columnEl.colSpan}>
											{columnEl.isPlaceholder ? null : flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
										</th>
									);
								})}
							</tr>
						);
					})}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((rowEl) => {
						return (
							<tr key={rowEl.id}>
								{rowEl.getVisibleCells().map((cellEl) => {
									return <td key={cellEl.id}>{flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default AudienceTable;
