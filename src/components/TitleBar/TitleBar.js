import React from 'react';
import { HStack, Text, Image, useColorModeValue } from '@chakra-ui/react';

import logo from '../../images/logo.png';
import TitleClose from './buttons/TitleClose';
import TitleMaximize from './buttons/TitleMaximize';
import TitleMinimize from './buttons/TitleMinimize';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import ThemeDivider from '../ThemeDivider';

const TitleBar = () => {
    const backgroundColor = useColorModeValue('gray.100', 'dark.300');

    return (
        <HStack height="30px" p="2" backgroundColor={backgroundColor}>
            <HStack style={{ "WebkitAppRegion": "drag" }} w='full'>
                <Image src={logo} alt='logo' height='20px' />
                <Text as='i' textTransform='uppercase' letterSpacing={3} fontSize='lg' fontFamily="'modero', sans-serif">Ethereal Launcher</Text>
            </HStack>
            <HStack justifyContent='right'>
                <ColorModeSwitcher />
                <ThemeDivider />
                <TitleMinimize />
                <TitleMaximize />
                <TitleClose/>
            </HStack>
        </HStack>
    )
}

export default TitleBar;