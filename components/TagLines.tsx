'use client'
import { tagLineList } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const TagLines = () => {

    const [currentTagline, setCurrentTagline] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prevTagline) => (prevTagline + 1) % tagLineList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tagline-slider mb-[100px] sm:w-[400px] w-[300px] sm:text-[20px] text-[13px]  justify-center items-center text-center">
      <motion.p
        key={currentTagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='font-bold text-black'
      >
        {tagLineList[currentTagline]}
      </motion.p>
    </div>
  )
}

export default TagLines
