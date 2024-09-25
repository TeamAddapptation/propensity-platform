const usersColumns = [
	{
		accessorKey: "User__r.Name",
		header: "Name",
		cell: ({ row }) => (
			<div className='flex flex-col'>
				<p className='text-sm text-gray-500'>{row.original.User__r.Name}</p>
				<p className='text-xs text-gray-400'>{row.original.User__r.addapptation_Id__c}</p>
			</div>
		),
	},
	{
		accessorKey: "Role__c",
		header: "Permissions",
		centered: true,
		cell: ({ row }) => {
			const role = row.original.Role__c;

			switch (role) {
				case "Organization Administrator":
					return (
						<div className='flex justify-center'>
							<span className='inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600'>Admin</span>
						</div>
					);
				case "Editor":
					return (
						<div className='flex justify-center'>
							<span className='inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600'>Editor</span>
						</div>
					);
				case "Viewer":
					return (
						<div className='flex justify-center'>
							<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600'>Viewer</span>
						</div>
					);
				case "Inactive":
				default:
					return (
						<div className='flex justify-center'>
							<span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Inactive</span>
						</div>
					);
			}
		},
	},
	{
		accessorKey: "User__r.Billing_Contact__c",
		header: "Billing Contact",
		centered: true,
		cell: ({ row }) =>
			row.original.User__r.Billing_Contact__c ? (
				<div className='flex justify-center'>
					<i className='fas fa-check text-green-600'></i>
				</div>
			) : (
				""
			),
	},
	{
		accessorKey: "User__r.Active__c",
		header: "Access",
		enableSorting: false,
		cell: ({ row }) =>
			row.original.User__r.Active__c ? (
				<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600'>Active</span>
			) : (
				<span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'>Inactive</span>
			),
	},
];

export default usersColumns;
