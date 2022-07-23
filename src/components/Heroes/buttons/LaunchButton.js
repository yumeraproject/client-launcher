import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { BsPlayFill } from 'react-icons/bs'

const LaunchButton = ({ launchGame, isLaunching }) => {
    return (
        <IconButton
            icon={<BsPlayFill />}
            bgColor='primary.100'
            shadow='primaryGlow'
            color='white'
            _hover={{
                bgColor: 'primary.200'
            }}
            _active={{
                bgColor: 'primary.300'
            }}
            onClick={launchGame}
            isLoading={isLaunching}
        />
    )
}

export default LaunchButton;