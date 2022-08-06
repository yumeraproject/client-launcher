import { Box, GridItem, useColorModeValue, Center, VStack, Text, Heading, Divider, HStack, Button, Spacer, Image, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FaLink } from 'react-icons/fa';
import CopyButton from '../../CopyButton';

const NewsCard = ({ title, subTitle, author, authorUUID, description, imageUrl, postUrl }) => {

    return (
        <GridItem colSpan={{ base: 2, '2xl': 1 }} background={useColorModeValue('gray.200', 'dark.200')} overflow='hidden' rounded='lg' shadow='md'>
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
                <Box textAlign='center' rounded='lg' m={3} p={2} bg={useColorModeValue('gray.300', 'dark.300')} shadow='md'>
                    <HStack>
                        <Button
                            colorScheme='green'
                            size='sm'
                            onClick={() => window.api.openLink(postUrl)}
                        >
                            View more
                        </Button>
                        <CopyButton text={postUrl} customIcon={<FaLink />} size='sm' />
                        <Spacer />
                        <Divider orientation='vertical' h='24px' pr={2} />
                        <Tooltip hasArrow label={`Written by ${author}`} bg='dark.100' color='gray.200' rounded='lg'>
                            <Image src={`https://visage.surgeplay.com/face/512/${authorUUID}.png`} h='28px' rounded='md' />
                        </Tooltip>
                    </HStack>
                </Box>
            </Box>
        </GridItem>
    )
}

export default NewsCard;