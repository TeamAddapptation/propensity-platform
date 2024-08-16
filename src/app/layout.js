import { Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "./components/SidebarNav";
import { AppWrapper } from "@/context";
import Dashboard from "./page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Propensity",
	description: "ABM",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link rel='stylesheet' type='text/css' href='https://cdn.addapptation.com/addapptation-stylesheets/fontawesome-pro-5.10.0-11-web/css/all.min.css' media='all' />
			</head>
			<body className={`bg-slate-100 ${inter.className}`}>
				<SidebarNav />

				<AppWrapper>
					<Dashboard>{children}</Dashboard>
				</AppWrapper>
			</body>
		</html>
	);
}
