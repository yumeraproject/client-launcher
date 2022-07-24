import React, { useState } from 'react';
import { IconButton, useToast, useTimeout } from '@chakra-ui/react';
import { FaCheck, FaClipboard } from 'react-icons/fa';

const CopyButton = ({ text, customIcon, size }) => {
    const [icon, setIcon] = useState(customIcon? customIcon : <FaClipboard />);
    const [disabled, setDisabled] = useState(false);
    const toast = useToast();

    const copy = async () => {
        navigator.clipboard.writeText(text);
        setIcon(<FaCheck />);
        toast({
            title: 'Copied to clipboard',
            status: 'success'
        });
        setDisabled(true);
        setTimeout(() => {
            setIcon(customIcon? customIcon : <FaClipboard />);
            setDisabled(false);
        }, 1000)
    }

    return (
        <IconButton
            icon={icon}
            onClick={copy}
            size={size}
            isDisabled={disabled}
        />
    )
}

export default CopyButton;