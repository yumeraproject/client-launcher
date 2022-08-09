import React, { useEffect, useState } from 'react';
import { Text, Box, useColorModeValue, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Code, Fade } from '@chakra-ui/react';

const MemoryOption = () => {
    const [value, setValue] = useState();
    const [maxValue, setMaxValue] = useState();

    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    useEffect(() => {
        window.api.getAllocatedMemory()
            .then((val) => {
                setValue(val);
            });

        window.api.getMaxAllocatedMemory()
            .then((val) => {
                setMaxValue(val);
            });
    }, [])

    const updateConfig = (val) => {
        window.api.setAllocatedMemory(val);
    }

    return (
        <Box mt={3}>
            <Text letterSpacing={3} color='dark.100' fontSize='xs' as='i' fontFamily={'Roboto'} fontWeight='bold' textTransform='uppercase'>ALLOCATED MEMORY</Text>
            <Box background={backgroundColor} mt={1} p={3} rounded='lg' fontSize='sm'>
                {value && (
                    <Fade in>
                        <Slider aria-label='allocated-memory' colorScheme='gray' defaultValue={value} min={0.5} max={maxValue} step={0.1} onChange={(val) => setValue(val)} onChangeEnd={(val) => updateConfig(val)}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Fade>

                )}
                <Text fontSize='sm'>
                    Allocated <Code fontSize='xs'>{value}GB</Code> out of <Code fontSize='xs'>{maxValue}GB</Code> of memory.
                </Text>
            </Box>
        </Box>
    )
}

export default MemoryOption;