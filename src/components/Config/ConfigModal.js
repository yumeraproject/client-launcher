import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Box, Text, useColorModeValue } from '@chakra-ui/react';
import MemoryOption from './MemoryOption';

const ConfigModal = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent background={useColorModeValue('gray.200', 'dark.400')}>
                <ModalHeader>Game Configuration</ModalHeader>
                <ModalBody>
                    <MemoryOption />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfigModal;