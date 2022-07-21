import React from 'react';
import { Divider, useColorModeValue } from '@chakra-ui/react';

const ThemeDivider = () => {
    return (
        <Divider
            orientation='vertical'
            h='18px'
            borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.200')}
        />
    )
}

export default ThemeDivider;