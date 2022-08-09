import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { BsPlayFill } from 'react-icons/bs'

const LaunchButton = ({ launchGame, isLaunching }) => {
    return (
        <Tooltip label='Launch 1.8.9' aria-label='Launch 1.8.9' hasArrow bg='dark.300' color='gray.100' rounded='md' placement='top'>
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
        </Tooltip>
    )
}

export default LaunchButton;