import React from "react";
import StockEditForm from "./StockEditForm";
import { doGetStockById } from "@/src/services/serverService";
import { ProductData } from "@/src/models/product.model";

type Props = {
	searchParams: {
		id?: string;
	};
};

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
