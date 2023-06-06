'use client'
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

const Analytics = (query:string) => {

    const [urlData, setUrlData] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUrlData = async () => {
        setLoading(true);
        const {data: URL, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', query)
        .single();

        if(URL){
            setUrlData(URL);
            setLoading(false);
        }
        else{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUrlData();
    }, []);
  return (
    <div className='flex flex-col justify-center items-center mt-[80px] text-[25px] font-bold'>
      <h1>
        Analytics of Zipped url
      </h1>
      {
        loading ?
            <RotatingLines
                strokeColor="grey"
                strokeWidth="3"
                animationDuration="1"
                width="26"
                visible={true}
            />
        :
            urlData 
            ?
                <>
                    <p>Long url: {urlData.url}</p>
                    <p>Short url: {urlData.short_url}</p>
                    <p>Number of clicks: {urlData.clicks}</p>
                    <p>Created at: {urlData.created_at}</p>
                </>
            :
                <>
                    <p>Zipped url not found</p>
                    <Link href={'/search'}>
                        <p>Get analytics for other url</p>
                    </Link>
                </>
      }
    </div>
  )
}

export default Analytics
