import React from "react";

import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import GuessAppBar from './components/molecules/GuessAppBar';
import ArtDisplay from './components/molecules/ArtDisplay';
import Guesser from './components/molecules/Guesser';
import GameEndDialog from './components/atoms/GameEndDialog';

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [possibleArtObjects, setPossibleArtObjects] = React.useState();
  const [showHighlights, setShowHighlights] = React.useState(true);

  const [currentRound, setCurrentRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [currentArt, setCurrentArt] = React.useState();
  const [gameEndDialogOpen, setGameEndDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const posObjListRes = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search', {
        params: {
          hasImages: true,
          q: "",
          isHighlight: showHighlights,          
        }
      });
      setPossibleArtObjects(posObjListRes.data);
      setIsLoading(false);
    }
    fetchData();
  }, [showHighlights]);

  React.useEffect(() => {
    const fetchNewObject = async() => {
      setIsLoading(true);
      const randomObjectID = possibleArtObjects.objectIDs[Math.floor(Math.random() * possibleArtObjects.objectIDs.length)];
      const objRes = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`);
      setCurrentArt(objRes.data); 
      console.log(objRes.data);
      setIsLoading(false);
    }

    if(currentRound && currentRound <= roundsInGame) {
      if(possibleArtObjects) fetchNewObject();
    }
    else {
      setCurrentRound(null);
      setGameEndDialogOpen(true);
      setIsLoading(true);
    }
  }, [currentRound, possibleArtObjects, score]);

  function handleGameEndDialogClose() {
    setGameEndDialogOpen(false);
    setCurrentRound(1);
    setScore(0);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <GuessAppBar score={score} currentRound={currentRound} showHighlights={showHighlights} setShowHighlights={setShowHighlights} />
        <ArtDisplay artObject={currentArt} loading={isLoading} />
        <Guesser 
          artObject={currentArt} 
          score={score}
          setScore={setScore}
          currentRound={currentRound}
          setCurrentRound={setCurrentRound}
          loading={isLoading} 
        />
      </Box>
      <GameEndDialog open={gameEndDialogOpen} handleGameEndDialogClose={handleGameEndDialogClose} score={score} />
    </ThemeProvider>
  );
}

export default App;