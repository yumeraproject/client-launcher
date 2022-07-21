import React from 'react';
import { HStack, Heading, Text, Button } from '@chakra-ui/react';
import TerminalCursor from '../TerminalCursor';
import { BsPlayFill, BsFillGearFill } from 'react-icons/bs'

const HomeHero = () => {
    const launchGame = () => {
        window.api.launch();
    }
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
                <Button
                    leftIcon={<BsPlayFill />}
                    bgColor='primary.100'
                    shadow='primaryGlow'
                    _hover={{
                        bgColor: 'primary.200'
                    }}
                    _active={{
                        bgColor: 'primary.300'
                    }}
                    onClick={launchGame}
                >
                    Launch Game
                </Button>
                <Button leftIcon={<BsFillGearFill />}>
                    Config
                </Button>
            </HStack>
        </>
    )
}

export default HomeHero;