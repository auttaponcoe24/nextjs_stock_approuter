import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as serverService from "@/src/services/serverService";

interface SignAcion {
	username: string;
	password: string;
}

const initialState = {
	count: 0,
};

export const signUp = createAsyncThunk(
	"user/signUp",
	async (credential: SignAcion) => {
		const res = await serverService.signUp(credential);
		return res;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// add: (state) => ({ ...state, count: state.count++ }),
		add: (state) => {
			state.count++;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.count++;
		});
	},
});

// export reducer
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.userReducer;

// export fn
export const { add } = userSlice.actions;
