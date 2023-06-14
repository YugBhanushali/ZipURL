'use client'
import React, { useEffect, useState } from 'react'
import isUrl from 'is-url';
import { ChakraProvider, useToast,useMediaQuery } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { URL_OF_WEBSITE } from '@/utils/constants';
import Image from 'next/image';
import { sliceURL } from '@/utils/Functions';


export default function Home() {
    const [shortLink, setShortLink] = useState('');
    const [urlCheck, setUrlCheck] = useState<boolean>(true);
    const [urlData, setUrlData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const toast = useToast();
    const [isMobileView] = useMediaQuery('(max-width: 768px)');



    const urlValidation = (url:string) => {
        if(url.length === 0) {
            setUrlCheck(true);
            return false;
        }
        if (isUrl(url)) {            
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
        const tempShortLink = new URL(shortLink).pathname.split('/')[1];
        console.log(tempShortLink);
        const res = await fetch(`${URL_OF_WEBSITE}api/url?search=${tempShortLink}`);

        const data = await res.json();
        console.log(data?.urls);
        if(data?.available === true){
            setUrlData(data?.urls);
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
            <h1 className='sm:text-[25px] text-[14px] font-bold mb-[70px]'>Analytics of Zipped URL</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex sm:flex-row flex-col sm:justify-center sm:items-center '>
                        <div className='flex'>
                            <input
                                type="url"
                                value={shortLink}
                                onChange={(e) => setShortLink(e.target.value)}
                                className={`sm:w-[499px] sm:h-[40px] w-[250px] h-[30px] sm:text-[16px] text-[12px] bg-white px-4 py-2 focus:outline-4 focus:outline-offset-[2px] ${urlCheck  ? `focus:outline-[#007dfa99]` : `focus:outline-red-500`} focus:outline border-none`}
                                style={{
                                    boxShadow:'0px 0.5px 8px -1px #000000',
                                    borderRadius:'10px',
                                }}
                                placeholder='https://localhost:3000/github'
                                required
                            />
                        </div>
                        {/* <button type='submit' className='ml-4 h-[44px] bg-[#007dfa] text-white px-4 py-2 rounded-[10px]'>Get Analytics</button> */}
                        <div className='flex mt-[30px] sm:mt-2 justify-center items-center'>
                            <button type="submit" className="text-black flex items-center  hover:text-white border-2 border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-[11px] sm:text-[16px] px-5 py-1.5 text-center sm:ml-4 mb-2 dark:border-gray-600 dark:text-black dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                                {/* <Image src={LinkLogo} alt="zip it"  width={isMobileView ? 14 : 20} height={isMobileView ? 14 : 20} className='mr-2'/> */}
                                Get Analytics
                            </button>
          
                        </div>
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
                                        width={isMobileView ? "24" : "46"}
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
                                            <div className='sm:text-[20px] font-bold text-[13px] '>
                                                <Link href={urlData.url}>
                                                    <p>Long url: <span className='text-[#5d79e9]'> {sliceURL(urlData.url)} </span></p>
                                                </Link>
                                                <Link href={`${URL_OF_WEBSITE}${urlData.short_url}`}>
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


