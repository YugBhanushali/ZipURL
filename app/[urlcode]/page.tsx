'use client'

import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Link from "next/link";
import { URL_OF_WEBSITE } from "@/utils/constants";
import { useMediaQuery } from "@chakra-ui/react";
import RotatingLinesAnimation from "@/components/ui/RotatingLinesAnimation";



export default function Home() {


    const [urlChecker, setUrlChecker] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isMobileView] = useMediaQuery('(max-width: 768px)');

    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);
    const short_url_id = pathname.replace('/','');

    const fetchData = async () => {
        try {

            const res = await fetch(`${URL_OF_WEBSITE}api/url`, {
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
                // router.push(data?.url?.url);    
                window.location.href = data?.url?.url;
            }   
            else {
                setLoading(false);
                setUrlChecker(true);
            }         

            
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
                        <RotatingLinesAnimation widthOfLines={isMobileView ? "24" : "46" } />
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