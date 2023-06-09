import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const { url , short_url , clicks , created_at } = await req.json();
    return NextResponse.json(req.json());
}