import React, { useState } from 'react';
import { Box, Center, Fade, Grid, useColorModeValue, useTimeout } from '@chakra-ui/react';
import TitleBar from '../components/TitleBar/TitleBar';
import NewsTile from '../components/Tiles/NewsTile/NewsTile';
import HomeHero from '../components/Heroes/HomeHero';
import { HashLoader } from 'react-spinners';
import ServersTile from '../components/Tiles/ServersTile/ServersTile';
import AboutTile from '../components/Tiles/AboutTile/AboutTile';

const HomePage = () => {
    const backgroundColor = useColorModeValue('gray.200', 'dark.400');
    const [loading, setLoading] = useState(false);

    // const finishLoading = () => setLoading(false);

    // useTimeout(finishLoading, 3000);

    return (
        <Box bg={backgroundColor} minH='100vh' userSelect='none'>
            <TitleBar />
            {loading ? (
                <Center height='80vh'>
                    <HashLoader color='#7851a9' />
                </Center>
            ) : (
                <Fade in>
                    <Box pt={5} px={5}>
                        <HomeHero />
                        <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(6, 1fr)' gap={3} mt={5}>
                            <NewsTile rowSpan={1} colSpan={4} />
                            <AboutTile colSpan={2}/>
                            <ServersTile rowSpan={1} colSpan={3} />
                        </Grid>
                    </Box>
                </Fade>
            )}
        </Box>
    )
}

export default HomePage;