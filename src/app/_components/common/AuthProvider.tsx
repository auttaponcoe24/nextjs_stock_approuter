"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const router = useRouter();
	const path = usePathname();

	useEffect(() => {
		initialize();
	}, []);

	const initialize = () => {
		if (path === "/") {
			router.push("/stock");
			return null;
		}
	};
	return <div>{children}</div>;
}
