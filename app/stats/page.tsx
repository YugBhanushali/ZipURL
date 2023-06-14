'use client'

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@chakra-ui/react';
import { is } from 'date-fns/locale';
import { sliceURL } from '@/utils/Functions';


//get me the url param
export default function Home() {
    const searchParams = useSearchParams();
    const querys = searchParams.get('shorturl');
    const [query, setQuery] = useState<string>(querys || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [urlData, setUrlData] = useState<any>('');
    const [isMobileView] = useMediaQuery('(max-width: 768px)');

    const fetchUrlData = async (search:string) => {

        const res = await fetch(`http://localhost:3000/api/url?search=${search}`);

        const data = await res.json();
        console.log(data?.urls);
        if(data?.available === true){
            setUrlData(data?.urls);
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
    <div className='flex flex-col justify-center items-center mt-[80px] sm:text-[25px] text-[15px] font-bold bg-white'>
      <h1 className='mb-[100px]'>
        Analytics of Zipped url
      </h1>
      {
        loading ?
            <RotatingLines
                strokeColor="grey"
                strokeWidth="3"
                animationDuration="1"
                width={isMobileView ? "24" : "46"}
                visible={true}
            />
        :
            urlData === null 
            ?
                <>
                    <div className='sm:text-[20px] text-[12px] flex flex-col items-center font-bold'>
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
                        <div className='sm:text-[20px] text-[12px] sm:w-full w-[350px] font-bold'>
                            <Link href={urlData.url}>
                                <p>Long url: <span className='text-[#5d79e9] '> {sliceURL(urlData.url)} </span></p>
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


