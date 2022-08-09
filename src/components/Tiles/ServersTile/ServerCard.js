import React, { useEffect, useState } from 'react';
import { Box, useColorModeValue, VStack, Image, Heading, Text, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaPlay, FaCheckCircle } from 'react-icons/fa';

const ServerCard = ({ name, address, icon, selectedServer, setSelectedServer }) => {
    const [isSelectedServer, setIsSelectedServer] = useState(false);
    const borderColor = useColorModeValue('gray.300', 'dark.200');

    useEffect(() => {
        if (selectedServer === address) {
            setIsSelectedServer(true)
        } else {
            setIsSelectedServer(false)
        }
    }, [address, selectedServer])

    const updateLaunchServer = (status, address) => {
        if (status) {
            setSelectedServer(address);
        } else {
            setSelectedServer(null);
        }

        window.api.setLaunchServer(status, address);
    }

    return (
        <Box m={1} rounded='md' bg={useColorModeValue('gray.300', 'dark.200')} shadow='md' overflow='hidden' border={'1px'} borderColor={isSelectedServer ? 'success.200' : borderColor}>
            <VStack spacing={0}>
                <HStack py={2}>
                    <Image src={icon} alt={name} rounded='md' h='40px' />
                    {isSelectedServer ? (
                        <Tooltip hasArrow label={`Selected ${address}`} bg='dark.100' color='gray.200' rounded='lg' placement='top'>
                            <IconButton
                                icon={<FaCheckCircle />}
                                size='sm'
                                aria-label={`Deselect ${address}`}
                                bgColor='success.100-T'
                                shadow='successGlow'
                                color='white'
                                _hover={{
                                    bgColor: 'success.200-T'
                                }}
                                onClick={() => {
                                    updateLaunchServer(false, address);
                                }} />
                        </Tooltip>
                    ) : (
                        <Tooltip hasArrow label={`Launch ${address}`} bg='dark.100' color='gray.200' rounded='lg' placement='top'>
                            <IconButton icon={<FaPlay />} size='sm' aria-label={`Launch ${address}`} onClick={() => updateLaunchServer(true, address)} />
                        </Tooltip>
                    )}
                </HStack>
                <VStack bg={useColorModeValue('gray.200', 'dark.300')} p={2} w='full' spacing={0}>
                    <Heading size='xs' >{name}</Heading>
                    <Text fontSize='sm'>{address}</Text>
                </VStack>
            </VStack>
        </Box >
    )
}

export default ServerCard;