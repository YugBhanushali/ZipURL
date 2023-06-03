import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    // i want to make url short 

    // i want to redirect to url
    // const {searchParams} = new URL(req.url);
    // const url = searchParams.get('url');
    return NextResponse.json({'message': 'http://localhost:3000/new'});
}