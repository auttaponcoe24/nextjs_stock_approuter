import React from "react";

type Props = {
	params: {
		id: string[];
	};
	searchParams: {
		id?: string;
		type?: string;
	};
};

export default function UserPage({ params, searchParams }: Props) {
	return (
		<div>
			UserPage: <br />
			{params.id.map((item: any, index: number) => (
				<div key={index}>User Param Id: {item}</div>
			))}
			<br />
			<div>queryParams: </div>
			<div>id: {searchParams.id}</div>
			<div>type: {searchParams.type}</div>
		</div>
	);
}
