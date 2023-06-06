import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {GrProductHunt} from 'react-icons/gr'
import { SiBuymeacoffee } from 'react-icons/si'
import zipgif from '../public/assets/zipgif.gif'

const Navbar = () => {

  return (
    <div className='flex justify-center items-center'>
        <div className="flex justify-between items-center w-[97%] p-4 mt-2 rounded-lg">
            <div className="flex items-center ml-2">
                <Image 
                    src={zipgif}
                    width={40}
                    height={40}
                    alt='logo'
                    className='mr-2'
                />
                <Link href='/'>
                    <h1 className="text-3xl font-bold">ZipURL</h1>
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
