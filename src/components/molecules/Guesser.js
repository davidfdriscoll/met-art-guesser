import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import GuessSlider from '../../components/atoms/GuessSlider.js';
import GuessDialog from '../../components/atoms/GuessDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  slider: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function Guesser(props) {
  const defaultGuess = 1;
  const classes = useStyles();
  const [guessDialogOpen, setGuessDialogOpen] = React.useState(false);
  const [guess, setGuess] = React.useState(defaultGuess);

  const guessDistance = 
  (guess >= props?.artObject?.objectBeginDate && guess <= props?.artObject?.objectEndDate)
  ? 0
  : Math.min(Math.abs(guess - props?.artObject?.objectBeginDate), Math.abs(guess - props?.artObject?.objectEndDate));

  const calcScore = Math.max(500 - guessDistance,0);

  const correctAnswerYear = (props?.artObject?.objectBeginDate - props?.artObject?.objectEndDate === 0);

  function handleGuessButtonPress() {
    setGuessDialogOpen(true);
  }

  function handleGuessDialogClose() {
    setGuessDialogOpen(false);
    props.setCurrentRound(props.currentRound + 1);
    props.setScore(props.score + calcScore);
  }

  function handleSliderChange(e, value) {
    setGuess(value);
  }

  return(
    <Box className={classes.root} display="flex" boxShadow={15}>
      <GuessSlider 
        className={classes.slider} 
        defaultGuess={defaultGuess} 
        handleSliderChange={handleSliderChange} 
        disabled={props.loading} 
      />
      <Button 
        variant="contained" 
        color="secondary"
        onClick={handleGuessButtonPress}
        disabled={props.loading}
      >
        Guess
      </Button>
      <GuessDialog 
        guess={guess} 
        guessDistance={guessDistance}
        calcScore={calcScore}
        correctAnswerYear={correctAnswerYear}
        artObject={props.artObject} 
        open={guessDialogOpen} 
        onClose={handleGuessDialogClose} 
        loading={props.loading}
      />
    </Box>
  );
}