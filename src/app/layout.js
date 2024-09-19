"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "./components/SidebarNav";
import { AppWrapper } from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<title>Propensity</title>
				<meta name='description' content='ABM' />
				<link rel='stylesheet' type='text/css' href='https://cdn.addapptation.com/addapptation-stylesheets/fontawesome-pro-5.10.0-11-web/css/all.min.css' media='all' />
			</head>
			<body className={`bg-slate-100 ${inter.className}`}>
				<QueryClientProvider client={queryClient}>
					<AppWrapper>
						<SidebarNav />
						<main className='lg:pl-64'>{children}</main>
					</AppWrapper>
				</QueryClientProvider>
			</body>
		</html>
	);
}
