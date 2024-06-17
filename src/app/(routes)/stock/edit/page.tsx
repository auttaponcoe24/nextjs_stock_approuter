import React from "react";
import StockEditForm from "./StockEditForm";
import { doGetStockById } from "@/src/services/serverService";
import { ProductData } from "@/src/models/product.model";
import { Metadata, ResolvingMetadata } from "next";
import { productImageURL } from "@/src/utils/commonUtil";

type Props = {
	searchParams: {
		id?: string;
	};
};

export async function generateMetadata(
	{ searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	let product = {} as ProductData;

	if (searchParams.id) {
		product = await doGetStockById(searchParams.id);
	}

	return {
		title: product.name ?? "StockEdit",
		openGraph: {
			title: product.name,
			description: product.name + "price: " + product.price,
			url: "https://nextjs.org",
			siteName: "Next.js",
			images: [
				{
					url: productImageURL(product.image),
					width: 800,
					height: 600,
				},
				{
					url: "https://nextjs.org/og-alt.png",
					width: 1800,
					height: 1600,
					alt: "My custom alt",
				},
			],
			locale: "en_US",
			type: "website",
		},
	};
}

export default async function StockEdit({ searchParams }: Props) {
	let product = {} as ProductData;

	if (searchParams.id) {
		product = await doGetStockById(searchParams.id);
		console.log("srr fetch edit", JSON.stringify(product));
	}
	return (
		<div>
			<StockEditForm product={product} />
		</div>
	);
}
