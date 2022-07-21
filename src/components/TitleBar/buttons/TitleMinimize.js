import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdRemove } from 'react-icons/md'

const TitleMinimize = () => {
    const MinimizeWindow = () => {
        window.api.minimizeWindow();
    }

    return (
        <IconButton
            aria-label='Minimize'
            icon={<MdRemove />}
            size='md'
            height='full'
            color={useColorModeValue('black', 'white')}
            _hover={{
                bgColor: `${useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}`,
            }}
            colorScheme='none'
            onClick={MinimizeWindow}
        />
    )
}

export default TitleMinimize;