import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

export default function GuessDialog(props) {
  const theme = useTheme();
  const { onClose, open } = props;

  if(props.loading) return null;

  const handleClose = () => {
    onClose();
  };

  function valuetext(value) {
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
        <Typography variant="body1"><Box fontStyle="italic">{props.artObject.culture}</Box></Typography>
        <Link target="_blank" rel="noopener noreferrer" href={props.artObject.objectURL} color='initial'>
          {props.artObject.title} 
        </Link>
      </DialogTitle>
      <DialogContent dividers>
        {props.artObject.artistDisplayName && 
          <Typography gutterBottom>
            <Box fontStyle="italic">
              {props.artObject.artistDisplayName} ({props.artObject.artistDisplayBio})
            </Box>
          </Typography>
        }
        <Typography align="center" gutterBottom>Your guess was {valuetext(props.guess)}</Typography>
        <Typography align="center" gutterBottom>
          {
            props.correctAnswerYear
            ? `The correct year was ${valuetext(props.artObject.objectBeginDate)}`
            : `The correct range was ${valuetext(props.artObject.objectBeginDate)} to ${valuetext(props.artObject.objectEndDate)}.`
          }
          </Typography>
        <Typography align="center" gutterBottom>
          {
            props.guessDistance === 0
            ? <Box color={theme.palette.text.secondary}>Your guess was right!</Box>
            : `Your guess was ${props.guessDistance} years from the correct ${props.correctAnswerYear ? `year` : `range`}.`
          } 
        </Typography>
        <Box px={5} pt={5}>
          <Slider
            color="primary"
            min={Math.min(props.guess, props.artObject.objectBeginDate, props.artObject.objectEndDate)-50}
            max={Math.max(props.guess, props.artObject.objectBeginDate, props.artObject.objectEndDate)+50}
            defaultValue={[props.guess, props.artObject.objectBeginDate, props.artObject.objectEndDate]}
            getAriaValueText={valueTextSlider}
            aria-labelledby="guess-slider"
            valueLabelDisplay="on"
            valueLabelFormat={valueTextSlider}
            track={false}
            disabled
          />
        </Box>
        <Typography align="center" gutterBottom>You earned {props.calcScore} points!</Typography>
      </DialogContent>
    </Dialog>
  );
}