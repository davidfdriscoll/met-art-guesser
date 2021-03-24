import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import GuessSlider from '../../components/atoms/GuessSlider.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  slider: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  guessButton: {
  }
}));

export default function Guesser(props) {
  const classes = useStyles();

  return(
    <Box className={classes.root} display="flex" boxShadow={15}>
      <GuessSlider className={classes.slider} />
      <Button 
        className={classes.guessButton} 
        variant="contained" 
        color="secondary"
      >
        Guess
      </Button>
    </Box>
  );
}