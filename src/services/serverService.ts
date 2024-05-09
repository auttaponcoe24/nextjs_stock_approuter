import { SignIn, SignUp } from "../models/auth.model";
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
