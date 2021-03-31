import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  slider: {
    valueLabel: {
      color: theme.palette.common.white,
    },
  },
}));

const marks = [
  {
    value: -500,
    label: '500 BCE or earlier',
  },
  { value: -400, },
  { value: -300, },
  { value: -200, },
  { value: -100, },
  {
    value: 1,
    label: '1 CE',
  },
  { value: 100, },
  { value: 200, },
  { value: 300, },
  { value: 400, },
  {
    value: 500,
    label: '500 CE',
  },
  { value: 600, },
  { value: 700, },
  { value: 800, },
  { value: 900, },
  {
    value: 1000,
    label: '1000 CE',
  },
  { value: 1100, },
  { value: 1200, },
  { value: 1300, },
  { value: 1400, },
  {
    value: 1500,
    label: '1500 CE',
  },
  { value: 1600, },
  { value: 1700, },
  { value: 1800, },
  { value: 1900, },
  {
    value: 2000,
    label: '2000 CE',
  },
];

function valuetext(value) {
  return value > 0 ? `${value}` : `${-value}`;
}

export default function GuessSlider(props) {
  const classes = useStyles();

  return(
    <Box className={classes.root}>
      <Typography gutterBottom>
        Guess the year of origin
      </Typography>
      <Slider
        color="secondary"
        min={-500}
        max={new Date().getFullYear()}
        defaultValue={props.defaultGuess}
        getAriaValueText={valuetext}
        aria-labelledby="guess-slider"
        valueLabelDisplay="on"
        valueLabelFormat={valuetext}
        marks={marks}
        track={false}
        className={classes.slider}
        onChangeCommitted={props.handleSliderChange}
        disabled={props.disabled}
      />
    </Box>
  );
}