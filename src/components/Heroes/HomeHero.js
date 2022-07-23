import React, { useState } from 'react';
import { HStack, Heading, Text, Button, Box, useColorModeValue, useToast, useDisclosure } from '@chakra-ui/react';
import TerminalCursor from '../TerminalCursor';
import { BsFillGearFill } from 'react-icons/bs'
import LaunchButton from './buttons/LaunchButton';
import RunningButton from './buttons/RunningButton';
import MedievalBackground from '../../images/backgrounds/Medieval.png';
import ErrorButton from './buttons/ErrorButton';
import ErrorModal from '../ErrorModal';

const HomeHero = () => {
    const toast = useToast();
    const [isLaunching, setLaunching] = useState(false);
    const [isRunning, setRunning] = useState(false);
    const [error, setError] = useState(false);

    const handleError = (launch, error) => {
        setError(`${`Failed to ${launch ? 'launch' : 'close' } client: ` + error}`);
        toast({
            position: 'bottom',
            title: `Error ${launch ? 'launching' : 'closing'} client`,
            variant: 'error',
            status: 'error',
            duration: 5000,
        });
    };

    const launchGame = async () => {
        setLaunching(true);
        await window.api.launchClient()
        .then((status) => {
            if (status === true) {
                setRunning(true);
                setLaunching(false);
            } else {
                setLaunching(false);
                handleError(true, status);
            }
        })
    };

    const closeGame = async () => {
        await window.api.closeClient()
        .then((status) => {
            if (status === true) {
                setRunning(false);
                setLaunching(false);
            } else {
                handleError(false, status);
            }
        })
    };

    window.ipc.on('clientQuit', () => {
        setRunning(false);
        setLaunching(false);
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const displayError = () => {
        onOpen();
    };

    return (
        <>
        {/* Modal that displays error details */}
        <ErrorModal isOpen={isOpen} onClose={onClose} errorMessage={error} errorState={setError}/>
        <Box
            background={`linear-gradient(to bottom, rgba(0, 0, 0, 0.1), ${useColorModeValue('rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.55)')}), url(${MedievalBackground})`}
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            rounded='lg'
            color='white'
        >
            <Box p={5} backdropFilter='blur(1px)'>
                <HStack>
                    <Heading textTransform='uppercase' letterSpacing={3}>Hello Hamtsu</Heading>
                    <TerminalCursor />
                </HStack>
                <Text fontFamily='PROJECT SPACE'>
                    01
                </Text>
                <HStack mt={6} >
                    {
                        error ? (
                            <ErrorButton displayError={displayError} />
                        ) : isRunning ? (
                            <RunningButton closeGame={closeGame} />
                        ) : (
                            <LaunchButton isLaunching={isLaunching} isOpen={isOpen} launchGame={launchGame} />
                        )
                    }
                    <Button
                        leftIcon={<BsFillGearFill />}
                        background='whiteAlpha.200'
                        color='white'
                    >
                        Config
                    </Button>
                </HStack>
            </Box>
        </Box>
        </>
    )
}

export default HomeHero;