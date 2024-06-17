import { ProductData } from "@/src/models/product.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serverService from "../../services/serverService";
import { RootState, store } from "../store";

interface ProductState {
	products: ProductData[];
	loading: boolean;
}
const initialState: ProductState = {
	products: [],
	loading: false,
};

export const getProducts = createAsyncThunk(
	"product/getProduct",
	async (keyword?: string): Promise<any> => {
		try {
			const res = await serverService.getProducts(keyword);
			return res;
		} catch (error) {
			console.log(error);
			// throw new Error(`get product error`);
		}
	}
);

export const addProduct = createAsyncThunk(
	"prodcut/addProduct",
	async (values: ProductData) => {
		let data = new FormData();
		data.append("name", values.name);
		data.append("price", String(values.price));
		data.append("stock", String(values.stock));
		if (values.file) {
			data.append("image", values.file);
		}
		const res = await serverService.addProducts(data);
		return res;
	}
);

export const deleteProduct = createAsyncThunk(
	"product/delete",
	async (id: string) => {
		await serverService.deleteProduct(id);
		// store.dispatch(getProducts()); // run getProducts again
	}
);

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});

		// addProduct
		builder.addCase(addProduct.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addProduct.fulfilled, (state, action) => {
			state.loading = false;
		});
	},
});

// export reducer
export default productSlice.reducer;

// export common user selector
export const productSelector = (store: RootState): ProductData[] | undefined =>
	store.productReducer.products;
