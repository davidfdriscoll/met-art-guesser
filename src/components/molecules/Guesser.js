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
  guessButton: {
  }
}));

export default function Guesser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleGuess = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return(
    <Box className={classes.root} display="flex" boxShadow={15}>
      <GuessSlider className={classes.slider} />
      <Button 
        className={classes.guessButton} 
        variant="contained" 
        color="secondary"
        onClick={handleGuess}
      >
        Guess
      </Button>
      <GuessDialog open={open} onClose={handleClose} />
    </Box>
  );
}