'use client'

import TagLines from '@/components/TagLines';
import { supabase } from '@/utils/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import isUrl from 'is-url';
import { ChakraProvider, CheckboxIcon, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useToast } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';
import { CheckIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import InfoPopover from '@/components/InfoPopover';
import ShortLink from '@/components/ShortLink';



export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [currentUrlData, setCurrentUrlData] = useState<urlData>();
  const [outlineCheck, setOutlineCheck] = useState('none');
  const [availableColour, setAvailableColour] = useState<string>('none');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
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
      short_url: `${availableColour === 'none' ? ((shortUrl==='' || shortUrl.length >=10) ? nanoid(7) : shortUrl) : nanoid(7)}`,
      created_at: new Date(),
      clicks:0
    }

    try {

      if(urlValidation(longUrl)){
        const store = await supabase
        .from('URLs')
        .insert([
          url1
        ])
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
    } catch (error) {
      console.error(error);
    }
  };


  const checkAvailableName = async (name:string) => {
    
    setLoading(true);
    try {
      let { data: URLs, error } = await supabase
      .from('URLs')
      .select('*')
      .eq('short_url', name)
      .single();

      if(URLs){
        setAvailableColour('red');
        console.log(URLs,'URLs');
      }
      else{
        setAvailableColour('none');
        console.log(URLs,'URLs');
      }
      setLoading(false);
      

    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(shortUrl.length === 0){
      setInitialLoad(true);
    }
    else{
      setInitialLoad(false);
    }
    checkAvailableName(shortUrl);
    urlValidation(longUrl);
  }, [longUrl,outlineCheck,shortUrl]);
    
  return (
    <ChakraProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
                  onChange={(e) => setShortUrl(e.target.value)}
                  roundedLeft={'none'}
                  />
                <InputRightElement>
                {
                initialLoad === true
                ?
                  <></>
                :
                  loading === true
                  ? 
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="3"
                      animationDuration="1"
                      width="26"
                      visible={true}
                    />
                  :
                    availableColour === 'none' ?
                    <CheckIcon color={'green.400'} />
                    :
                    <CloseIcon color={'red.400'} />
                }
                </InputRightElement>
              </InputGroup>
            </div>
          </div>

          {/* <InfoIcon color={'black'} className='ml-2' h={'15px'} w={'15px'} /> */}
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
        <div className='mt-[30px] flex justify-center items-center'>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="1"
            width="26"
            visible={true}
          />
        </div>
      :
        currentUrlData && (
          <ShortLink shortUrl={currentUrlData.short_url} />
        )
      }

    </div>
    </main>
    </ChakraProvider>
  )
}
