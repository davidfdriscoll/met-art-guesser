import React from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import GuessAppBar from './components/molecules/GuessAppBar';
import ArtDisplay from './components/molecules/ArtDisplay';
import Guesser from './components/molecules/Guesser';

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
  const [currentArt, setCurrentArt] = React.useState();

  React.useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""')
      .then(response => response.json())
      .then((data) => {
        const randomObjectID = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`)
        .then(response => response.json())
        .then(data => {
          setCurrentArt(data);
          console.log(data);
        });  
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <GuessAppBar />
        <ArtDisplay artObject={currentArt} />
        <Guesser artObject={currentArt} />
      </Box>
    </ThemeProvider>
  );
}

export default App;