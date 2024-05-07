import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Stock({}: Props) {
	return (
		<Box sx={{ mt: 1 }}>
			Stock
			{/* <Image
				src="/static/img/next_login.jpg"
				width={180}
				height={35}
				alt="logo"
				style={{ objectFit: "contain" }}
			/>
			<Image
				src="https://ecklf.com/static/blog/rn-monorepo/banner.png"
				width={180}
				height={35}
				alt="logo"
				style={{ objectFit: "contain" }}
			/> */}
		</Box>
	);
}
