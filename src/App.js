import React from 'react';
import { ChakraProvider, extendTheme, theme as oldTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const theme = extendTheme({
  colors: {
    dark: {
      100: "#333333",
      200: "#212121",
      300: "#1F1F1F",
      400: "#141414",
      "300-T": "rgb(31, 31, 31, 0.8)"
    },
    primary: {
      100: "#7851a9",
      200: "#62428A",
      300: "#4F356E"
    },
    warning: {
      100: "#FF7F50",
      200: "#FF7847",
      "100-T": "rgb(255, 127, 80, 0.75)",
      "200-T": "rgb(255, 120, 71, 0.75)"
    },
    error: {
      100: "#D0312D",
      200: "#B82B28",
      "100-T": "rgb(208, 49, 45, 0.75)",
      "200-T": "rgb(184, 43, 40, 0.75)"
    }
  },
  shadows: {
    primaryGlow: '0px 0px 8px #5B3B8C',
    warningGlow: '0px 0px 8px #FF7F50',
    errorGlow: '0px 0px 8px #D0312D'
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
  },
  fontSizes: {
    "2xs": "0.60rem",
  },
  components: {
    Alert: {
      variants: {
        error: {
          container: {
            color: "white",
            bg: "error.200-T"
          }
        }
      }
    }
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
