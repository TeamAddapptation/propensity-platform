"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
	let [play, setPlay] = useState(null);

	return <AppContext.Provider value={{ play, setPlay }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
