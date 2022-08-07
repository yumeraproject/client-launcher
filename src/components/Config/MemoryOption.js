import React, { useState } from 'react';
import { Text, Box, useColorModeValue, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Code } from '@chakra-ui/react';

const MemoryOption = () => {
    const [value, setValue] = useState(5);
    return (
        <>
            <Text letterSpacing={3} color='dark.100' fontSize='xs' as='i' fontFamily={'Roboto'} fontWeight='bold'>ALLOCATED MEMORY</Text>
            <Box background={useColorModeValue('gray.100', 'dark.300')} mt={1} p={3} rounded='lg' fontSize='sm'>
                <Slider aria-label='allocated-memory' colorScheme='gray' defaultValue={5} min={0.5} max={8} step={0.1} onChange={(val) => setValue(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text fontSize='sm'>
                    Allocated <Code fontSize='xs'>{value}GB</Code> out of <Code fontSize='xs'>8GB</Code> of memory.
                </Text>
            </Box>
        </>
    )
}

export default MemoryOption;