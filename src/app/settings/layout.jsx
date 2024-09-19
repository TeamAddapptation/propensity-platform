import React from "react";
import SettingsHeader from "./components/SettingsHeader";

export default function settingsLayout({ children }) {
	return (
		<div>
			<SettingsHeader />
			{children}
		</div>
	);
}
