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

  if(props.loading) return null;

  const { onClose, open } = props;
  const isCorrectAnswerYearNotRange = props.isCorrectAnswerYearNotRange;
  let guessIndex;
  let rangeStartIndex;
  let rangeEndIndex;

  if(props.guess < props.artObject.objectBeginDate) {
    guessIndex = 0;
    rangeStartIndex = 1;
    rangeEndIndex = 2;
  }
  else if(props.guess > props.artObject.objectEndDate) {
    guessIndex = 2;
    rangeStartIndex = 0;
    rangeEndIndex = 1;    
  }
  else {
    guessIndex = 1;
    rangeStartIndex = 0;
    rangeEndIndex = 2;      
  }

  const StyledValueLabel = withStyles({
    offset: {
      left: props => {
        if(props.index===rangeStartIndex && !isCorrectAnswerYearNotRange) return "calc(-50% + -20px)";
        else if(props.index===rangeEndIndex && !isCorrectAnswerYearNotRange) return "calc(-50% + 12px)";
      }
    },
    circle: {
      transform: props => {
        if(props.index===rangeStartIndex && !isCorrectAnswerYearNotRange) return "rotate(-90deg)";
        else if(props.index===rangeEndIndex && !isCorrectAnswerYearNotRange) return "rotate(0deg)";
      },
      backgroundColor: props => props.index===guessIndex && theme.palette.secondary.main,
      opacity: props => (props.index === rangeStartIndex || props.index===rangeEndIndex) && '.7'
    },
    label: {
      transform: props => {
        if(props.index===rangeStartIndex && !isCorrectAnswerYearNotRange) return "rotate(90deg)";
        else if(props.index===rangeEndIndex && !isCorrectAnswerYearNotRange) return "rotate(0deg)";      
      },
      color: props => props.index===guessIndex && theme.palette.common.white,
    }
  })(ValueLabel);

  // very hacky way to set data-index to 0 1 2 depending on guessIndex without exploring emotion's styled component, which is probably better
  const GuessSlider = guessIndex===0
  ? 
    withStyles({
      thumb: {
        '&[data-index="0"]': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    })(Slider)
  : 
  (guessIndex===1
  ?   
    withStyles({
      thumb: {
        '&[data-index="1"]': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    })(Slider)
  :
    withStyles({
      thumb: {
        '&[data-index="2"]': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    })(Slider)
  );

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
            props.isCorrectAnswerYearNotRange
            ? `The correct year was ${valuetext(props.artObject.objectBeginDate)}`
            : `The correct range was ${valuetext(props.artObject.objectBeginDate)} to ${valuetext(props.artObject.objectEndDate)}`
          }
        </Typography>
        <Typography align="center" gutterBottom>
          {
            props.guessDistance === 0
            ? <Box color={theme.palette.text.secondary}>Your guess was right!</Box>
            : `Your guess was ${props.guessDistance} years from the correct ${props.isCorrectAnswerYearNotRange ? `year` : `range`}`
          } 
        </Typography>
        <Box alignSelf="stretch" className={classes.sliderBox}>
          <GuessSlider
          min={-500}
          max={new Date().getFullYear()}
          marks={largerScreen ? marksFull : marksMobile}
          value={[props.artObject.objectBeginDate, props.artObject.objectEndDate, props.guess]}
          getAriaValueText={valueTextSlider}
          aria-labelledby="guess-slider"
          valueLabelDisplay="on"
          valueLabelFormat={valueTextSlider}
          ValueLabelComponent={StyledValueLabel}
          track="normal"
          disabled
        />
        </Box>
        <Typography align="center" gutterBottom>You earned {props.calcScore} points!</Typography>
      </Box>
    </Dialog>
  );
}