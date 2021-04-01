import React from "react";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function InfoDisplay(props) {
  return(
    <Box display="flex" justifyContent="space-around">
      <Typography variant="overline">
        Round: {props.currentRound}/{props.roundsInGame}
      </Typography>
      <Typography variant="overline">
        Score: {props.score}
      </Typography>
    </Box>
  );
}