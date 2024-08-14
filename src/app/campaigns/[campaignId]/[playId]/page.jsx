"use client";
import { useAppContext } from "@/context";

export default function Play() {
	const { play } = useAppContext();

	return (
		<div>
			<pre>{JSON.stringify(play, null, 2)}</pre>
		</div>
	);
}
