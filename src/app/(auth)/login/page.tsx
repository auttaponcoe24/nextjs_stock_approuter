"use client";
import React, { useState } from "react";
import {
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
import { add, userSelector } from "@/src/store/slices/userSlice";
import { useAppDispatch } from "@/src/store/store";

interface User {
	username: string;
	password: string;
}

type Props = {};

export default function Login({}: Props) {
	const [user, setUser] = useState<User>({ username: "", password: "" });
	const router = useRouter();

	const initialValue: User = { username: "admin", password: "" };
	const formValidateSchema = Yup.object().shape({
		username: Yup.string().required("Username is required").trim(),
		password: Yup.string().required("Password is required").trim(),
	});

	// validation => hook-form
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		defaultValues: initialValue,
		resolver: yupResolver(formValidateSchema),
	});

	const handleOnSubmitForm = (data: User) => {
		console.log(data);

		alert(JSON.stringify(data));
		console.log(errors);
	};

	const reducer = useSelector(userSelector);
	const dispatch = useAppDispatch();

	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(handleOnSubmitForm)}>
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

				<Button
					className="mt-4"
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					// onClick={() => {}}
				>
					Login
				</Button>
				<Button
					className="mt-4"
					fullWidth
					type="button"
					variant="outlined"
					onClick={() => {
						dispatch(add());
						router.push("/register");
					}}
				>
					Register
				</Button>
			</form>
		);
	};

	return (
		<Box className="flex justify-center items-center">
			<Card className="max-w-[345px] mt-10" elevation={3}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Login ({reducer.count})
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
		</Box>
	);
}
