import React, { useEffect, useState } from 'react';
import { GridItem, Heading, Box, useColorModeValue, VStack, Text, HStack, Button } from '@chakra-ui/react';
import { FaCodeBranch, FaDiscord, FaGlobe, FaLink, FaTicketAlt } from 'react-icons/fa';

const AboutTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    const [versions, setVersions] = useState({
        launcher: null,
        electron: null,
        node: null
    });

    useEffect(() => {
        window.api.fetchVersions().then((versions) => {
            setVersions(versions);
        })
    })

    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' as='i' color='dark.100'>INFORMATION</Heading>
            <Box mt={2} bg={backgroundColor} p={2} rounded='md' h='188px'>
                <Box bg={useColorModeValue('gray.100', 'dark.200')} p={3} rounded='md' shadow='md'>
                    <VStack alignItems='left' spacing={3}>
                        <VStack alignItems='left' spacing={1}>
                            <HStack>
                                <FaCodeBranch fontSize='14px'/>
                                <Heading size='xs'>Version</Heading>
                            </HStack>
                            <Box bg={useColorModeValue('gray.200', 'dark.300')} py={2} px={5} rounded='md'>
                                <Text fontSize='sm'>Launcher v{versions.launcher}</Text>
                                <Text fontSize='xs'>{`Electron v${versions.electron} | Node v${versions.node}`}</Text>
                            </Box>
                        </VStack>
                        <VStack alignItems='left' spacing={1}>
                            <HStack>
                                <FaLink fontSize='13px' /> 
                                <Heading size='xs'>Links</Heading>
                            </HStack>
                            <Box bg={useColorModeValue('gray.200', 'dark.300')} py={2} px={5} rounded='md'>
                                <HStack>
                                    <Button size='xs' leftIcon={<FaGlobe />} 
                                    _hover={{ bg: 'primary.100', color: 'gray.100', shadow: useColorModeValue('', 'primaryGlow') }}
                                    _active={{ bg: 'primary.200' }}
                                    >Website</Button>
                                    <Button size='xs' leftIcon={<FaTicketAlt />} 
                                    _hover={{ bg: 'primary.100', color: 'gray.100', shadow: useColorModeValue('', 'primaryGlow') }}
                                    _active={{ bg: 'primary.200' }}
                                    >Support</Button>
                                    <Button size='xs' leftIcon={<FaDiscord />} 
                                    _active={{ bg: 'primary.200' }}
                                    _hover={{ bg: 'primary.100', color: 'gray.100', shadow: useColorModeValue('', 'primaryGlow') }}
                                    >Discord</Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </VStack>
                </Box>
            </Box>
        </GridItem>
    )
}

export default AboutTile;