"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const router = useRouter();
	const path = usePathname();

	const initialize = () => {
		if (path == "/") {
			router.push("/stock");
			return null;
		}
	};

	useEffect(() => {
		initialize();
	}, []);

	return <div>{children}</div>;
}
