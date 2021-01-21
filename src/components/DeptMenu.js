/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEPTS_DISPLAY_LIST } from '../constants/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
    fill: 'white',
    marginTop: -5,
  },
}));

export default function DeptMenu() {
  const classes = useStyles();
  const [selectedDept, setSelectedDept] = useState('');

  const handleDeptSelect = (e) => {
    console.log('filter selected:', e.target.value);
    setSelectedDept(e.target.value);
  };

  return (
    <FormControl
      multiple
      margin="dense"
      size="small"
      autoWidth
      className={classes.formControl}
    >
      <InputLabel>Department</InputLabel>
      <Select
        labelId="select-placeholder-dept"
        id="select-placeholder"
        value={selectedDept}
        onChange={handleDeptSelect}
      >
        <MenuItem value="">Any</MenuItem>
        { DEPTS_DISPLAY_LIST.map((deptName) => (<MenuItem value={deptName}>{deptName}</MenuItem>))}
      </Select>
    </FormControl>
  );
}

//
