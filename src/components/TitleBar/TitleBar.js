import React from 'react';
import { HStack, Text, Image, useColorModeValue, Divider } from '@chakra-ui/react';

import logo from '../../images/logo.png';
import TitleClose from './buttons/TitleClose';
import TitleMaximize from './buttons/TitleMaximize';
import TitleMinimize from './buttons/TitleMinimize';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const TitleBar = () => {
    const backgroundColor = useColorModeValue('gray.100', 'gray.900');

    return (
        <HStack height="30px" p="2" backgroundColor={backgroundColor}>
            <HStack style={{ "WebkitAppRegion": "drag" }} w='full'>
                <Image src={logo} alt='logo' height='20px' />
                <Text as='i' fontWeight='black' textTransform='uppercase' letterSpacing={3}>Ethereal Client</Text>
            </HStack>
            <HStack justifyContent='right'>
                <ColorModeSwitcher />
                <Divider 
                    orientation='vertical' 
                    h='18px'
                    borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.200')}
                />
                <TitleMinimize />
                <TitleMaximize />
                <TitleClose/>
            </HStack>
        </HStack>
    )
}

export default TitleBar;