import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const shorturl = searchParams.get('url');

    const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', shorturl)
        .single();

    if(URLs){
        return NextResponse.json({urls: URLs, available: false});
    }
    else{
        return NextResponse.json({urls:URLs, available: true});
    }   
}