'use client'

import { UrlContext } from '@/Context/UrlContext';
import { removeURL } from '@/utils/localStorage';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Toast, useDisclosure, useToast,useMediaQuery } from '@chakra-ui/react'
import { is } from 'date-fns/locale';
import React, {useContext, useEffect } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md';

const ModalComp = ({shortUrl}:{shortUrl:string}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {urlData, setUrlData, resultLoading, setResultLoading} = useContext<any>(UrlContext);
  const [isMobileView] = useMediaQuery("(max-width: 768px)");
  const toast = useToast();
  const handleDelete = async () => {
      setResultLoading(true);
      const res = await fetch(`http://localhost:3000/api/url/?short_url=${shortUrl}`,{
        method:'DELETE',
      });
      const data = await res.json();

      let tempUrls = removeURL(shortUrl);
      toast({
        title: `URL Deleted successfully`,
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top'
      });
      setUrlData(tempUrls);
      setResultLoading(false);
}

  useEffect(() => {
  }, [urlData])
  return (
    <>
      <MdOutlineDeleteOutline
          height={isMobileView ? '10px' : '28px'}
          width={isMobileView ? '10px' : '28px'}
          color='black'
          className='cursor-pointer sm:h-[28px] sm:w-[28px] h-[14px] w-[14px]'
          onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Delete Short URL
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>
            Are you sure you want to delete the given short url?
           </p>
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'center'}>
            <Button colorScheme='gray' _hover={{bg:"#EE8675"}} mr={3} onClick={()=>{
              handleDelete();
              onClose();
            }}>
              Yes
            </Button>
            <Button colorScheme='gray' _hover={{bg:"#C0E89C"}} onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalComp
