import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaPause } from 'react-icons/fa';

const RunningButton = ({ closeGame }) => {
    return (
        <IconButton
            icon={<FaPause />}
            bgColor='warning.100-T'
            shadow='warningGlow'
            color='white'
            _hover={{
                bgColor: 'warning.200-T'
            }}
            onClick={closeGame}
        />

    )
}

export default RunningButton;