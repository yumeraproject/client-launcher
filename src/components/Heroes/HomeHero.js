import React, { useState } from 'react';
import { HStack, Heading, Text, Button } from '@chakra-ui/react';
import TerminalCursor from '../TerminalCursor';
import { BsFillGearFill } from 'react-icons/bs'
import LaunchButton from './buttons/LaunchButton';
import RunningButton from './buttons/RunningButton';

const HomeHero = () => {
    const [isLaunching, setLaunching] = useState(false);
    const [isOpen, setOpened] = useState(false);

    const launchGame = () => {
        setLaunching(true);
        window.api.launch();
    }

    window.ipc.on('launched', () => {
        setOpened(true);
        setLaunching(false);
    });

    return (
        <>
            <HStack>
                <Heading textTransform='uppercase' letterSpacing={3}>Hello Hamtsu</Heading>
                <TerminalCursor />
            </HStack>
            <Text fontFamily='PROJECT SPACE'>
                01
            </Text>
            <HStack mt={6} >
                {isOpen ? (
                    <RunningButton />
                ) : (
                    <LaunchButton isLaunching={isLaunching} isOpen={isOpen} launchGame={launchGame} />
                )}
                <Button leftIcon={<BsFillGearFill />}>
                    Config
                </Button>
            </HStack>
        </>
    )
}

export default HomeHero;