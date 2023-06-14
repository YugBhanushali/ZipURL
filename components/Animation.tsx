'use client'
import React, { use, useEffect, useState } from 'react'
import { ZipURLExapmle } from '@/utils/constants';
import { motion } from 'framer-motion';
import zipgif from '../public/assets/zipgif.gif'
import Image from 'next/image';

const Animation = () => {
    const [currentZipURL, setCurrentZipURL] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentZipURL((prevZipURL) => (prevZipURL + 1) % ZipURLExapmle.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className='flex sm:flex-row flex-col justify-center items-center mt-[120px] text-[12px] sm:text-[15px] gap-2'>
        <div className='flex justify-center items-center'>
            <motion.p
                key={currentZipURL}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className='font-bold text-black'
            >
                {ZipURLExapmle[currentZipURL].longURL}
            </motion.p>
        </div>
        <div className='flex justify-center items-center'>
            <Image
                src={zipgif}
                width={40}
                height={40}
                alt='logo'
                className='mr-2'
            />
        </div>
        <div className='flex justify-center items-center'>
            <motion.p
                key={currentZipURL}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className='font-bold text-black'
            >
                {ZipURLExapmle[currentZipURL].shortURL}
            </motion.p>
        </div>
      </div>
  )
}

export default Animation
