import { GetSession, SignIn, SignUp } from "../models/auth.model";
import httpClient from "../utils/httpClient";

interface signProps {
	username: string;
	password: string;
}

export const signUp = async (user: signProps): Promise<SignUp> => {
	const res = await httpClient.post(`/authen/register`, user);
	return res.data;
};

export const signIn = async (user: signProps): Promise<SignIn> => {
	const res = await httpClient.post(`/auth/signin`, user, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return res.data;
};

export const signOut = async () => {
	const res = await httpClient.get(`/auth/signout`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return res.data;
};

export const getSession = async (): Promise<GetSession> => {
	const res = await httpClient.get(`/auth/session`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return res.data;
};

export const getProducts = async (keyword?: string): Promise<any> => {
	if (keyword) {
		const res = await httpClient.get(`/stock/product/keyword/${keyword}`);
		return res.data;
	} else {
		const res = await httpClient.get(`/stock/product`);
		return res.data;
	}
};
