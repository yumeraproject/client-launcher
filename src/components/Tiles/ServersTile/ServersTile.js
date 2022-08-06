import React from 'react';
import { GridItem, Heading, Grid, useColorModeValue } from '@chakra-ui/react';
import ServerCard from './ServerCard';

import mockIcon from '../../../images/logo.png';

const ServersTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' as='i' color='dark.100'>SERVERS</Heading>
            <Grid templateColumns='repeat(4, 1fr)' mt={2} bg={backgroundColor} p={2} rounded='md'>
                <ServerCard name='Ethereal Network' address='ethereal.dev' icon={mockIcon} />
                <ServerCard name='Lunar Network' address='lunar.gg' icon={'https://www.lunar.gg/static/images/logos/moon.svg'} />
            </Grid>
        </GridItem>
    )
}

export default ServersTile;