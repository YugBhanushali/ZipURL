'use client'
import { CopyIcon } from '@chakra-ui/icons'
import { useToast, useMediaQuery, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import ModalComp from './ModalComp'
import { generateRandomString, sliceURL } from '@/utils/Functions'
import QrCode from './QrCode'
import { URL_OF_WEBSITE } from '@/utils/constants'
import AnalyticsModal from './AnalyticsModal'



type Props = {
    shortUrl:string,
    longUrl:string,
}


const ShortLink = ({shortUrl,longUrl}:Props) => { 
       
    const toast = useToast();
    const [copied, setCopied] = useState(false);
    const [src, setSrc] = useState(`https://www.google.com/s2/favicons?sz=128&domain_url=${longUrl}`);
    const [isMobileView] = useMediaQuery('(max-width: 768px)');
    const [imgLoading, setImgLoading] = useState(true);

    let tempLongUrl = sliceURL(longUrl);

    const { isOpen, onOpen, onClose } = useDisclosure()

   

    //after 3 seconds, set copied to false
    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }
        , 4000)

        setSrc(`https://www.google.com/s2/favicons?sz=128&domain_url=${longUrl}`);

    }, [copied])

    
  return (
    <div className='mt-7 flex flex-row text-[20px] justify-start items-center sm:w-[550px] w-[350px] sm:h-[89px] h-[60px] bg-[#fffdfd] border-black border-[1.5px] sm:rounded-lg rounded-[7px] shadow-xl hover:scale-105 hover:transform transition-transform'>
        <div className='flex px-4 py-1 gap-2 items-center'>
            <div className='sm:w-[53px] rounded-full sm:h-[53px] w-[33px] h-[33px] bg-gradient-to-b from-gray-300 via-teal-300 to-purple-500 border'>
                <>
                    <Image
                        src={src}
                        width={isMobileView ? 33 : 53}
                        height={isMobileView ? 33 : 53}
                        alt={'url'}
                        className={`rounded-full bg-white flex justify-center items-center ${imgLoading ? ' blur-lg' : ''} }`}
                        onLoad={()=>{
                            setImgLoading(false);
                        }}
                        onErrorCapture={()=>{
                            setSrc(`https://avatar.vercel.sh/${generateRandomString(7)}`);
                        }}
                    />
                </>
            </div>
            {/* for url images */}
            <div>
                <Link target='_blank' href={`${URL_OF_WEBSITE}${shortUrl}`}>
                    <p className='font-bold text-[black] sm:text-[17px] text-[11px]'>{`zipurl.vercel.app/${shortUrl}`}</p>
                </Link>
                <Link target='_blank' href={`${longUrl}`}>
                    <p className='font-bold text-[#12120E4D] sm:text-[12px] text-[8px]'>{`${tempLongUrl}`}</p>
                </Link>
            </div>
        </div>
        <div className='gap-2 flex flex-row justify-end w-full h-full '>
            <div className='flex flex-col justify-center items-center sm:gap-1 gap-[3px] sm:mr-[6px] mr-[3px]'>
                <div className='flex sm:gap-2 gap-1'>
                    <div className='h-[25px] w-[25px] sm:w-[37px] sm:h-[37px] sm:rounded-md rounded-[4px] cursor-pointer bg-[#e9e6e6] flex justify-center items-center hover:scale-[1.1] hover:bg-green-200'>
                        { copied ? <BsCheckLg
                            height={isMobileView ? '10px' : '13px'}
                            width={isMobileView ? '10px' : '13px'}
                            color='black'
                            className='cursor-pointer'
                        /> :
                            <CopyIcon
                                h={isMobileView ? '11px' : '18px'}
                                w={isMobileView ? '11px' : '18px'}
                                color={'black'}
                                className='cursor-pointer'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${URL_OF_WEBSITE}${shortUrl}`)
                                    toast({
                                        title: "Copied",
                                        description: "Your zipped url has been copied",
                                        status: "success",
                                        duration: 5000,
                                        isClosable: true,
                                        position: 'top'
                                    })
                                    setCopied(true)
                                }
                                }
                            />
                        }
                    </div>
                    <div className='h-[25px] w-[25px] sm:w-[37px] sm:h-[37px] sm:rounded-md rounded-[4px] cursor-pointer bg-[#e9e6e6] flex justify-center items-center hover:scale-[1.1] hover:bg-green-200'>
                        <AnalyticsModal
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            shortUrl={shortUrl}
                        >
                            <IoStatsChart
                                height={isMobileView ? '11px' : '13px'}
                                width={isMobileView ? '11px' : '13px'}
                                color='black'
                                className='cursor-pointer h-[13px] w-[13px] sm:h-[17px] sm:w-[17px]'
                                onClick={() => {
                                    onOpen();
                                }
                                }
                            />
                        </AnalyticsModal>
                    </div>
                </div>
                <div className='flex sm:gap-2 gap-1'>
                    <div className='h-[25px] w-[25px] sm:w-[37px] sm:h-[37px] sm:rounded-md rounded-[4px] cursor-pointer bg-[#e9e6e6] flex justify-center items-center hover:scale-[1.1] hover:bg-blue-200'>
                        <QrCode shortUrl={shortUrl}/>
                    </div>
                    
                    <div className='h-[25px] w-[25px] sm:w-[37px] sm:h-[37px] sm:rounded-md rounded-[4px] cursor-pointer bg-[#e9e6e6] flex justify-center items-center hover:scale-[1.1] hover:bg-red-200'>
                        <ModalComp  shortUrl={shortUrl}/>
                    </div>

                </div>
            </div>

        </div>

    </div>
  )
}



export default ShortLink
