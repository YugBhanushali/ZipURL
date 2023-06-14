
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { RotatingLines } from 'react-loader-spinner'
import { is } from 'date-fns/locale'
import RotatingLinesAnimation from './ui/RotatingLinesAnimation'

const NameLoading = (loadingState:string) => {
    const [isMobileView] = useMediaQuery("(max-width: 768px)")
  return (
    <div className='flex items-center'>
        {
            loadingState === 'none'
            ? 
                <div></div>
            : 
                loadingState === 'loading'
                ? 
                    <RotatingLinesAnimation widthOfLines={isMobileView ? "15" : "26"} />
                :
                    loadingState === 'right'
                    ?
                        <CheckIcon  color={'green.400'} />
                    :
                        <CloseIcon h={'12px'} w={'12px'} color={'red.400'} />
        }
    </div>
  )
}

export default NameLoading
