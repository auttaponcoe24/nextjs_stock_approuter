import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as serverService from "@/src/services/serverService";
import httpClient from "@/src/utils/httpClient";
import { AxiosRequestConfig } from "axios";

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
		const res = await serverService.signIn(credential);

		if (res.result != "ok") {
			throw new Error("login failed");
		}

		// set or update access token ของ axios ขณะ login เพื่อช่วนเวลาเราเรียก request เราไม่จำเป็นที่จะต้องแปะ config.headers.Authorization = `Bearer ${res.token}`;
		httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
			if (config && config.headers) {
				config.headers.Authorization = `Bearer ${res.token}`;
			}

			return config;
		});
		return res;
	}
);

export const signOut = createAsyncThunk(
	"user/signout",
	async (): Promise<any> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const res = await serverService.signOut();

		if (res.result != "ok") {
			throw new Error("logout failed");
		}

		return res;
	}
);

export const getSession = createAsyncThunk(
	"user/getSession",
	async (): Promise<any> => {
		const res = await serverService.getSession();

		// set access token
		if (!!res) {
			httpClient.interceptors.request.use(
				(config?: AxiosRequestConfig | any) => {
					if (config && config.headers && res.user) {
						config.headers.Authorization = `Bearer ${res.user?.token}`;
					}
					return config;
				}
			);
		}
		return res;
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

		// logout
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.status = "success";
			state.accessToken = "";
			state.isAuthenticated = true;
			state.isAuthenticating = false;
		});

		// getSession
		builder.addCase(getSession.fulfilled, (state, action) => {
			state.isAuthenticating = false;
			// if(action.payload && action.payload.user && action.payload.user.token){}
			state.accessToken = action.payload.user.token;
			state.isAuthenticated = true;
		});
	},
});

// export reducer
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.userReducer;

// export fn
export const { add } = userSlice.actions;
