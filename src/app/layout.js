import { Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "./components/SidebarNav";
import { AppWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Propensity",
	description: "ABM",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`bg-slate-100 ${inter.className}`}>
				<SidebarNav />
				<AppWrapper>
					<main className='lg:pl-64'>{children}</main>
				</AppWrapper>
			</body>
		</html>
	);
}
