import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { QRCodeCanvas} from 'qrcode.react';
import React from 'react'
import {BsQrCodeScan} from 'react-icons/bs'
import { saveAs } from 'file-saver';
import {IoMdDownload} from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion';


const QrCode = ({shortUrl}:{shortUrl:string}) => {

  const toast = useToast();

  const handleQRCodeDownload = async () => {
    const canvas = document.getElementById('qrCode') as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    saveAs(pngUrl, 'qr-code.png');
    toast({
      title: `QR Code Downloaded successfully`,
      status: 'success',
      isClosable: true,
      duration: 2000,
      position: 'top'
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <BsQrCodeScan
        className='sm:w-[24px] sm:h-[24px] w-[12px] h-[12px] text-[#000000]'
        onClick={onOpen}
      />

<AnimatePresence>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            QR Code for Short URL
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                  type: "spring", stiffness: 100
                }}
              >
                <div className='m-[30px]'>
                  <QRCodeCanvas 
                    id='qrCode'
                    value={String(shortUrl)}
                    size={256}
                    style={{
                      margin:'auto',
                    }}
                    includeMargin={true}
                  />
                </div>

              </motion.div>
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'center'}>
            <div>
              <Button colorScheme='gray' _hover={{bg:"#C0E89C"}} mr={3} onClick={()=>{
                onClose();
                handleQRCodeDownload();
              }}>
                <IoMdDownload className='w-[23px] h-[23px] mr-2 text-[#000000]'/>
                Download
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </AnimatePresence>
    </>
  )
}

export default QrCode
