import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';

import Museum from "@material-ui/icons/Museum";

import HighlightsCheckbox from "../../components/atoms/HighlightsCheckbox";
import DepartmentSelect from "../../components/atoms/DepartmentSelect";

const useStyles = makeStyles((theme) => ({
  logoButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  score: {
    paddingRight: theme.spacing(3),
  }
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
        <Typography variant="body1" className={classes.score}>
          Round: {props.currentRound}
        </Typography>
        <Typography variant="body1" className={classes.score}>
          Score: {props.score}
        </Typography>
        <HighlightsCheckbox 
          showHighlights={props.showHighlights} 
          setShowHighlights={props.setShowHighlights} 
          setIsLoading={props.setIsLoading}
        />
        <DepartmentSelect
          department={props.department}
          setDepartment={props.setDepartment} 
          setIsLoading={props.setIsLoading}
        />
      </Toolbar>
    </AppBar>
  );
}