import React from 'react';
import { Button } from '@chakra-ui/react';

const RunningButton = () => {
    return (
        <Button
            bgColor='secondary.100'
            shadow='secondaryGlow'
            color='white'
            _hover={{
                bgColor: 'secondary.200'
            }}
        >
            Game Running
        </Button>
    )
}

export default RunningButton;