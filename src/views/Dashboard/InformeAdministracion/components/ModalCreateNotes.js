import { Button, CloseButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import ModalDescripcion from './ModalDescripcion'

export default function ModalCreateNotes({ showModal, toggleModal, titulo, informeDetail, idStudy, type, setInformeDetail, setShowModalGeneral }) {
    return (
        <Modal
            size={'lg'}
            minW={'900px'}
            isOpen={showModal}
            onClose={toggleModal}>
            <ModalOverlay />
            <ModalContent borderRadius={'20px'} bg="#ffff">
                <ModalHeader>
                    <Button
                        borderRadius={'50%'}
                        colorScheme="blue"
                        width="40px"
                        height="40px"
                        marginLeft={'95%'}
                        marginTop={'-60px'}
                        bgColor={'#137797'}
                        color='#ffff'
                        onClick={toggleModal}>
                        <CloseButton />
                    </Button>
                </ModalHeader>
                <ModalBody>
                    {
                        <ModalDescripcion setShowModalGeneral={setShowModalGeneral} titulo={titulo} informeDetail={informeDetail} idStudy={idStudy} type={type} setInformeDetail={setInformeDetail} />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
