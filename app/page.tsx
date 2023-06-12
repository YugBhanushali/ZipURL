'use client'

import TagLines from '@/components/TagLines';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import isUrl from 'is-url';
import { ChakraProvider, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';
import InfoPopover from '@/components/InfoPopover';
import ShortLink from '@/components/ShortLink';
import NameLoading from '@/components/NameLoading';
import { debounce } from 'lodash'
import Animation from '@/components/Animation';
import { getURLs, setURLs } from '@/utils/localStorage';
import {AnimatePresence, motion } from 'framer-motion';
import { UrlContext } from '@/Context/UrlContext';




export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [currentUrlData, setCurrentUrlData] = useState<urlData>();
  const [outlineCheck, setOutlineCheck] = useState('none');
  const [availableColour, setAvailableColour] = useState<string>('none');
  const [loading, setLoading] = useState<string>('none');
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [urlData, setUrlData] = useState<any>([]);
  const toast = useToast();
   

  const urlValidation = (url:string) => {
    if(url.length === 0) {
      setOutlineCheck('none');
      return false; 
    }
    if (isUrl(url)) {
      if(new URL(url).hostname.split('.').length > 1 && new URL(url).hostname.split('.')[1].length > 0){
        setOutlineCheck('none');
        return true;
      }
      else{
        setOutlineCheck('4px solid red');
        return false;
      }
    } else {
      setOutlineCheck('4px solid red');
      return false;
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setResultLoading(true);
    let url1:urlData = {
      url:`${longUrl}`,
      // short_url: `${availableColour === 'none' ? ((shortUrl==='' || shortUrl.length >=10) ? nanoid(7) : shortUrl) : nanoid(7)}`,
      short_url: `${loading === 'right' ? ((shortUrl==='' || shortUrl.length >=10) ? nanoid(7) : shortUrl) : nanoid(7)}`,
      created_at: new Date(),
      clicks:0
    }

    try {

      if(urlValidation(longUrl)){
        const res = await fetch(`http://localhost:3000/api/url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url1.url,
            short_url: url1.short_url,
            created_at: url1.created_at,
            clicks: url1.clicks
          })
        });

        if(res.ok){
          const data = await res.json();
          setCurrentUrlData(url1);
          setLongUrl('');
          setShortUrl('');
          setAvailableColour('none');
          toast({
            title: `URL Zipped successfully`,
            status: 'success',
            isClosable: true,
            duration: 3000,
            position: 'top'
          });
          setURLs(url1.url,url1.short_url);
          setResultLoading(false);
        }
        else{
          toast({
            title: `Please enter a valid URL`,
            status: 'error',
            isClosable: true,
            duration: 3000,
            position: 'top'
          });
          setResultLoading(false);
        }
      }
      else{
        toast({
          title: `Please enter a valid URL`,
          status: 'error',
          isClosable: true,
          duration: 3000,
          position: 'top'
        });
        setResultLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const checkAvailableName = async (name:string) => {
    
    if(name.length === 0){
      setLoading('none');
    }
    else{
      setLoading('loading');

      try {
        const res = await fetch(`http://localhost:3000/api/search?url=${name}`);
        const {urls , available} = await res.json();
        if(available === false){
          setLoading('wrong');
        }
        else{
          setLoading('right');
        }

      } catch (error) {
        console.error(error);
      }
    }
  }

  const debounceCheckAvailableName = debounce(checkAvailableName, 500);

  useEffect(() => {

    let tempData = getURLs().reverse();
    setUrlData(tempData);
        
    debounceCheckAvailableName(shortUrl);
    urlValidation(longUrl);
  }, [longUrl,outlineCheck,shortUrl]);
    
  return (
    <ChakraProvider>
    <main className="mainpage flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col justify-center items-center'>
      <TagLines/>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className={`w-[499px] h-[40px] bg-white px-4 py-2 focus:outline-4 focus:outline-offset-[3px] ${outlineCheck === 'none' ? `focus:outline-[#007dfa99]` : `focus:outline-red-500`} focus:outline border-none`}
          style={{
            boxShadow:'0px 0.5px 8px -1px #000000',
            borderRadius:'10px',
          }}
          placeholder='https://github.com/supabase/supabase-flutter'
          required
        />
        
        
        <div className='mt-[30px] flex items-center'>
          <div 
          style={{
            boxShadow:'0px 0.5px 8px -1px #000000',
            borderRadius:'10px',
          }}
          className=' flex justify-start items-center h-[42px] bg-white border-black border-[3px]'
          >
            <div className='h-full border-r-0 border-black bg-black px-3 py-2 justify-center items-center'>
              <p className='text-white'>http://localhost:3000/</p>
            </div>
            <div className='h-full w-full flex justify-center items-center'>
              <InputGroup border={'none'} >
                <Input
                  type="text"
                  placeholder='github'
                  value={shortUrl}
                  onChange={(e) => {setShortUrl(e.target.value)}}
                  roundedLeft={'none'}
                  />
                <InputRightElement>
              
                {NameLoading(loading)}
                </InputRightElement>
              </InputGroup>
            </div>
          </div>

          <InfoPopover/>
        </div>

        <div className='mt-[30px] flex justify-center items-center'>
          <button 
            className='h-[42px] ml-4 bg-white px-3 py-2 hover:border-black border-[2px] border-black font-bold' 
            type="submit"
            style={{
              boxShadow:'0px 0.5px 8px -1px #000000',
              borderRadius:'10px',
            }}
          >
              Zip it!
          </button>
        </div>
      </form>
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
      {/* make such animation for ShortLink whick looks like all link fall from top to bottom */}
      <UrlContext.Provider value={{urlData,setUrlData,resultLoading,setResultLoading}}>
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
        </UrlContext.Provider>
        </>
      }

      <Animation/>

    </div>
    </main>
    </ChakraProvider>
  )
}
