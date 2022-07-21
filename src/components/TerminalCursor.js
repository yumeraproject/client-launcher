import React from 'react';
import { Heading } from '@chakra-ui/react';
import { motion } from "framer-motion";

const TerminalCursor = () => {
    return (
        <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
        >
            <Heading>_</Heading>
        </motion.div>
    )
}

export default TerminalCursor;