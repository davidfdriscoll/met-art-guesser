import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  formcontrollabel: {
    marginLeft: theme.spacing(1),
  },
}));

export default function HighlightsCheckbox(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setShowHighlights(event.target.checked);
    props.setIsLoading(true);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={props.showHighlights} onChange={handleChange} name="Highlights" />}
        label="Highlights"
        labelPlacement="start"
        className={classes.formcontrollabel}
      />
    </FormGroup>
  );
}