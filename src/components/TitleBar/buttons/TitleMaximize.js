import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdCropSquare } from 'react-icons/md'

const TitleMaximize = () => {
    const MaximizeWindow = () => {
        window.api.maximizeWindow();
    }

    return (
        <IconButton
            aria-label='Maximize'
            icon={<MdCropSquare />}
            size='md'
            height='full'
            color={useColorModeValue('black', 'white')}
            _hover={{
                bgColor: `${useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}`,
            }}
            colorScheme='none'
            onClick={MaximizeWindow}
        />
    )
}

export default TitleMaximize;