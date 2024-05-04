import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function AboutusLayout({ children }: Props) {
	return <div className="container text-center text-red-600">{children}</div>;
}
