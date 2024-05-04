import React from "react";

type Props = {
	params: {
		id: string;
	};
};

export default function ProductPage({ params }: Props) {
	return <div>ProductPage {params.id}</div>;
}
