"use client";
import { Box, styled } from "@mui/material";
import React from "react";
import Header from "../_components/layout/Header";
import Sidebar from "../_components/layout/Sidebar";
import DrawerHeader from "../_components/layout/DrawerHeader";

type Props = {
	children: React.ReactNode;
};

export default function RoutesLayout({ children }: Props) {
	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<section>
			<Box sx={{ display: "flex" }}>
				<Header open={open} handleDrawerOpen={handleDrawerOpen} />
				<Sidebar open={open} handleDrawerClose={handleDrawerClose} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					{/* <React.Suspense fallback={<Loading />}>{children}</React.Suspense> */}
					{children}
				</Box>
			</Box>
		</section>
	);
}
