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

  return (
    <Dialog 
      maxWidth="lg" 
      fullWidth={true}
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}
    >
      <DialogTitle>Quail and Millet</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom><Box fontStyle="italic">Kiyohara Yukinobu (Japanese, 1643–1682)</Box></Typography>
        <Typography align="center" gutterBottom>Your guess was 267 years from the correct range.</Typography>
        <Box px={5} pt={5}>
          <Slider
            color="primary"
            min={-2000}
            max={2020}
            defaultValue={[1400, 1667, 1682]}
            getAriaValueText={valuetext}
            aria-labelledby="guess-slider"
            valueLabelDisplay="on"
            valueLabelFormat={valuetext}
            marks={marks}
            track={false}
            disabled
          />
        </Box>
        <Typography align="center" gutterBottom>You earned 4700 points!</Typography>
      </DialogContent>
    </Dialog>
  );
}