import { URL_OF_WEBSITE } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ZipURL from '../public/assets/ZipURL.svg'
import LinkLogo from '../public/assets/Link.svg'
import { useMediaQuery } from '@chakra-ui/react'
import { BsGithub, BsTwitter } from 'react-icons/bs'

const Footer = () => {
    const [isMobileView] = useMediaQuery("(max-width: 568px)")
  return (
    <>
        
        <div className=" bg-white w-full mt-[100px] ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <Link className='flex items-center' href='/'>
                        <Image 
                            src={LinkLogo}
                            width={isMobileView ? 25 : 35}
                            height={isMobileView ? 25 : 35}

                            alt='logo'
                            className='mr-2'
                        />
                        
                        <Image 
                            src={ZipURL}
                            width={isMobileView ? 80 : 100}
                            height={isMobileView ? 80 : 100}
                            alt='logo'
                            className='mr-2'
                        />
                </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                        <a href="/stats/search" className="text-sm text-gray-500 hover:text-gray-900 ">
                            <div>
                                <h2 className="link link-underline link-underline-black mb-6 text-sm font-semibold text-gray-900 uppercase ">Analytics</h2>
                            </div>
                        </a>
                    <div>
                    <a href="mailto:yug.h.bhanushali1@gmail.com" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400">
                        <h2 className="link link-underline link-underline-black mb-6 text-sm font-semibold text-gray-900 uppercase ">Feedback</h2>
                    </a>
                    </div>
                </div>
            </div>
            <hr className="my-[10px] border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center ">© {(new Date).getFullYear()} <Link href={URL_OF_WEBSITE} className="hover:underline">ZipURL</Link>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href='https://twitter.com/TheYug03' className="text-gray-500 hover:[text-gray-900] dark:hover:text-white">
                        <BsTwitter className="sm:w-8 w-5 sm:h-8 h-5 text-[#000000] hover:text-[#1DA1F2]" />
                    </a>
                    <a href={`https://github.com/YugBhanushali/url-shortner`} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <BsGithub className="sm:w-8 w-5 sm:h-8 h-5" color='#000000' />
                    </a>
                </div>
            </div>
            </div>
        </div>

    </>
  )
}

export default Footer
