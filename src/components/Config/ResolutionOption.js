import React, { useEffect, useState } from 'react';
import { Text, Box, Fade, useColorModeValue, HStack, VStack, NumberInput, NumberInputField } from '@chakra-ui/react';

const ResolutionOption = () => {
    const [value, setValue] = useState({ width: 0, height: 0});
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    useEffect(() => {

    }, [])

    return (
        <>
            <Text letterSpacing={3} color='dark.100' fontSize='xs' as='i' fontFamily={'Roboto'} fontWeight='bold' textTransform='uppercase'>GAME RESOLUTION</Text>
            <Box background={backgroundColor} mt={1} p={3} rounded='lg' fontSize='sm'>
                {value && (
                    <Fade in>
                        <HStack>
                            <VStack>
                                <NumberInput defaultValue={value.width}>
                                    <NumberInputField fontSize='sm' />
                                </NumberInput>
                            </VStack>
                            <Text>X</Text>
                            <VStack>
                                <NumberInput defaultValue={value.height}>
                                    <NumberInputField fontSize='sm'  focusBorderColor='primary' />
                                </NumberInput>
                            </VStack>
                        </HStack>
                    </Fade>
                )}
            </Box>
        </>
    )
}

export default ResolutionOption;