import { ACCESS_TOKEN_KEY } from "@/src/utils/constant";
import httpClient from "@/src/utils/httpClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET
export async function GET(
	request: NextRequest,
	context: {
		params: {
			route: string;
		};
	}
): Promise<any> {
	const route = context.params.route;
	if (route === "signout") {
		return signout(request);
	} else if (route === "session") {
		return getSession(request);
	}
	return NextResponse.json({ route });
}

// POST
export const POST = async (
	request: NextRequest,
	context: {
		params: {
			route: string;
		};
	}
): Promise<any> => {
	const route = context.params.route;
	const body = await request.json();
	if (route === "signin") {
		// return NextResponse.json({ echo: body });
		return signin(body);
	}
};

const signin = async (body: {
	username: string;
	password: string;
}): Promise<any> => {
	try {
		const res = await httpClient.post(`authen/login`, body);
		const { token } = res.data;
		cookies().set(ACCESS_TOKEN_KEY, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
		});
		return NextResponse.json(res.data);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ result: "nok" });
	}
};

const signout = async (request: NextRequest): Promise<any> => {
	try {
		const cookieStore = cookies();
		cookieStore.delete(ACCESS_TOKEN_KEY);
		return NextResponse.json({ result: "ok" });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ result: "nok" });
	}
};

const getSession = async (request: NextRequest): Promise<any> => {
	try {
		const cookieStore = cookies();
		const accessTokenKey = cookieStore.get(ACCESS_TOKEN_KEY);
		if (!!accessTokenKey?.value) {
			const res = await httpClient.get(`/authen/profile`, {
				headers: {
					Authorization: `Bearer ${accessTokenKey?.value}`,
				},
			});
			return NextResponse.json(res.data);
		} else {
			return NextResponse.json({ result: "nok" });
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({ result: "nok" });
	}
};
