import React from 'react';
import { GridItem, Heading, Box, useColorModeValue } from '@chakra-ui/react';

const AboutTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' as='i' color='dark.100'>SERVERS</Heading>
            <Box mt={2} bg={backgroundColor} p={2} rounded='md'>
                .
            </Box>
        </GridItem>
    )
}

export default AboutTile;