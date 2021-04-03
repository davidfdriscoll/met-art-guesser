import React from "react";

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Hidden from '@material-ui/core/Hidden';

import ValueLabel from "@material-ui/core/Slider/ValueLabel";

import { marksFull, marksMobile } from '../../data/Marks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },    
  },
}));

function valuetext(value) {
  return value > 0 ? `${value}` : `${-value}`;
}

export default function GuessSlider(props) {
  const classes = useStyles();
  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const WhiteValueLabel = withStyles({
    label: {
      color: theme.palette.common.white,
    }
  })(ValueLabel);

  return(
    <Box className={classes.root}>
      <Hidden xsDown>
        <Typography gutterBottom>
          Guess the year of origin
        </Typography>
      </Hidden>
      <Slider
        color="secondary"
        min={-500}
        max={new Date().getFullYear()}
        defaultValue={props.defaultGuess}
        getAriaValueText={valuetext}
        aria-labelledby="guess-slider"
        valueLabelDisplay="on"
        valueLabelFormat={valuetext}
        ValueLabelComponent={WhiteValueLabel}
        marks={largerScreen ? marksFull : marksMobile}
        track={false}
        onChangeCommitted={props.handleSliderChange}
        disabled={props.disabled}
      />
    </Box>
  );
}