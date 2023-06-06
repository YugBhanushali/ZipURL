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
    <div className=' mt-7 flex text-[20px] justify-center items-center'>
        <div className='flex'>
            <h2 className='font-bold'>Your zipped url:</h2>
            <Link target='_blank' href={`http://localhost:3000/${shortUrl}`}>
            <p className='font-bold text-green-500'>{`http://localhost:3000/${shortUrl}`}</p>
            </Link>
        </div>
        <div>
            <CopyIcon
                h={'23px'}
                w={'23px'}
                ml={'25px'}
                color={'black'}
                className='ml-2 cursor-pointer'
                    onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
                        toast({
                            title: "Copied",
                            description: "Your zipped url has been copied",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: 'top'
                        })
                    }
                }
            />
        </div>

        <div>
            <Link target='_blank' href={`http://localhost:3000/stats?shorturl=${shortUrl}`}>
                <IoStatsChart 
                    height={'23px'}
                    width={'23px'}
                    color='black'
                    className='ml-[10px] cursor-pointer'
                />
            </Link>
        </div>
    </div>
  )
}



export default ShortLink
