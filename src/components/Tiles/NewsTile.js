import React from 'react';
import { GridItem, useColorModeValue, Box, Text, Heading } from '@chakra-ui/react';

const NewsTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');
    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' color='dark.100' as='i'>NEWS</Heading>
            <Box mt={2} bg={backgroundColor} p={2} rounded='md'>
                testo
            </Box>
        </GridItem>
    )
}

export default NewsTile;