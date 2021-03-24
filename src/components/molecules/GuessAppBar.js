import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Museum from "@material-ui/icons/Museum";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function GuessAppBar(props) {
  const classes = useStyles();

  return(
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.logoButton} color="inherit">
          <Museum />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Met Art Guesser
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="collection" name="collection" defaultValue="bottom">
            <FormControlLabel
              value="highlights"
              control={<Radio />}
              label="Highlights"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Whole Collection"
            />
          </RadioGroup>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}