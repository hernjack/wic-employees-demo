import React, { useEffect } from 'react';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  DialogContentText,
  Button,
  List,
  ListItem,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import EMPLOYEE_TYPES from '../utils/constants';
import axios from 'axios';

const EmployeeForm = ({ employee, isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!employee) return
    reset({
      ...employee,
      ...{name: employee.employeeName},
    })

  }, [employee])


  const submitHandler = async (formData) => {
    // EDIT
    if (employee) {
      return axios.put(`/api/employees/${employee.employeeId}`, formData)
        .then((response) => {
          console.log(response)
          onClose();
          reset({})
        })
        .catch((e) => { console.log(e) })
    }

    // ADD 
    return axios.post('/api/employees', formData)
      .then((response) => {
        console.log(response)
        onClose();
        reset({})
      })
      .catch((e) => { console.log(e) })
  }

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the following fields
          </DialogContentText>
          <form onSubmit={handleSubmit(submitHandler)} style={{ minWidth: '550px' }} className="form" >
            <List>
              {!employee && <ListItem>
                <Controller
                  name="employeeType"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Employee Type</InputLabel>
                      <Select
                        fullWidth
                        required
                        id="employeeType"
                        label="Employee Type"
                        defaultValue={1}
                        {...field}
                      >
                        <MenuItem value={1}>{EMPLOYEE_TYPES.DEFAULT}</MenuItem>
                        <MenuItem value={2}>{EMPLOYEE_TYPES.ACCOUNTANT}</MenuItem>
                        <MenuItem value={3}>{EMPLOYEE_TYPES.TECHNICIAN}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                ></Controller>
              </ListItem>}
              <ListItem>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      required
                      margin="dense"
                      id="name"
                      label="Name"
                      defaultValue=""
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="ratePerHour"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      required
                      margin="dense"
                      id="ratePerHour"
                      label="Rate Per Hour"
                      defaultValue=""
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="registrationNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="dense"
                      id="registrationNumber"
                      label="Registration No."
                      defaultValue=""
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="expireDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="dense"
                      id="expireDate"
                      label="Expire date (MM/dd/yyyy)"
                      defaultValue=""
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
            </List>
            <Button style={{ float: 'left' }} onClick={onClose}>Cancel</Button>
            <Button style={{ float: 'right' }} type="submit" color="primary">Accept</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmployeeForm