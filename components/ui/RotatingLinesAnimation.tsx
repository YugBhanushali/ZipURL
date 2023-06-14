import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const RotatingLinesAnimation = ({widthOfLines}:{widthOfLines:string}) => {
  return (
    <>
      <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="1"
            width={widthOfLines}
            visible={true}
       />
    </>
  )
}

export default RotatingLinesAnimation
