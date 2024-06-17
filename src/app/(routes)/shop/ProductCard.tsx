"use client";
import { ProductData } from "@/src/models/product.model";
import { productImageURL } from "@/src/utils/commonUtil";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";

type Props = {
	product: ProductData;
};

export default function ProductCard({ product }: Props) {
	return (
		<Card sx={{ maxWidth: 345 }} elevation={7}>
			<CardActionArea onClick={() => alert(JSON.stringify(product.name))}>
				<CardMedia
					sx={{ height: 240 }}
					image={productImageURL(product.image)}
					title="green iguana"
				>
					<CardContent>
						<Typography
							gutterBottom
							variant="h6"
							component={`div`}
							className="line-clamp-2"
						>
							{product.name}
						</Typography>

						<Typography variant="body1">
							<NumericFormat
								value={product.price}
								displayType="text"
								thousandSeparator={true}
								decimalScale={2}
								fixedDecimalScale={true}
								suffix=" - "
							/>
						</Typography>
					</CardContent>
				</CardMedia>
			</CardActionArea>
		</Card>
	);
}
