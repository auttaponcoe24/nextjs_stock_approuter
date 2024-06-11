"use client";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "@/store/store";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductData } from "@/src/models/product.model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addProduct } from "@/src/store/slices/productSlice";
import { useState } from "react";
import { productImageURL } from "@/src/utils/commonUtil";

const formValidateSchema = Yup.object().shape({
	name: Yup.string().required("Name is required").trim(),
	price: Yup.number().min(100, "Number must be greater than 100"),
	stock: Yup.number().min(100, "Number must be greater than 100"),
});

type Props = {
	product: ProductData;
};

export default function StockEditForm({ product }: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isOpenNotificate, setIsOpenNotificate] = useState<{
		isOpen: boolean;
		severity: "success" | "error";
		message: string;
	}>({
		isOpen: false,
		severity: "success",
		message: "",
	});

	// const initialValue: ProductData = { name: "", price: 1500, stock: 9999 };
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ProductData>({
		defaultValues: product,
		// @ts-ignore
		resolver: yupResolver(formValidateSchema),
	});

	const watchPreviewImage = watch("file_obj");
	// console.log("watchPreviewImage", watchPreviewImage);

	const showPreviewImage = () => {
		if (watchPreviewImage) {
			return (
				<Image
					alt="product image"
					src={watchPreviewImage.toString()}
					width={100}
					height={100}
					style={{
						objectFit: "contain",
					}}
				/>
			);
		} else if (product.image) {
			return (
				<Image
					key={product.image}
					alt="product image"
					src={productImageURL(product.image)}
					width={100}
					height={100}
					style={{
						objectFit: "contain",
					}}
				/>
			);
		}
	};

	const onSubmitForm = async (values: ProductData): Promise<any> => {
		// console.log(values);
		const result = await dispatch(addProduct(values));
		if (result.meta.requestStatus === "fulfilled") {
			setIsOpenNotificate((prev) => ({
				...prev,
				isOpen: true,
				severity: "success",
				message: "Add Product Success",
			}));
			setTimeout(() => {
				router.push(`/stock`);
			}, 4000);
		} else {
			setIsOpenNotificate((prev) => ({
				...prev,
				isOpen: true,
				severity: "error",
				message: "Add Product Failed",
			}));
		}
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmitForm)}>
			<Card>
				<CardContent className="p-8">
					<Typography gutterBottom variant="h3">
						Create Product
					</Typography>

					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<TextField
								{...field}
								label="Name"
								error={Boolean(errors.name?.message)}
								helperText={errors.name?.message?.toString()}
								variant="outlined"
								margin="normal"
								fullWidth
								autoFocus
							/>
						)}
					/>

					<Controller
						control={control}
						name="price"
						render={({ field }) => (
							<TextField
								{...field}
								label="Price"
								error={Boolean(errors.price?.message)}
								helperText={errors.price?.message?.toString()}
								variant="outlined"
								margin="normal"
								fullWidth
								autoFocus
							/>
						)}
					/>

					<Controller
						control={control}
						name="stock"
						render={({ field }) => {
							// console.log("first.field", field);
							return (
								<TextField
									{...field}
									label="Stock"
									error={Boolean(errors.stock?.message)}
									helperText={errors.stock?.message?.toString()}
									variant="outlined"
									margin="normal"
									fullWidth
									autoFocus
								/>
							);
						}}
					/>

					<Box>{showPreviewImage()}</Box>

					<TextField
						className="mt-4"
						type="file"
						fullWidth
						onChange={(e: React.ChangeEvent<any>) => {
							e.preventDefault();
							setValue("file", e.target.files[0]); // for upload
							setValue("file_obj", URL.createObjectURL(e.target.files[0])); // for preview image
							console.log(e);
						}}
					/>
				</CardContent>
				<CardActions>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						type="submit"
						className="mr-2"
					>
						Create
					</Button>
					<Button
						fullWidth
						variant="outlined"
						onClick={() => router.push("/stock")}
					>
						Cancel
					</Button>
				</CardActions>
			</Card>

			<Snackbar
				open={isOpenNotificate.isOpen}
				autoHideDuration={4000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				onClose={() =>
					setIsOpenNotificate((prev: any) => ({
						...prev,
						isOpen: false,
					}))
				}
			>
				<Alert
					onClose={() =>
						setIsOpenNotificate((prev: any) => ({
							...prev,
							isOpen: false,
						}))
					}
					severity={isOpenNotificate.severity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{isOpenNotificate.message}
				</Alert>
			</Snackbar>
		</form>
	);
}
