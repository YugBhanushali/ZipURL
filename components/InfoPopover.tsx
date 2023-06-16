import { InfoIcon } from '@chakra-ui/icons'
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'
import React from 'react'

const InfoPopover = () => {
  return (
    <div>
      <Popover trigger='hover' placement='right'>
        <PopoverTrigger>
            <InfoIcon color={'black'} className='ml-2' h={'15px'} w={'15px'} />
        </PopoverTrigger>
        <Portal>
            <PopoverContent bg={'gray.700'} color='white'>
                <PopoverArrow bg={'gray.700'} />
                <PopoverHeader>For short url</PopoverHeader>
                    <PopoverBody>
                        <p>You can suggest the name for your short url but it should have max length 15</p>
                        <p>If no names are available than we will assign you random name</p>
                    </PopoverBody>
            </PopoverContent>
        </Portal>
      </Popover>
    </div>
  )
}

export default InfoPopover
