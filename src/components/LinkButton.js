import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';

const LinkButton = ({ link, size }) => {

    const openLink = () => {
        window.api.openLink(link);
    }

    return (
        <IconButton
            icon={<FaLink />}
            onClick={openLink}
            size={size}
        />
    )
}

export default LinkButton;