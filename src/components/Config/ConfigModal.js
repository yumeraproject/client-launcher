import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useColorModeValue, VStack } from '@chakra-ui/react';
import MemoryOption from './MemoryOption';
import LaunchDirOption from './LaunchDirOption';
import ResolutionOption from './ResolutionOption';

const ConfigModal = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent background={useColorModeValue('gray.200', 'dark.400')} overflow='hidden'>
                <ModalHeader>Game Configuration</ModalHeader>
                <ModalBody>
                    <ResolutionOption />
                    <MemoryOption />
                    <LaunchDirOption />
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