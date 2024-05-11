"use client";
import React, { useState } from "react";
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material/";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/src/store/store";
import { add, signUp, userSelector } from "@/src/store/slices/userSlice";

interface User {
	username: string;
	password: string;
}

type Props = {};

import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { PayloadAction } from "@reduxjs/toolkit";

interface State extends SnackbarOrigin {
	open: boolean;
	severity: any;
}

export default function Register({}: Props) {
	const [user, setUser] = useState<User>({ username: "", password: "" });
	const router = useRouter();

	// const reducer = useSelector((state: RootState) => state.userReducer);
	const reducer = useSelector(userSelector);
	const dispatch = useAppDispatch();

	const initialValue: User = { username: "admin", password: "" };
	const formValidateSchema = Yup.object().shape({
		username: Yup.string().required("Username is required").trim(),
		password: Yup.string().required("Password is required").trim(),
	});

	const [notiState, setNotiState] = useState<State>({
		open: false,
		horizontal: "right",
		vertical: "top",
		severity: "success",
	});
	// const [notiState, setNotiState] = useState<boolean>(false);

	// validation => hook-form
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		defaultValues: initialValue,
		resolver: yupResolver(formValidateSchema),
	});

	const onSubmitForm = async (data: User) => {
		console.log(data);
		const result: PayloadAction<any> = await dispatch(signUp(data));
		if (signUp.fulfilled.match(result)) {
			// alert("Register successfully");
			setNotiState((prev: any) => ({
				...prev,
				open: true,
			}));
			setTimeout(() => {
				router.push("/login");
			}, 3000);
		} else if (signUp.rejected.match(result)) {
			// alert("Register fail");
			setNotiState((prev: any) => ({
				...prev,
				open: true,
				severity: "error",
			}));
		}

		// if (result?.payload.resutl === "ok") {
		// 	setNotiState((prev: any) => ({
		// 		...prev,
		// 		open: true,
		// 	}));
		// 	setTimeout(() => {
		// 		router.push("/login");
		// 	}, 3000);
		// } else {
		// 	setNotiState((prev: any) => ({
		// 		...prev,
		// 		open: true,
		// 		severity: "error",
		// 	}));
		// }

		// alert(JSON.stringify(data));
		console.log(errors);
	};

	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmitForm)}>
				{/* Username */}
				<Controller
					control={control}
					name="username"
					render={({ field }) => (
						<TextField
							{...field}
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
							error={(errors?.username?.message ?? "") != "" ? true : false}
							helperText={errors?.username?.message as string}
							// name="username"
							// value={user.username}
							// onChange={(e) =>
							// 	setUser((prev) => ({ ...prev, username: e.target.value }))
							// }
						/>
					)}
				/>

				{/* Password */}
				<Controller
					control={control}
					name="password"
					render={({ field }) => (
						<TextField
							{...field}
							type="password"
							variant="outlined"
							margin="normal"
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Icons.Password />
									</InputAdornment>
								),
							}}
							label="Password"
							autoComplete="password"
							autoFocus
							error={(errors?.password?.message ?? "") != ""}
							helperText={errors?.password?.message as string}
							// name="username"
							// value={user.password}
							// onChange={(e) =>
							// 	setUser((prev) => ({ ...prev, password: e.target.value }))
							// }
						/>
					)}
				/>

				{reducer.status === "failed" && (
					<Alert severity="error">Register failed</Alert>
				)}

				<Button
					className="mt-4"
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					disabled={reducer?.status === "fetching"}
					// onClick={() => {}}
				>
					Create
				</Button>
				<Button
					className="mt-4"
					fullWidth
					type="button"
					variant="outlined"
					onClick={() => {
						dispatch(add());
						router.push(`/login`);
					}}
				>
					Cancel
				</Button>
			</form>
		);
	};

	return (
		<Box className="flex justify-center items-center">
			<Card className="max-w-[345px] mt-10" elevation={3}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Register ({reducer?.count})
					</Typography>
					{showForm()}
				</CardContent>
			</Card>
			<style jsx global>
				{`
					body {
						min-height: 100vh;
						position: relative;
						margin: 0;
						background-size: cover;
						background-image: url("/static/img/bg4.jpg");
						text-align: center;
					}
				`}
			</style>
			{/* {
				open: false
				horizontal: 'right'
				vertical: 'top
				severity="success"
			} */}
			<Snackbar
				open={notiState?.open}
				autoHideDuration={6000}
				anchorOrigin={{
					horizontal: notiState?.horizontal,
					vertical: notiState?.vertical,
				}}
			>
				<Alert
					severity={notiState?.severity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{notiState?.severity === "success"
						? "สร้างบัญชีสำเร็จ"
						: "เกิดข้อผิดพลาดการสร้างบัญชี"}
				</Alert>
			</Snackbar>
			;
		</Box>
	);
}
