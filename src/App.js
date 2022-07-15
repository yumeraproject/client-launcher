import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  VStack,
  Code,
  Grid,
  theme,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const closeApp = () => {
    window.api.closeApp();
  }

  const hideApp = () => {
    window.api.hideApp();
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <HStack height="6vh" style={{ "-webkit-app-region": "drag" }} backgroundColor="gray.900" p="2">
            <Text>Ethereal Client</Text>
            <Spacer />
          </HStack>
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Button onClick={hideApp}>Hide</Button>
            <Button onClick={closeApp}>Close</Button>
            <ColorModeSwitcher />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
