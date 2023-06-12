'use client'

import TagLines from '@/components/TagLines';
import { nanoid } from 'nanoid';
import { use, useCallback, useEffect, useState } from 'react';
import isUrl from 'is-url';
import { ChakraProvider, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import InfoPopover from '@/components/InfoPopover';
import NameLoading from '@/components/NameLoading';
import { debounce } from '@/utils/Functions';
import Animation from '@/components/Animation';
import { getURLs, setURLs } from '@/utils/localStorage';
import { UrlContext } from '@/Context/UrlContext';
import AllLink from '@/components/AllLink';



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
          setLoading('none');
          toast({
            title: `URL Zipped successfully`,
            status: 'success',
            isClosable: true,
            duration: 3000,
            position: 'top'
          });
          // adding info to local storage
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


  const checkShortUrlName = debounce((name:string) => {
    if(name.length === 0){
      setLoading('none');
    }
    else{
      setLoading('loading');
      try{
        fetch(`http://localhost:3000/api/search?url=${name}`)
            .then(res => res.json())
            .then(data => {
              if(data.available === false){
                setLoading('wrong');
              }
              else{
                setLoading('right');
              }
            });
      } catch (error) {
        console.error(error);
        }
    }
    }, 500);

    //use to make less api calls to check availability of short url
    const optimizedCheck = useCallback(debounce(checkShortUrlName), []);


  useEffect(() => {

    let tempData = getURLs().reverse();
    setUrlData(tempData);
        
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
                  onChange={(e) => {setShortUrl(e.target.value);optimizedCheck(e.target.value)}}
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
      
      <UrlContext.Provider value={{urlData,setUrlData,resultLoading,setResultLoading}}>
        <AllLink/>
      </UrlContext.Provider>
      
      {/* animation component */}
      <Animation/>

    </div>
    </main>
    </ChakraProvider>
  )
}
