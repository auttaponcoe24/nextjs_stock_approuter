import React from "react";

type Props = {};

export default async function AboutUs({}: Props) {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	return <div>AboutUs</div>;
}
