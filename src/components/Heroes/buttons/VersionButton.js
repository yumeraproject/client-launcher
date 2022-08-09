import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, SlideFade, ButtonGroup, Button, HStack } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

const VersionButton = ({ isLaunching, isRunning }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    const toggleSelector = () => {
        setSelectorOpen(!selectorOpen);
    }

    useEffect(() => {
        if (isLaunching || isRunning) 
        setSelectorOpen(false);
    }, [isLaunching, isRunning])

    return (
        <HStack>
            <Tooltip label='Select Version' aria-label='Select Version' hasArrow bg='dark.300' color='gray.100' rounded='md' placement='end' isDisabled={selectorOpen}>
                <IconButton
                    icon={<FaChevronRight size='12px' />}
                    background='whiteAlpha.200'
                    color='white'
                    _hover={{
                        bgColor: 'whiteAlpha.300'
                    }}
                    _active={{
                        bgColor: 'whiteAlpha.200'
                    }}
                    isDisabled={isLaunching || isRunning}
                    onClick={toggleSelector}
                    minW='20px'
                />
            </Tooltip>
            <SlideFade in={selectorOpen} unmountOnExit>
                <ButtonGroup size='sm'>
                    <Button
                        backgroundColor='primary.100-T'
                        shadow='primaryGlow'
                        _hover={{
                            bgColor: 'primary.200-T'
                        }}
                        _active={{
                            bgColor: 'primary.200-T'
                        }}
                    >
                        1.8.9
                    </Button>
                    <Tooltip
                        hasArrow
                        placement='bottom'
                        label='Coming soon'
                        fontSize='xs'
                        shouldWrapChildren
                        bg='dark.300'
                        color='gray.100'
                        rounded='md'
                    >
                        <Button
                            isDisabled={true}
                            background='whiteAlpha.200'
                        >
                            1.12.2
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </SlideFade>
        </HStack>
    )
}

export default VersionButton;