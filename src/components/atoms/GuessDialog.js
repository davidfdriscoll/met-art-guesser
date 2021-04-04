import React from "react";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ValueLabel from "@material-ui/core/Slider/ValueLabel";

import { marksFull, marksMobile } from '../../data/Marks';

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up('sm')]: {
      alignItems: "center",
    },
    padding: theme.spacing(3),
  },
  alignLeft: {
    alignSelf: "flex-start",
  },
  sliderBox: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  }
}));

export default function GuessDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const { onClose, open } = props;

  if(props.loading) return null;

  const StyledValueLabel = withStyles({
    offset: {
      top: props => props.index >= 1 ? -28 : -42,
      left: props => {
        if(props.index===1) return "calc(-50% + -20px)";
        else if(props.index===2) return "calc(-50% + 12px)";
      }
    },
    circle: {
      transform: props => {
        if(props.index===1) return "rotate(-90deg)";
        else if(props.index===2) return "rotate(0deg)";
      },
      backgroundColor: props => props.index >= 1 && theme.palette.secondary.light,
      opacity: props => props.index >= 1 && '.9'
    },
    label: {
      transform: props => {
        if(props.index===1) return "rotate(90deg)";
        else if(props.index===2) return "rotate(0deg)";      
      },
    }
  })(ValueLabel);

  const handleClose = () => {
    onClose();
  };

  function valuetext(value) {
    if (value === -500) return '500 BCE or earlier';
    return value > 0 ? `${value} CE` : `${-value} BCE`;   
  }

  function valueTextSlider(value) {
    return value > 0 ? `${value}` : `${-value}`;
  }

  return (
    <Dialog 
      maxWidth="md" 
      fullWidth={true}
      onClose={handleClose} 
      open={open}
    >
      <DialogTitle>
        <Typography component={'span'} variant="body1">
          <Box fontStyle="italic">
            {props.artObject.culture}
          </Box>
        </Typography>
        <Link 
          target="_blank" 
          rel="noopener noreferrer" 
          href={props.artObject.objectURL} 
          color='initial'
        >
          {props.artObject.title} 
        </Link>
        {props.artObject.artistDisplayName && 
          <Typography component={'span'} gutterBottom className={classes.alignLeft}>
            <Box fontStyle="italic">
              {props.artObject.artistDisplayName} {props.artObject.artistDisplayBio ? `(${props.artObject.artistDisplayBio})` : ""}
            </Box>
          </Typography>
        }
      </DialogTitle>
      <Box className={classes.content}>
        <Typography align="center" gutterBottom>
          Your guess was {valuetext(props.guess)}
        </Typography>
        <Typography align="center" gutterBottom>
          {
            props.correctAnswerYear
            ? `The correct year was ${valuetext(props.artObject.objectBeginDate)}`
            : `The correct range was ${valuetext(props.artObject.objectBeginDate)} to ${valuetext(props.artObject.objectEndDate)}`
          }
        </Typography>
        <Typography align="center" gutterBottom>
          {
            props.guessDistance === 0
            ? <Box color={theme.palette.text.secondary}>Your guess was right!</Box>
            : `Your guess was ${props.guessDistance} years from the correct ${props.correctAnswerYear ? `year` : `range`}`
          } 
        </Typography>
        <Box alignSelf="stretch" className={classes.sliderBox}>
          <Slider
          min={-500}
          max={new Date().getFullYear()}
          marks={largerScreen ? marksFull : marksMobile}
          defaultValue={[props.guess, props.artObject.objectBeginDate, props.artObject.objectEndDate]}
          getAriaValueText={valueTextSlider}
          aria-labelledby="guess-slider"
          valueLabelDisplay="on"
          valueLabelFormat={valueTextSlider}
          ValueLabelComponent={StyledValueLabel}
          track={false}
          disabled
        />
        </Box>
        <Typography align="center" gutterBottom>You earned {props.calcScore} points!</Typography>
      </Box>
    </Dialog>
  );
}