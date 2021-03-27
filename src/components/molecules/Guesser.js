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
  const [liftboxOpen, setLiftboxOpen] = React.useState(false);
  const [guess, setGuess] = React.useState(defaultGuess);

  function handleGuessButtonPress() {
    setLiftboxOpen(true);
  }

  function handleLiftboxClose() {
    setLiftboxOpen(false);
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
        disabled={!props.artObject} 
      />
      <Button 
        className={classes.guessButton} 
        variant="contained" 
        color="secondary"
        onClick={handleGuessButtonPress}
        disabled={!props.artObject}
      >
        Guess
      </Button>
      <GuessDialog 
        guess={guess} 
        artObject={props.artObject} 
        open={liftboxOpen} 
        onClose={handleLiftboxClose} 
      />
    </Box>
  );
}