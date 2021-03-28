import React from "react";

import axios from 'axios';

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

const roundsInGame = 5;

function App() {
  const [currentArtIndex, setCurrentArtIndex] = React.useState(0);
  const [possibleArtObjects, setPossibleArtObjects] = React.useState();
  const [artObjects, setArtObjects] = React.useState();
  const [score, setScore] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentArt, setCurrentArt] = React.useState();

  const getNewObject = React.useCallback(async () => {
    if(!possibleArtObjects) return;
    const randomObjectID = possibleArtObjects.objectIDs[Math.floor(Math.random() * possibleArtObjects.objectIDs.length)];
    const objRes = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`);
    setCurrentArt(objRes.data); 
    setIsLoading(false);
  }, [possibleArtObjects]);

  React.useEffect(() => {
    const fetchData = async () => {
      const posObjListRes = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""');
      setPossibleArtObjects(posObjListRes.data);
    }

    fetchData().then(getNewObject());
  }, [getNewObject]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <GuessAppBar score={score} />
        <ArtDisplay artObject={currentArt} loading={isLoading} />
        <Guesser artObject={currentArt} loading={isLoading} />
      </Box>
    </ThemeProvider>
  );
}

export default App;