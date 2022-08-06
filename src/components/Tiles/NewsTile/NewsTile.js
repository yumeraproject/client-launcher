import React from 'react';
import { GridItem, useColorModeValue, Box, Grid, Heading } from '@chakra-ui/react';
import NewsCard from './NewsCard';
import MedievalBackground from '../../../images/backgrounds/Medieval.png';

const NewsTile = ({ rowSpan, colSpan }) => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');
    return (
        <GridItem rowSpan={rowSpan} colSpan={colSpan}>
            <Heading letterSpacing={3} size='xs' color='dark.100' as='i'>CLIENT NEWS</Heading>
            <Box mt={2} bg={backgroundColor} p={2} rounded='md'>
                <Grid templateColumns='repeat(4, 1fr)' gap={3}>
                    <NewsCard
                        title="Public Beta"
                        subTitle="Announcement"
                        author="hamtsu"
                        authorUUID="ef3e45c0-0afd-445c-a849-257dafe4429e"
                        imageUrl={MedievalBackground}
                        timestamp="23/07/2022"
                        description="Ethereal Client is hosting a public beta. All participants will recieve a complimentary beta tester badge."
                        postUrl="https://google.com"
                    />
                    <NewsCard
                        title="1.12.2 Update"
                        subTitle="Client Update"
                        author="hamtsu"
                        authorUUID="ef3e45c0-0afd-445c-a849-257dafe4429e"
                        imageUrl={MedievalBackground}
                        timestamp="23/07/2022"
                        description="Ethereal Client is hosting a public beta. All participants will recieve a complimentary beta tester badge."
                        postUrl="https://google.com"
                    />
                </Grid>
            </Box>
        </GridItem>
    )
}

export default NewsTile;