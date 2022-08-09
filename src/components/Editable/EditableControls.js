import React from 'react';
import { useEditableControls, ButtonGroup, IconButton, Flex, Button } from '@chakra-ui/react';
import { FaCheck, FaEdit, FaStop } from 'react-icons/fa';

const EditableControls = ({ editText }) => {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup size='sm' mt={2}>
            <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
            <IconButton icon={<FaStop />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <Flex mt={2}>
            <Button size='sm' leftIcon={<FaEdit />} {...getEditButtonProps()}>{editText}</Button>
        </Flex>
    )

}

export default EditableControls;