import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import TitleBar from './components/TitleBar/TitleBar';

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="lg">
        <Grid minH="100vh">
          <TitleBar />
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
