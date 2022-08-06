import React from 'react';
import { GridItem, Heading, Grid, useColorModeValue, Box, Button } from '@chakra-ui/react';
import ServerCard from './ServerCard';

import mockIcon from '../../../images/logo.png';

const ServersTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    const openLink = (link) => {
        window.api.openLink(link);
    }

    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' as='i' color='dark.100'>PARTNERED SERVERS</Heading>
            <Box mt={2} bg={backgroundColor} p={2} rounded='md'>
                <Grid templateColumns='repeat(4, 1fr)'>
                    <ServerCard name='Ethereal Network' address='ethereal.dev' icon={mockIcon} />
                    <ServerCard name='Lunar Network' address='lunar.gg' icon={'https://www.lunar.gg/static/images/logos/moon.svg'} />
                </Grid>
                <Button
                    size='xs'
                    w='full'
                    onClick={() => openLink('https://google.com')}
                    bg={useColorModeValue('gray.200', 'whiteAlpha.200')}
                    _hover={{
                        bg: useColorModeValue('gray.300', 'whiteAlpha.100')
                    }}
                    mt={1}
                >
                    Apply for partnership
                </Button>
            </Box>
        </GridItem>
    )
}

export default ServersTile;