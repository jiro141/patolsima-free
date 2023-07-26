import { Button, CloseButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import FacturaTerceros from 'views/Dashboard/Facturacion/components/FacturaTerceros'

export default function ModalFctTerceros({study,showModal,toggleModal,setShowModal,setFinishFactTerceros}) {
  return (
    <Modal
   size={"lg"}
   
    maxWidth='100%'
  // size='5xl'
    isOpen={showModal}
    onClose={toggleModal}
    >
    <ModalOverlay />
    <ModalContent bg="#ffff" borderRadius={"20px"}>
        <ModalHeader>
            <Button
                borderRadius={'50%'}
                colorScheme="blue"
                width="40px"
                height="40px"
                marginLeft={'92%'}
                marginTop={'-60px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={toggleModal}>
                <CloseButton />
            </Button>
        </ModalHeader>
        <ModalBody>
            <FacturaTerceros study={study} setShowModal={setShowModal} setFinishFactTerceros={setFinishFactTerceros}/>
        </ModalBody>
    </ModalContent>
</Modal>
  )
}
