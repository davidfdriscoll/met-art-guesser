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
      light: '#629749',
      dark: '#003d00',
      main: '#33691e',
    },
  },
  shape: {
    borderRadius: 15,
  }, 
});

function App() {
  const [currentArt, setCurrentArt] = React.useState(Sample);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" width="100vw" display="flex" flexDirection="column">
        <GuessAppBar />
        <ArtDisplay imageURL={currentArt.primaryImage} />
        <Guesser artObject={currentArt} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
