import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Box, Text, useColorModeValue } from '@chakra-ui/react';
import CopyButton from './CopyButton';

const ErrorModal = ({ isOpen, onClose, errorMessage, errorState, progressState }) => {

    const closeModal = () => {
        errorState(false);
        onClose();
        progressState({
            percentage: null,
            step: null
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnEsc={false} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent background={useColorModeValue('gray.200', 'dark.400')}>
                <ModalHeader>Launcher Error</ModalHeader>
                <ModalBody>
                    <Text letterSpacing={3} color='dark.100' fontSize='sm' as='i' fontFamily={'Roboto'} fontWeight='bold'>DETAILS</Text>
                    <Box background={useColorModeValue('gray.100', 'dark.300')} m={1} p={3} rounded='lg' fontSize='sm'>
                        {
                            (errorMessage.length > 300) ?
                                errorMessage.substr(0, 300) + '... ' : errorMessage
                        }
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={closeModal}>
                        Close
                    </Button>
                    <CopyButton text={errorMessage} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ErrorModal;