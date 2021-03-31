import React from "react";

import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import GuessAppBar from './components/molecules/GuessAppBar';
import ArtDisplay from './components/molecules/ArtDisplay';
import Guesser from './components/molecules/Guesser';
import GameEndDialog from './components/atoms/GameEndDialog';

// derived from 2021-03-29 data dump: json of objects with 'is highlight' attribute
import HighlightedObjects from './data/HighlightedObjects.json';

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
  const [department, setDepartment] = React.useState("");

  const [currentRound, setCurrentRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [currentArt, setCurrentArt] = React.useState();
  const [gameEndDialogOpen, setGameEndDialogOpen] = React.useState(false);

  // at beginning of game and if format changes (department, highlights) 
  // reset game and set new set of possible art objects
  React.useEffect(() => {
    async function fetchData() {
      setCurrentRound(1);
      setScore(0);
      // Met's API has search and object elements, but search (though providing richer options) does not yield all matching objects
      // so use object endpoint but filter for highlights and images below
      const posObjListRes = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects', {
        params: {
          departmentIds: department ? department : null
        }
      });
      const posObjs = 
        showHighlights 
        // if highlighted get intersection of pos obj array with the highlighted objects array
        // i.e. filter pos obj array for highlights
        // https://stackoverflow.com/questions/33356504/difference-and-intersection-of-two-arrays-containing-objects 
        ? posObjListRes.data.objectIDs.filter(a => HighlightedObjects.objectIds.some(b => a === b))
        : posObjListRes.data.objectIDs;
      setPossibleArtObjects(posObjs);
    }
    fetchData();
  }, [department, showHighlights]);

  // at end of round (score, round change) or change in format (artobjects) get a new object
  React.useEffect(() => {
    async function fetchNewObject() {
      setIsLoading(true);
      let objRes;
      do {
        const randomObjectID = possibleArtObjects[Math.floor(Math.random() * possibleArtObjects.length)];
        objRes = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`);
      // hacky; repeatedly hit API for a random object until we get one that has an image
      // usually doesn't require more than two attempts
      } while(!objRes.data.primaryImage)
      setCurrentArt(objRes.data); 
      setIsLoading(false);
    }

    // if we're in the middle of the game get new object
    if(currentRound && currentRound <= roundsInGame) {
      if(possibleArtObjects) fetchNewObject();
    }
    // if we're at the end of the game show end game dialog 
    else {
      setCurrentRound(null);
      setGameEndDialogOpen(true);
      setIsLoading(true);
    }
  }, [currentRound, possibleArtObjects, score]);

  // and when game end dialog closes reset game
  function handleGameEndDialogClose() {
    setGameEndDialogOpen(false);
    setCurrentRound(1);
    setScore(0);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <GuessAppBar 
          score={score} 
          currentRound={currentRound} 
          showHighlights={showHighlights} 
          setShowHighlights={setShowHighlights} 
          department={department}
          setDepartment={setDepartment}
          setIsLoading={setIsLoading}
        />
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
      <GameEndDialog 
        open={gameEndDialogOpen} 
        handleGameEndDialogClose={handleGameEndDialogClose} 
        score={score} 
      />
    </ThemeProvider>
  );
}

export default App;