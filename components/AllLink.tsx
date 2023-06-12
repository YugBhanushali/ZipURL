'use client'

import { UrlContext } from '@/Context/UrlContext';
import React, { use, useContext, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ShortLink from './ShortLink';
import { RotatingLines } from 'react-loader-spinner';
import { getURLs } from '@/utils/localStorage';
import { el } from 'date-fns/locale';

const AllLink = () => {

    const {urlData, setUrlData,resultLoading,setResultLoading} = useContext<any>(UrlContext);

    const fetchData = () => {
      let temp = getURLs().reverse();
      if(temp){
        setUrlData(temp);
      }
      else{
        setUrlData([]);
      }
    }

    useEffect(() => {      
      fetchData();
    }, [urlData,resultLoading]);

  return (
    <div>
      {resultLoading === true ?
        <div className='mt-[40px] flex justify-center items-center'>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="1"
            width="36"
            visible={true}
          />
        </div>
      : 
      <>
        <AnimatePresence>
          <motion.div
            className='mt-[40px] flex flex-col justify-center items-center'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
          >
            {
              ( urlData &&
                urlData.map((eachUrl:any)=>{
                  return(
                    <motion.div
                      key={eachUrl.short_url}
                      initial={{ opacity: 0, y: -50, scale: 0.3 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 100, scale: 0.5 }}
                      transition={{ duration: 0.5 ,type:'spring', stiffness: 50}}
                      style={{ listStyle: "none" }}
                    >
                      <ShortLink shortUrl={eachUrl.short_url} longUrl={eachUrl.url} key={eachUrl.short_url}/>
                    </motion.div>
                  )
                })
              )
            }
          </motion.div>
          </AnimatePresence>
        </>
      }
    </div>
  )
}

export default AllLink
