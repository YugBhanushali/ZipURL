'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {GrProductHunt} from 'react-icons/gr'
import { SiBuymeacoffee } from 'react-icons/si'
import zipgif from '../public/assets/zipgif.gif'
import ZipURL from '../public/assets/ZipURL.svg'
import LinkLogo from '../public/assets/Link.svg'
import { useMediaQuery } from '@chakra-ui/react'
import { is } from 'date-fns/locale'

const Navbar = () => {
    const isMobileView = useMediaQuery("(max-width: 768px)")

  return (
    <div className='flex justify-center items-center'>
        <div className="flex justify-between items-center w-[97%] p-3 mt-2 rounded-lg">
            <div className="flex items-center justify-center">
                <Link className='flex items-center justify-center' href='/'>
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
            <div className="flex items-center space-x-3">
                <div className="flex items-center">
                    <GrProductHunt className="text-3xl"/>
                </div>

                <div className="flex items-center">
                    <SiBuymeacoffee className="text-3xl"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
