'use client'

import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";


export default function Home() {

    const [urlDatas, setUrlDatas] = useState<urlData>();

    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);
    const urlCode = pathname.replace('/','');

    const fetchData = async () => {
        try {
            let { data: URLs, error } = await supabase
                .from('URLs')
                .select('*')
                .eq('short_url', urlCode)
                .single();
            console.log(URLs);
            if (URLs) {
                //update clicks
                const clicks = URLs.clicks + 1;
                let { data: URLUpdated, error } = await supabase
                    .from('URLs')
                    .update({ clicks: clicks })
                    .eq('short_url', urlCode)
                    .single();
                router.push(URLs.url);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {

        fetchData();
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>URL Shortener</h1>
            </div>
        </main>
    )
}