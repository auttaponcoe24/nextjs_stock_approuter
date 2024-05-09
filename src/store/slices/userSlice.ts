import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as serverService from "@/src/services/serverService";

interface UserState {
	username: string;
	accessToken: string;
	error?: string;
	status: "init" | "fetching" | "success" | "failed";
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	count: number;
	// user?: UserData;
}

interface SignAcion {
	username: string;
	password: string;
}

const initialState: UserState = {
	accessToken: "",
	username: "",
	status: "init",
	isAuthenticated: false,
	isAuthenticating: true,
	count: 0,
};

export const signUp = createAsyncThunk(
	"user/signUp",
	async (credential: SignAcion) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const res = await serverService.signUp(credential);
		return res;
	}
);

export const signIn = createAsyncThunk(
	"user/signin",
	async (credential: SignAcion) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return await serverService.signIn(credential);
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		add: (state) => {
			state.count++;
		},
	},
	extraReducers: (builder) => {
		// register
		builder.addCase(signUp.pending, (state, action) => {
			state.status = "fetching";
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.status = "success";
			state.count++;
		});
		builder.addCase(signUp.rejected, (state, action) => {
			state.status = "failed";
		});

		// login
		builder.addCase(signIn.pending, (state, action) => {
			state.status = "fetching";
			state.isAuthenticated = false;
			state.isAuthenticating = true;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.status = "success";
			state.accessToken = action.payload.token;
			state.username = action.payload.username;
			state.isAuthenticated = true;
			state.isAuthenticating = false;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.status = "failed";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
		});
	},
});

// export reducer
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.userReducer;

// export fn
export const { add } = userSlice.actions;
