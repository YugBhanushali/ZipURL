'use client'

import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Link from "next/link";
import { supabase } from "@/utils/supabase";


export default function Home() {

    const [urlChecker, setUrlChecker] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);
    const short_url_id = pathname.replace('/','');

    const fetchData = async () => {
        try {

            const res = await fetch(`http://localhost:3000/api/url`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },    
                body: JSON.stringify({ short_url_id })
            });

            const data = await res.json();
            console.log(data);

            if (data && res.status === 200) {
                setLoading(false);
                console.log(data);
                router.push(data?.url?.url);    
            }   
            else {
                setLoading(false);
                setUrlChecker(true);
            }         

            // let { data: URLs, error } = await supabase
            //     .from('URLs')
            //     .select('*')
            //     .eq('short_url', short_url_id)
            //     .single();
            // console.log(URLs);
            // if (URLs) {
            //     //update clicks
            //     const clicks = URLs.clicks + 1;
            //     let { data: URLUpdated, error } = await supabase
            //         .from('URLs')
            //         .update({ clicks: clicks })
            //         .eq('short_url', short_url_id)
            //         .single();

            //     setLoading(false);
            //     router.push(URLs.url);
            // }
            // else {
            //     setLoading(false);
            //     setUrlChecker(true);
            // }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {
                loading ?
                    <div className='flex flex-col justify-center items-center mt-[120px] text-[25px] font-bold'>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="3"
                            animationDuration="1"
                            width="46"
                            visible={true}
                        />
                    </div>
                    :
                    urlChecker ?
                        <div className='flex flex-col justify-center items-center mt-[80px] text-[20px] font-bold'>
                                <p>URL not found</p>
                                <Link href='/'>
                                    <p className='text-[#5d79e9]'>Go to home</p>
                                </Link>
                                <Link href='/stats/search'>
                                    <p className='text-[#5d79e9]'>Get Analytics</p>
                                </Link>
                        </div>
                        :
                        null
            }
        </main>
    )
}