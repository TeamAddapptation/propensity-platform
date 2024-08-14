"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
	let [name, setName] = useState({
		firstName: "Jason",
		lastName: "Bean",
	});

	return <AppContext.Provider value={{ name, setName }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
