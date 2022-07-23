import { Box, GridItem, useColorModeValue, Center, VStack, Text, Heading } from '@chakra-ui/react';
import React from 'react';

const NewsCard = ({ title, subTitle, author, authorUUID, description, timestamp, imageUrl }) => {
    return (
        <GridItem colSpan={2} background='dark.200' overflow='hidden' rounded='lg' shadow='md'>
            <Box
                background={`linear-gradient(to bottom, rgba(0, 0, 0, 0.1), ${useColorModeValue('rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.55)')}), url(${imageUrl})`}
                backgroundPosition='center'
                backgroundRepeat='no-repeat'
                height='100px'
            >
                <Center h='full' backdropFilter='blur(2px)'>
                    <VStack color='white'>
                        <Text as='i' letterSpacing='4px' fontSize='xs' lineHeight='0px' textTransform='uppercase' color='gray.100'>{subTitle}</Text>
                        <Heading>{title}</Heading>
                    </VStack>
                </Center>
            </Box>
            <Box>
                Description
            </Box>
        </GridItem>
    )
}

export default NewsCard;