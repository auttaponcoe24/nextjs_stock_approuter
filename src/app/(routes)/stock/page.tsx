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
import { getProducts, productSelector } from "@/src/store/slices/productSlice";
import { useAppDispatch } from "@/src/store/store";
import Image from "next/image";
import { productImageURL } from "@/src/utils/commonUtil";
import dayjs from "dayjs";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Fab, IconButton, Link, Stack, Typography } from "@mui/material";
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

export default function stock() {
	const reducer = useSelector(productSelector);
	const dispatch = useAppDispatch();
	const router = useRouter();

	React.useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

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
				console.log("row", row);

				return (
					<Stack direction={"row"}>
						<IconButton
							aria-label="edit"
							size="large"
							onClick={() => router.push(`stock/edit?id=${row.id}`)}
						>
							<Edit fontSize="inherit" />
						</IconButton>
						<IconButton aria-label="delete" size="large" onClick={() => {}}>
							<Delete fontSize="inherit" />
						</IconButton>
					</Stack>
				);
			},
		},
	];

	const CustomToolbar: React.FunctionComponent<{
		setFilterButtonEl: React.Dispatch<
			React.SetStateAction<HTMLButtonElement | null>
		>;
	}> = ({ setFilterButtonEl }) => (
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

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={reducer}
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
		</Box>
	);
}
