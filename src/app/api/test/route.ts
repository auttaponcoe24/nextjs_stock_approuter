import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
	const route = "test";

	return NextResponse.json({ route });
}
