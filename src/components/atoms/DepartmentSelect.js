import React from "react";
import axios from 'axios';
import { nanoid } from "nanoid";

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(40),
  },
}));

export default function DepartmentSelect(props) {
  const classes = useStyles();
  const [departmentList, setDepartmentList] = React.useState([]);
  const [isDepartmentListLoading, setIsDepartmentListLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchDepartmentList() {
      const posDepRes = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments');
      setDepartmentList(posDepRes.data.departments);
      setIsDepartmentListLoading(false);
    }
    fetchDepartmentList();
  }, []);

  const handleDepartmentChange = (event) => {
    props.setDepartment(event.target.value);
    props.setIsLoading(true);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="department-select-label" className={classes.inputlabel}>
        Department
      </InputLabel>
      <Select
        labelId="department-select-label"
        id="department-select"
        value={props.department}
        onChange={handleDepartmentChange}
        displayEmpty
        disabled={isDepartmentListLoading}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {departmentList.map(dept => <MenuItem key={nanoid()} value={dept.departmentId}>{dept.displayName}</MenuItem>)}
      </Select>
    </FormControl>
  );
}