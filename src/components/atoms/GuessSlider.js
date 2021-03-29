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
  {
    value: 1,
    label: '1 CE',
  },
  {
    value: 500,
    label: '500 CE',
  },
  {
    value: 1000,
    label: '1000 CE',
  },
  {
    value: 1500,
    label: '1500 CE',
  },
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