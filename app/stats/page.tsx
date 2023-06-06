'use client'

import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

//get me the url param
export default function Home() {
    const searchParams = useSearchParams();
    const querys = searchParams.get('shorturl');
    const [query, setQuery] = useState<string>(querys || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [urlData, setUrlData] = useState<any>('');

    const fetchUrlData = async (search:string) => {
        const {data: URL, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', search)
        .single();

        if(URL){
            setUrlData(URL);
        }
        else{
            setUrlData(null);
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchUrlData(query);
    }, [query]);

    
  return (
    <div className='flex flex-col justify-center items-center mt-[80px] text-[25px] font-bold bg-white'>
      <h1 className='mb-[100px]'>
        Analytics of Zipped url
      </h1>
      {
        loading ?
            <RotatingLines
                strokeColor="grey"
                strokeWidth="3"
                animationDuration="1"
                width="46"
                visible={true}
            />
        :
            urlData === null 
            ?
                <>
                    <div className='text-[20px] font-bold'>
                        <p>Zipped url not found. Try again</p>
                        <Link href={'/stats/search'}>
                            <p>Get analytics for other url</p>
                        </Link>
                    </div>
                </>
            :
                urlData && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: -5 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 1 }}
                    >
                        <div className='text-[20px] font-bold'>
                            <Link href={urlData.url}>
                                <p>Long url: <span className='text-[#5d79e9]'> {urlData.url} </span></p>
                            </Link>
                            <Link href={`http://localhost:3000/${urlData.short_url}`}>
                                <p>Short url: <span className='text-[#47de8d]'> https://localhost/{urlData.short_url} </span></p>
                            </Link>
                            <p>Number of clicks: {urlData.clicks}</p>
                            <p>Created {formatDistanceToNow(new Date(urlData.created_at))} ago</p>
                        </div>
                    </motion.div>
                )
                
      }
    </div>
  )
}


