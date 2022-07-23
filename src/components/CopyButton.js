import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaCheck, FaClipboard } from 'react-icons/fa';

const CopyButton = ({ text }) => {
    const [icon, setIcon] = useState(<FaClipboard />);

    const copy = () => {
        navigator.clipboard.writeText(text);
        setIcon(<FaCheck />);
    }

    return (
        <IconButton
            icon={icon}
            onClick={copy}
        />
    )
}

export default CopyButton;