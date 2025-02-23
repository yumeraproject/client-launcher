import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
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
      300: "#4F356E",
      "100-T": "rgb(120, 81, 169, 0.5)",
      "200-T": "rgb(98, 66, 138, 0.5)",
      "300-T": "rgb(79, 53, 110, 0.5)"
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
    },
    success: {
      100: "#68D391",
      200: "#48BB78",
      "100-T": "rgb(104, 211, 145, 0.75)",
      "200-T": "rgb(72, 187, 120, 0.75)"
    }
  },
  shadows: {
    primaryGlow: '0px 0px 8px #5B3B8C',
    warningGlow: '0px 0px 8px #FF7F50',
    errorGlow: '0px 0px 8px #D0312D',
    successGlow: '0px 0px 8px #68D391'
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
