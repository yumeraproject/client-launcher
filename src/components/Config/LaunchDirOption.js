import React, { useEffect, useState } from 'react';
import { useColorModeValue, Text, Box, Fade, Flex, Button } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

const LaunchDirOption = () => {
    const [value, setValue] = useState(null);

    const backgroundColor = useColorModeValue('gray.100', 'dark.300');
    const previewColor = useColorModeValue('gray.200', 'dark.400');

    useEffect(() => {
        window.api.getLaunchDirectory()
            .then((dir) => {
                setValue(dir);
            });
    }, [])

    const openDialog = () => {
        window.api.setLaunchDirectory()
            .then((dir) => {
                setValue(dir[0]);
            });
    }

    return (
        <Box mt={3}>
            <Text letterSpacing={3} color='dark.100' fontSize='xs' as='i' fontFamily={'Roboto'} fontWeight='bold' textTransform='uppercase'>GAME DIRECTORY</Text>
            <Box background={backgroundColor} mt={1} p={3} rounded='lg' fontSize='sm'>
                {value && (
                    <Fade in>
                        <Text bg={previewColor} p={2} px={4} w='full' rounded='md'>{value}</Text>
                    </Fade>
                )}
                <Flex mt={2}>
                    <Button size='sm' leftIcon={<FaEdit />} onClick={openDialog}>Edit directory</Button>
                </Flex>
            </Box>
        </Box>
    )

}

export default LaunchDirOption;