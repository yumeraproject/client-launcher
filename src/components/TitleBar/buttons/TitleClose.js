import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md'

const TitleClose = () => {
    const closeApp = () => {
        window.api.closeApp();
    }

    return (
        <IconButton
            aria-label='Close'
            icon={<MdClose />}
            size='md'
            height='full'
            color={useColorModeValue('black', 'white')}
            _hover={{
                bgColor: 'red.500',
                color: 'white'
            }}
            colorScheme='none'
            onClick={closeApp}
        />
    )
}

export default TitleClose;