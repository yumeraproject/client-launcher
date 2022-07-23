import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaMinusCircle } from 'react-icons/fa';

const ErrorButton = ({ displayError }) => {
    return (
        <IconButton
            icon={<FaMinusCircle />}
            bgColor='error.100-T'
            shadow='errorGlow'
            color='white'
            _hover={{
                bgColor: 'error.200-T'
            }}
            _active={{
                bgColor: 'error.200-T'
            }}
            onClick={displayError}
        />
    )
}

export default ErrorButton;