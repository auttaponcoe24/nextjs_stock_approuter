"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import StockComponent from "../../_components/Stock";
import { useAppDispatch } from "@/src/store/store";
import { useSelector } from "react-redux";
import { getSession, userSelector } from "@/src/store/slices/userSlice";

type Props = {};

export default function Stock({}: Props) {
	const dispatch = useAppDispatch();
	const reducer = useSelector(userSelector);

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
			<StockComponent />
		</Box>
	);
}
