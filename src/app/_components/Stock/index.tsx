"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useIntl } from "react-intl";

type Props = {};

export default function StockComponent({}: Props) {
	const router = useRouter();
	const path = usePathname();
	const { messages } = useIntl();

	const langTopicx = {
		"en-US": "EN",
		"th-TH": "TH",
	};

	const langTopic = ["th-TH", "en-US"];

	// console.log("path", path);
	// const [open, setOpen] = useState(false);

	// const onChangeLang = (lang: string) => {
	// 	router.push(router.asPath, router.asPath, { locale: lang });
	// };
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (data: any) => {
		// console.log("data", data);
		setAnchorEl(null);
		// router.push(router.asPath, { locale: data });
	};

	// const onChangeLang = (lang: string) => {
	// 	router.push(router.asPath, { locale: lang } as any);
	// };

	return (
		<div>
			{/* Stock: change-lang
			<Menu open={open}>asdfsadf</Menu>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				Dashboard
			</Button>
			<Menu
				id="basic-menu"
				// anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{langTopic.map((item: any, index) => (
					// <Box key={index}>
					<MenuItem key={index} onClick={() => handleClose(item)}>
						{item === "th-TH" ? "TH" : "EN"}
					</MenuItem>
					// </Box>
				))}
			</Menu> */}
		</div>
	);
}
