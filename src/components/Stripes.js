import React from 'react';
import { Box } from '@chakra-ui/react';

const Stripes = ({ primaryColor, secondaryColor, height }) => {
    return (
        <Box background={`repeating-linear-gradient(45deg, ${primaryColor}, ${primaryColor} 6px, ${secondaryColor} 6px,  ${secondaryColor} 14px)`} h={height} />
    )
}

export default Stripes;