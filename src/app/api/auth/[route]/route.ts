import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	context: {
		params: {
			route: string;
		};
	}
): Promise<any> {
	const route = context.params.route;

	return NextResponse.json({ route });
}
