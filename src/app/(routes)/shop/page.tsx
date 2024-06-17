import ProductCard from "@/src/app/(routes)/shop/ProductCard";
import { ProductData } from "@/src/models/product.model";
import { ACCESS_TOKEN_KEY } from "@/src/utils/constant";
import { Box, Button } from "@mui/material";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

export const metadata: Metadata = {
	title: "CM Shop",
	description: "Shop Shop",
};

export default async function Shop({}: Props) {
	const cookieStore = cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY);

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL_API}/stock/product`,
		{
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token?.value}`,
			},
		}
	);

	const product = (await result.json()) as ProductData[];

	return (
		<Box className="grid gap-2 grid-cols-fluid w-full">
			{product.map((p) => (
				<ProductCard key={p.id} product={p} />
			))}
		</Box>
	);
}
