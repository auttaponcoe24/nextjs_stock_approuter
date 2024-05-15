import { ProductData } from "@/src/models/product.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serverService from "../../services/serverService";
import { RootState } from "../store";

interface ProductState {
	products: ProductData[];
}
const initialState: ProductState = {
	products: [],
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

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
	},
});

// export reducer
export default productSlice.reducer;

// export common user selector
export const productSelector = (store: RootState): ProductData[] | undefined =>
	store.productReducer.products;
