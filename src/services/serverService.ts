import httpClient from "../utils/httpClient";

interface signProps {
	username: string;
	password: string;
}

export const signUp = async (user: signProps) => {
	const res = await httpClient.post(`/authen/register`, user);
	return res.data;
};
