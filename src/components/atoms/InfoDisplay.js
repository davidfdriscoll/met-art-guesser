import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  score: {
    alignSelf: 'flex-end',
  },
}));

export default function InfoDisplay(props) {
  const classes = useStyles();

  return(
    <Box display="flex" justifyContent="space-around">
      <Typography variant="overline">
        Round: {props.currentRound}
      </Typography>
      <Typography variant="overline">
        Score: {props.score}
      </Typography>
    </Box>
  );
}