'use client'

import { URL_OF_WEBSITE } from '@/utils/constants';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseDisclosureProps, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { sliceURL } from '@/utils/Functions';
import LoadingDots from './LoadingDots';


const AnalyticsModal = (
    {   shortUrl , 
        children,
        isOpen=false ,
        onOpen=()=>{} , 
        onClose = ()=>{}
    }:
    {   shortUrl:string,
        children:React.ReactNode,
        isOpen:boolean,
        onOpen:UseDisclosureProps['onOpen'],
        onClose:UseDisclosureProps['onClose'],
    }) => {


    const [urlData, setUrlData] = React.useState<any>('');
    const [resultLoading, setResultLoading] = React.useState<boolean>(false);
    const [isMobileView] = useMediaQuery("(max-width: 768px)");

    const fetchUrlData = async (search:string) => {

        const res = await fetch(`${URL_OF_WEBSITE}api/url?search=${search}`);

        const data = await res.json();
        console.log(data?.urls);
        if(data?.available === true){
            setUrlData(data?.urls);
        }
        else{
            setUrlData(null);
        }
        setResultLoading(false);
    }

    useEffect(() => {

        if(isOpen){
            setResultLoading(true);
            fetchUrlData(shortUrl);
        }

    }, [isOpen]);


  return (
    <>

      {children}

      <Modal size={'xl'}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'} fontSize={isMobileView ? '14px' : '22px'} textAlign={'center'} alignContent={'center'} marginBottom={'10'}>
            Analytics of Short URL
            <hr className='mt-2 h-[2px] border-[#a5a5a5] ' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody alignContent={'center'} textAlign={'center'}>
           {
                resultLoading
                ?
                    <div className='flex justify-center items-center'>
                        <LoadingDots color='black' />
                    </div>
                :

                    urlData === null 
                    ?
                        <>
                            <div className='sm:text-[20px] text-[12px] flex flex-col items-center font-bold'>
                                <p>Zipped url not found. Try again</p>
                                <Link href={'/stats/search'} target='_blank'>
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
                                <div className='sm:text-[18px] text-[12px] sm:w-full w-[350px] font-bold'>
                                    <Link href={urlData.url} target='_blank'>
                                        <p>Long url: <span className='text-[#5d79e9] '> {sliceURL(urlData.url)} </span></p>
                                    </Link>
                                    <Link href={`http://localhost:3000/${urlData.short_url}`} target='_blank'>
                                        <p>Short url: <span className='text-[#47de8d]'> {URL_OF_WEBSITE}{urlData.short_url} </span></p>
                                    </Link>
                                    <p>Number of clicks: {urlData.clicks}</p>
                                    <p>Created {formatDistanceToNow(new Date(urlData.created_at))} ago</p>
                                </div>
                            </motion.div>
                        )
           }
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'center'}>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AnalyticsModal
