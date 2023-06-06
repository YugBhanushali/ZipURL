
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const NameLoading = (loadingState:string) => {

  return (
    <>
        {
            loadingState === 'none'
            ? 
                <div></div>
            : 
                loadingState === 'loading'
                ? 
                    <RotatingLines
                            strokeColor="grey"
                            strokeWidth="3"
                            animationDuration="1"
                            width="26"
                            visible={true}
                    />
                :
                    loadingState === 'right'
                    ?
                        <CheckIcon color={'green.400'} />
                    :
                        <CloseIcon h={'12px'} w={'12px'} color={'red.400'} />
        }
    </>
  )
}

export default NameLoading
