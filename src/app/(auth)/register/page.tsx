import {
	Box,
	Card,
	CardContent,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material/";
import React from "react";

type Props = {};

export default function Register({}: Props) {
	const showForm = () => {
		return (
			<form>
				<TextField
					variant="outlined"
					margin="normal"
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Icons.Email />
							</InputAdornment>
						),
					}}
					label="Username"
					autoComplete="email"
					autoFocus
				/>
			</form>
		);
	};
	return (
		<Box className="flex justify-center items-center">
			<Card className="max-w-[345px] mt-10" elevation={3}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Register
					</Typography>
					{showForm()}
				</CardContent>
			</Card>
		</Box>
	);
}
