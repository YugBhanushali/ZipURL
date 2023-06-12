import { supabase } from "@/utils/supabase";
import { da } from "date-fns/locale";
import { NextResponse } from "next/server";

//for creating short url
export async function POST(req: Request) {
    const { url, short_url,created_at,clicks } = await req.json();
    let tempUrl = {
        url: String(url),
        short_url: String(short_url),
        created_at: String(created_at),
        clicks: Number(clicks)
    }

    const store = await supabase
        .from('URLs')
        .insert([tempUrl]);

    if(store){
        return NextResponse.json({"message":'URL added successfully',data: store}, {status: 201});
    }
    else{
        return NextResponse.json({"message":'URL not added.try again',data: store}, {status: 400});
    }
}

//for updating short url clicks
export async function PUT(req: Request) {
    const {short_url_id} = await req.json();

    const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', String(short_url_id))
        .single();

    if(URLs){
        const finalClicks = URLs.clicks + 1;
        const res = await supabase
            .from('URLs')
            .update({clicks: finalClicks})
            .eq('short_url', String(short_url_id))
            .single();

        const {data: updatedURLs, error} = await supabase
            .from('URLs')
            .select('*')
            .eq('short_url', String(short_url_id))
            .single();
            
        return NextResponse.json({message: 'URL clicks updated successfully', data: res,url:updatedURLs}, {status: 200});

    }
    else{
        return NextResponse.json({message: 'URL not found', data: URLs}, {status: 404});
    }
}

//for searching short url
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shorturl = searchParams.get('search');
    
    const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', shorturl)
        .single();

    if(URLs){
        return NextResponse.json({urls: URLs, available: true});
    }
    else{
        return NextResponse.json({urls:URLs, available: false});
    }   
}

//delete short url

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const shortUrl = searchParams.get('short_url');

    const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', String(shortUrl))
        .single();

    if(URLs){
        const res = await supabase
            .from('URLs')
            .delete()
            .eq('short_url', String(shortUrl))
            .single();

        return NextResponse.json({message: 'URL deleted successfully', data: res}, {status: 200});

    }
    else{
        return NextResponse.json({message: 'URL not found', data: URLs}, {status: 404});
    }
}
        