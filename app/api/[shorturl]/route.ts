import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response ) {
    const shortUrl = new URL(req.url).pathname.split('/')[2];

    const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', String(shortUrl))
        .single();

    if(URLs){
        return NextResponse.redirect(URLs.long_url);
    }
    else{
        return NextResponse.redirect('/404');
    }
}