"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Dashboard({ children }) {
	const queryClient = new QueryClient({});
	return (
		<QueryClientProvider client={queryClient}>
			<main className='lg:pl-64'>{children}</main>;
		</QueryClientProvider>
	);
}
