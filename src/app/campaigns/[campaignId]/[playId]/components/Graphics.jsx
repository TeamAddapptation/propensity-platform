import Table from "@/app/components/table/Table";

export default function Graphics({ assets }) {
	const graphicsColumns = [
		{
			accessorKey: "image",
			header: "Image",
			width: "60%",
			cell: ({ row }) => (
				<div className='flex gap-2 w-full'>
					<div className='w-16'>
						<img src={row.original.has_asset ? row.original.image : `https://via.placeholder.com/${row.original.size}`} />
					</div>
					<div className='flex flex-col w-full'>
						<div className='flex flex-col gap-2 max-w-full'>
							<p className='text-sm text-gray-500 truncate overflow-hidden text-ellipsis whitespace-nowrap' style={{ maxWidth: "150px" }}>
								{row.original.image_name}
							</p>
							<p className='text-xs text-gray-500'>{row.original.size}</p>
						</div>
					</div>
				</div>
			),
		},
		{
			accessorKey: "actions",
			header: "Actions",
			enableSorting: false,
			width: "40%",
			cell: ({ row }) => <div className='flex flex-col justify-center gap-2 w-16'>Edit</div>,
		},
	];

	return (
		<>
			<Table columns={graphicsColumns} tableData={assets} enableSorting={true} initialSorting={[{ id: "image", desc: false }]} enablePagination={false} pageSize={10} />
		</>
	);
}
