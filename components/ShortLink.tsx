'use client'
import { CopyIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import ModalComp from './ModalComp'
import { sliceURL } from '@/utils/Functions'

type Props = {
    shortUrl:string,
    longUrl:string,
}

const ShortLink = ({shortUrl,longUrl}:Props) => {
    const toast = useToast();
    const [copied, setCopied] = React.useState(false);
    const [src, setSrc] = React.useState(`https://www.google.com/s2/favicons?sz=128&domain_url=${longUrl}`);

    let tempLongUrl = sliceURL(longUrl);

    //after 3 seconds, set copied to false
    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }
        , 4000)
    }, [copied,src])
  return (
    <div className='mt-7 flex flex-row text-[20px] justify-start items-center w-[550px] h-[89px] bg-[#fffdfd] border-black border-[1.5px] rounded-lg shadow-xl hover:scale-105 hover:transform transition-transform' style={{}}>
        <div className='flex px-4 py-1 gap-2'>
            <div className='w-[53px] rounded-full h-[53px] bg-gradient-to-b from-gray-300 via-teal-300 to-purple-500 border '>
                {src ? 
                    <Image
                        src={src}
                        width={53}
                        height={53}
                        alt=''
                        className='rounded-full bg-white flex justify-center items-center'
                        onError={
                            () => {
                                setSrc('https://avatar.vercel.sh/www.github.com')
                            }
                        }
                    />
                    :
                    null
                }
            </div>
            {/* for url images */}
            <div>
                <Link target='_blank' href={`http://localhost:3000/${shortUrl}`}>
                    <p className='font-bold text-[black] text-[17px]'>{`zipurl.vercel.app/${shortUrl}`}</p>
                </Link>
                <Link target='_blank' href={`${longUrl}`}>
                    <p className='font-bold text-[#12120E4D] text-[12px]'>{`${tempLongUrl}`}</p>
                </Link>
            </div>
        </div>
        <div className='gap-2 flex flex-row justify-end w-full h-full'>
            <div className='flex gap-2 mt-[6px] mr-[6px]'>
                <div className='h-[37px] w-[37px] rounded-md cursor-pointer bg-[#f3f0f0] flex justify-center items-center hover:scale-[1.1] hover:bg-green-200'>
                    { copied ? <BsCheckLg
                        height={'23px'}
                        width={'23px'}
                        color='black'
                        className='cursor-pointer'
                    /> :
                        <CopyIcon
                            h={'23px'}
                            w={'23px'}
                            color={'black'}
                            className='cursor-pointer'
                            onClick={() => {
                                navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
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
                <div className='h-[37px] w-[37px] rounded-md cursor-pointer bg-[#f3f0f0] flex justify-center items-center hover:scale-[1.1] hover:bg-green-200'>
                    <Link target='_blank' href={`http://localhost:3000/stats?shorturl=${shortUrl}`}>
                        <IoStatsChart
                            height={'23px'}
                            width={'23px'}
                            color='black'
                            className='cursor-pointer'
                        />
                    </Link>
                </div>
                <div className='h-[37px] w-[37px] rounded-md cursor-pointer bg-[#f3f0f0] flex justify-center items-center hover:scale-[1.1] hover:bg-red-200'>
                    <ModalComp  shortUrl={shortUrl}/>
                </div>
            </div>

        </div>

    </div>
  )
}



export default ShortLink
