import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  button: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  }
}));

export default function GameEndDialog(props) {
  const classes = useStyles();

  return (
    <Dialog 
      open={props.open} 
      maxWidth="md" 
      fullWidth={true}
      onClose={props.handleGameEndDialogClose} 
    >
      <DialogTitle className={classes.title}>You did it!</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <DialogContentText>
          <Typography variant="h4" color="secondary">Your final score was {props.score}.</Typography>          
        </DialogContentText>
        <Button 
          onClick={props.handleGameEndDialogClose}
          variant="contained" 
          color="secondary"
          className={classes.button}
        >
          Play again
        </Button>
      </DialogContent>
    </Dialog>
  );
}