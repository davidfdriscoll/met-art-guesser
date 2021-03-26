import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

export default function GuessDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const marks = [
    {
      value: -2000,
      label: '2000 BCE',
    },
    {
      value: -1000,
      label: '1000 BCE',
    },
    {
      value: 1,
      label: '1 CE',
    },
    {
      value: 1000,
      label: '1000 CE',
    },
    {
      value: 2021,
      label: '2021 CE',
    },
  ];

  function valuetext(value) {
    return value > 0 ? `${value}` : `${-value}`;
  }

  function guessDistance() {
    return Math.min(Math.abs(props.guess - props.artObject.objectBeginDate), Math.abs(props.guess - props.artObject.objectEndDate));
  }

  function calcScore() {
    return 5000 - guessDistance();
  }

  return (
    <Dialog 
      maxWidth="lg" 
      fullWidth={true}
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}
    >
      <DialogTitle>{props.artObject.title}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom><Box fontStyle="italic">{props.artObject.artistDisplayName} ({props.artObject.artistDisplayBio})</Box></Typography>
        <Typography align="center" gutterBottom>Your guess was {guessDistance()} years from the correct range.</Typography>
        <Box px={5} pt={5}>
          <Slider
            color="primary"
            min={-2000}
            max={2020}
            defaultValue={[props.guess, props.artObject.objectBeginDate, props.artObject.objectEndDate]}
            getAriaValueText={valuetext}
            aria-labelledby="guess-slider"
            valueLabelDisplay="on"
            valueLabelFormat={valuetext}
            marks={marks}
            track={false}
            disabled
          />
        </Box>
        <Typography align="center" gutterBottom>You earned {calcScore()} points!</Typography>
      </DialogContent>
    </Dialog>
  );
}