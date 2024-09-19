"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
	const {
		data: userData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["workspace"],
		queryFn: async () => {
			const res = await fetch("https://t-propensity-react.addapptation.com/user_data?api_key=6d5b9cb6-d85e-43c8-a892-b9c18dd77bac&current_workspace=true");
			const data = await res.json();
			return data;
		},
	});

	return <AppContext.Provider value={{ userData }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
