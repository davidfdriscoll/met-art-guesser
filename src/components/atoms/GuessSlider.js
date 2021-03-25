import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}));

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

export default function GuessSlider() {
  const classes = useStyles();

  return(
    <Box className={classes.root}>
      <Typography gutterBottom>
        Guess a year
      </Typography>
      <Slider
        color="secondary"
        min={-2000}
        max={2020}
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="guess-slider"
        valueLabelDisplay="on"
        valueLabelFormat={valuetext}
        marks={marks}
        track={false}
      />
    </Box>
  );
}