import React from 'react';
import { Box, useColorModeValue, VStack, Image, Heading, Text, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

const ServerCard = ({ name, address, icon }) => {
    return (
        <Box m={1} rounded='md' bg={useColorModeValue('gray.300', 'dark.200')} shadow='md' overflow='hidden'>
            <VStack spacing={0}>
                <HStack py={2}>
                    <Image src={icon} alt={name} rounded='md' h='40px'/>
                    <Tooltip hasArrow label={`Launch ${address}`} bg='dark.100' color='gray.200' rounded='lg' placement='top'>
                        <IconButton icon={<FaPlay />} size='sm' aria-label={`Launch ${address}`} />
                    </Tooltip>
                </HStack>
                <VStack bg={useColorModeValue('gray.200', 'dark.300')} p={2} w='full' spacing={0}>
                    <Heading size='xs' >{name}</Heading>
                    <Text fontSize='sm'>{address}</Text>
                </VStack>
            </VStack>
        </Box>
    )
}

export default ServerCard;