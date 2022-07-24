import React from 'react';
import { Button } from '@chakra-ui/react';
import { BsGearFill } from 'react-icons/bs';

const ConfigButton = () => {
    return (
        <Button
            leftIcon={<BsGearFill />}
            background='whiteAlpha.200'
            color='white'
            _hover={{
                bgColor: 'whiteAlpha.300'
            }}
            _active={{
                bgColor: 'whiteAlpha.200'
            }}
        >
            Config
        </Button>
    )
}

export default ConfigButton;