"use client";
import { useAppContext } from "@/context";
export default function Play() {
	const { name, setName } = useAppContext();
	return (
		<div>
			<button type='button' onClick={() => setName({ firstName: "Tim", lastName: "Bascom" })}>
				Change Name
			</button>
			{name.firstName}
		</div>
	);
}
