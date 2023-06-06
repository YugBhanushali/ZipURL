'use client'
import React, { useEffect, useState } from 'react'
import isUrl from 'is-url';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

export default function Home() {
    const [shortLink, setShortLink] = useState('');
    const [urlCheck, setUrlCheck] = useState<boolean>(true);
    const [urlData, setUrlData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const toast = useToast();

    const urlValidation = (url:string) => {
        if(url.length === 0) {
            setUrlCheck(true);
            return false;
        }
        if (isUrl(url)) {
            console.log(new URL(url).pathname.split('/').length);
            console.log(new URL(url).pathname.split('/'));
            
            if(new URL(url).hostname === 'localhost' && new URL(url).protocol === 'http:' && new URL(url).pathname.split('/')[1].length > 0){
                setUrlCheck(true);
            }
            else{
                setUrlCheck(false);
            }
        }
        else{
            setUrlCheck(false);
        }
    }

    const fetchUrlData = async () => {
        const {data: URLs, error} = await supabase
        .from('URLs')
        .select('*')
        .eq('short_url', new URL(shortLink).pathname.split('/')[1])
        .single();

        if(URLs){
            setUrlData(URLs);
            setLoading(false);
        }
        else{
            setLoading(false);
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!urlCheck){
            toast({
                title: "URL is valid",
                description: "Enter a valid URL to get analytics",
                status: "error",
                duration: 9000,
                isClosable: true,
                position:'top'
            })
        }
        else{
            setShowResults(true);
            setLoading(true);
            fetchUrlData();
        }
        
        setShortLink('');
    }

    useEffect(() => {
        urlValidation(shortLink);
        console.log(urlData);
    }, [shortLink, urlCheck]);
  return (
    <ChakraProvider>
        <div className='flex flex-col justify-center items-center mt-[100px]'>
            <h1 className='text-[25px] font-bold mb-[70px]'>Analytics of Zipped URL</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row justify-center items-center '>
                    <input
                        type="url"
                        value={shortLink}
                        onChange={(e) => setShortLink(e.target.value)}
                        className={`w-[499px] h-[40px] bg-white px-4 py-2 focus:outline-4 focus:outline-offset-[3px] ${urlCheck  ? `focus:outline-[#007dfa99]` : `focus:outline-red-500`} focus:outline border-none`}
                        style={{
                            boxShadow:'0px 0.5px 8px -1px #000000',
                            borderRadius:'10px',
                        }}
                        placeholder='https://localhost:3000/github'
                        required
                    />
                        <button type='submit' className='ml-4 h-[44px] bg-[#007dfa] text-white px-4 py-2 rounded-[10px]'>Get Analytics</button>
                    </div>
                </form>

                    <div className='flex flex-col justify-center items-center mt-[50px]'>
                        {
                            showResults
                            ?
                                loading ?
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="3"
                                        animationDuration="1"
                                        width="46"
                                        visible={true}
                                    />
                                :
                                    urlData !== null
                                    ?
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
                                    :
                                        <div className='text-[20px] font-bold'>
                                            <p>Zipped url not found. Try again</p>
                                        </div>
                            :
                                null
                        }
                    </div>

        </div>
    </ChakraProvider>
  )
}


