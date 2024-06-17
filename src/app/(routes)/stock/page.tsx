"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
	deleteProduct,
	getProducts,
	productSelector,
} from "@/src/store/slices/productSlice";
import { useAppDispatch } from "@/src/store/store";
import Image from "next/image";
import { productImageURL } from "@/src/utils/commonUtil";
import dayjs from "dayjs";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fab,
	Grid,
	IconButton,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import {
	Add,
	AddShoppingCart,
	AssignmentReturn,
	Delete,
	Edit,
	NewReleases,
	Star,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { userSelector } from "@/src/store/slices/userSlice";
import StockCard from "@/src/app/_components/common/StockCard";
import { ProductData } from "@/src/models/product.model";

export default function Stock() {
	const productReducer = useSelector(productSelector);
	const userReducer = useSelector(userSelector);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [selectedProduct, setSelectedProduct] =
		React.useState<ProductData | null>(null);
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!userReducer.isAuthenticating) {
			dispatch(getProducts());
		}
	}, [dispatch, userReducer.isAuthenticating]);

	const columns: GridColDef<any>[] = [
		{
			field: "id",
			headerName: "ID",
			headerAlign: "center",
			align: "center",
			width: 90,
		},
		{
			field: "image",
			headerName: "IMG",
			headerAlign: "center",
			align: "center",
			width: 80,
			renderCell: ({ value }: GridRenderCellParams) => {
				return (
					<Zoom>
						<Image
							key={value}
							height={500}
							width={500}
							alt="product image"
							src={productImageURL(value)}
							style={{
								width: 70,
								height: 70,
								borderRadius: "5%",
								objectFit: "cover",
								// cursor: "pointer",
							}}
						/>
					</Zoom>
				);
			},
		},
		{
			field: "name",
			headerName: "Product name",
			headerAlign: "center",
			width: 350,
			// editable: true,
			renderCell: (params: GridRenderCellParams) => {
				// console.log("params", params);

				return <div className="text-start">{params?.value}</div>;
			},
		},
		{
			field: "price",
			headerName: "Price",
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: ({ value }: GridRenderCellParams) => {
				return (
					<Typography variant="body1">
						<NumericFormat
							value={value}
							displayType="text"
							thousandSeparator={true}
							decimalScale={0}
							fixedDecimalScale={true}
						/>
					</Typography>
				);
			},
		},
		{
			headerName: "Stock",
			field: "stock",
			headerAlign: "center",
			align: "center",
			width: 130,
		},
		{
			headerName: "Timsstamp",
			headerAlign: "center",
			align: "center",
			field: "createdAt",
			width: 230,
			renderCell: ({ value }: GridRenderCellParams<String>) => {
				return (
					<Typography>{dayjs(value).format("DD/MM/YYYY HH:mm")}</Typography>
				);
			},
		},
		{
			field: "",
			headerAlign: "center",
			headerName: "ACTION",
			align: "center",
			renderCell: ({ row }) => {
				// console.log("row", row);

				return (
					<Stack direction={"row"}>
						<IconButton
							aria-label="edit"
							size="large"
							onClick={() => router.push(`stock/edit?id=${row.id}`)}
						>
							<Edit fontSize="inherit" />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="large"
							onClick={() => {
								setOpenDialog(true);
								setSelectedProduct(row);
							}}
						>
							<Delete fontSize="inherit" />
						</IconButton>
					</Stack>
				);
			},
		},
	];

	const CustomToolbar = ({ setFilterButtonEl }: any) => (
		<GridToolbarContainer>
			<GridToolbarFilterButton ref={setFilterButtonEl} />
			<Link href="/stock/add">
				<Fab
					color="primary"
					aria-label="add"
					sx={{
						position: "absolute",
						top: 10,
						right: 10,
					}}
				>
					<Add />
				</Fab>
			</Link>
		</GridToolbarContainer>
	);

	const handleDeleteConfirm = async () => {
		if (selectedProduct) {
			const result = await dispatch(deleteProduct(String(selectedProduct.id)));
			if (result.meta.requestStatus == "fulfilled") {
				dispatch(getProducts());
				setOpenDialog(false);
			} else {
				alert("Failed to delete");
			}
		}
	};

	// Dialog or Modal
	const showDialog = () => {
		if (selectedProduct === null) {
			return;
		}
		return (
			<Dialog
				open={openDialog}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					<Image
						width={100}
						height={100}
						alt="product image"
						src={productImageURL(selectedProduct.image)}
						style={{ width: 100, borderRadius: "5%", objectFit: "cover" }}
					/>
					<br />
					Confirm to delete the product? : {selectedProduct.name}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						You cannot restore deleted product.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="info">
						Cancel
					</Button>
					<Button onClick={handleDeleteConfirm} color="primary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			{/* Cards */}
			<Grid container style={{ marginBottom: 16 }} spacing={7}>
				<Grid item lg={3} md={6} sm={12}>
					<StockCard
						icon={AddShoppingCart}
						title="TOTAL"
						subtitle="112 THB"
						color="#00a65a"
					/>
				</Grid>

				<Grid item lg={3} md={6} sm={12}>
					<StockCard
						icon={NewReleases}
						title="EMPTY"
						subtitle="9 PCS."
						color="#f39c12"
					/>
				</Grid>

				<Grid item lg={3} md={6} sm={12}>
					<StockCard
						icon={AssignmentReturn}
						title="RETURN"
						subtitle="1 PCS."
						color="#dd4b39"
					/>
				</Grid>

				<Grid item lg={3} md={6} sm={12}>
					<StockCard
						icon={Star}
						title="LOSS"
						subtitle="5 PCS."
						color="#00c0ef"
					/>
				</Grid>
			</Grid>

			{/* Table */}
			<DataGrid
				sx={{ backgroundColor: "white", height: "70vh" }}
				rows={productReducer}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[10]}
				slots={{
					toolbar: CustomToolbar,
				}}
			/>

			{/* Dialog or Modal */}
			{showDialog()}
		</Box>
	);
}
