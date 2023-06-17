'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {GrProductHunt} from 'react-icons/gr'
import ZipURL from '../public/assets/ZipURL.svg'
import LinkLogo from '../public/assets/Link.svg'
import { useMediaQuery } from '@chakra-ui/react'
import bmac from '../public/assets/bmac.png'


const Navbar = () => {
    const [isMobileView] = useMediaQuery("(max-width: 568px)")


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
                
                {/* for desktop view */}
                <div className='hidden sm:block'>
                    <a href="https://www.buymeacoffee.com/yugbhanushali" target="_blank">
                    <Image className='' width={250} height={40} src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"  style={{height:'44px', width:'170px'}} />
                    </a>
                </div>

                {/* for mobile view */}
                <div className='flex sm:hidden ml-[10px]'>
                    <a href="https://www.buymeacoffee.com/yugbhanushali" className='' target="_blank">
                        <Image src={bmac} alt="Buy Me A Coffee" className='rounded-md' style={{height:'35px', width:'35px'}} />
                    </a>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar
