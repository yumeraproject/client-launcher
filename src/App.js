import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const theme = extendTheme({
  colors: {
    dark: {
      100: "#333333",
      200: "#212121",
      300: "#1F1F1F",
      400: "#141414"
    },
    primary: {
      100: "#7851a9",
      200: "#62428A",
      300: "#4F356E"
    }
  },
  shadows: {
    primaryGlow: '0px 0px 8px #5B3B8C'
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
