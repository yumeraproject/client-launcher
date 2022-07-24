import React, { useState } from 'react';
import { HStack, Heading, Text, VStack, Box, useColorModeValue, useToast, useDisclosure, Progress, ScaleFade } from '@chakra-ui/react';
import TerminalCursor from '../TerminalCursor';
import LaunchButton from './buttons/LaunchButton';
import RunningButton from './buttons/RunningButton';
import MedievalBackground from '../../images/backgrounds/Medieval.png';
import ErrorButton from './buttons/ErrorButton';
import ErrorModal from '../ErrorModal';
import ConfigButton from './buttons/ConfigButton';

const HomeHero = () => {
    const toast = useToast();
    const [isLaunching, setLaunching] = useState(false);
    const [isRunning, setRunning] = useState(false);
    const [error, setError] = useState(false);

    const [progress, setProgress] = useState({
        percentage: null,
        step: null
    });

    window.ipc.on('progress', (event, progress) => {
        setProgress(progress);
    });

    const handleError = (launch, error) => {
        setError(`${`Failed to ${launch ? 'launch' : 'close'} client at: ` + error}`);
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
                    setProgress({
                        percentage: 0,
                        step: null
                    });
                } else {
                    handleError(false, status);
                }
            })
    };

    window.ipc.on('clientQuit', () => {
        setRunning(false);
        setLaunching(false);
        setProgress({
            percentage: 0,
            step: null
        });
    });

    // Modal that displays error details
    const { isOpen, onOpen, onClose } = useDisclosure();

    const displayError = () => {
        onOpen();
    };

    return (
        <>
            {/* Modal that displays error details */}
            <ErrorModal isOpen={isOpen} onClose={onClose} errorMessage={error} errorState={setError} progressState={setProgress} />
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
                        <ConfigButton />
                        {
                            error ? (
                                <ErrorButton displayError={displayError} />
                            ) : isRunning ? (
                                <RunningButton closeGame={closeGame} />
                            ) : (
                                <LaunchButton isLaunching={isLaunching} isOpen={isOpen} launchGame={launchGame} />
                            )
                        }
                        <ScaleFade in={progress.step !== null}>
                            {error ? (
                                <VStack pl={3} alignItems='left'>
                                    <Text as='i' letterSpacing='4px' fontSize='2xs' lineHeight='0px' textTransform='uppercase' color='gray.100'>Failed</Text>
                                    <Text lineHeight='15px' pb={1}>Error while {progress.step}</Text>
                                    <Progress value={progress.percentage} size='sm' width='200px' rounded='md' colorScheme='red' />
                                </VStack>
                            ) : (
                                <VStack pl={3} alignItems='left'>
                                    <Text as='i' letterSpacing='4px' fontSize='2xs' lineHeight='0px' textTransform='uppercase' color='gray.100'>Launching</Text>
                                    <Text lineHeight='15px' pb={1}>{progress.step ? progress.step : 'Closing Game'}</Text>
                                    <Progress value={progress.percentage} size='sm' width='200px' rounded='md' colorScheme={progress.percentage === 100 ? 'green' : 'gray'} />
                                </VStack>
                            )}
                        </ScaleFade>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default HomeHero;