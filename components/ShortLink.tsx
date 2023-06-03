import { CopyIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { IoStatsChart } from 'react-icons/io5'

type Props = {
    shortUrl:string
}

const ShortLink = ({shortUrl}:Props) => {
    const toast = useToast();
  return (
    <div className=' mt-7 flex text-[20px]'>
        <h2 className='font-bold'>Your zipped url:</h2>
        <Link href={`http://localhost:3000/${shortUrl}`}>
        <p className='font-bold text-green-500'>{`http://localhost:3000/${shortUrl}`}</p>
        </Link>
        <CopyIcon
            className='ml-2 cursor-pointer'
                onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
                    toast({
                        title: "Copied",
                        description: "Your zipped url has been copied to your clipboard.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    })
                }
            }
        />
        <Link href={`http://localhost:3000/stats?shorturl=${shortUrl}`}>
            <IoStatsChart className='ml-2 cursor-pointer'/>
        </Link>
    </div>
  )
}



export default ShortLink
