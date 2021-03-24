import React from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import GuessAppBar from './components/molecules/GuessAppBar';
import ArtDisplay from './components/molecules/ArtDisplay';
import Guesser from './components/molecules/Guesser';
import Sample from './sample.json';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffb0',
      dark: '#ca9b52',
      main: '#ffcc80',
    },
    secondary: {
      light: '#b0ff57',
      dark: '#32cb00',
      main: '#76ff03',
    }
  },
  shape: {
    borderRadius: 15,
  }, 
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" width="100vw" display="flex" flexDirection="column">
        <GuessAppBar />
        <ArtDisplay imageURL={Sample.primaryImage} />
        <Guesser />
      </Box>
    </ThemeProvider>
  );
}

export default App;
