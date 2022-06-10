import React, { useState } from 'react';
import {
  List,
  ListItem,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { fromRawDataToEmployees } from '../utils/translators';
import Employee from '../models/Employee';
import axios from 'axios';

const CalculateWageForm = ({ data }) => {
  const [employee, setEmployee] = useState(null)

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ employeeId, hoursPerWeek }) => {
    const employees = fromRawDataToEmployees(data) || [];
    const employee = employees.find((_) => _.employeeId === Number(employeeId))
    setEmployee(employee)
  }

  return (
    <div style={{ height: 500, width: '100%', margin: '0.5rem' }}>
      <form onSubmit={handleSubmit(submitHandler)} className="form">
        <List>
          <ListItem>
            <Controller
              name="employeeId"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Employee ID"
                  defaultValue=""
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="hoursPerWeek"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="outlined-required"
                  label="Hours of work per week"
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Calculate Wage per week
            </Button>
          </ListItem>
          {employee && <>
            <ListItem>
              <Alert severity="info" style={{ width: '100%' }}>
                <AlertTitle>{employee.employeeName} wage for that week</AlertTitle>
                $ {employee.calculateWage(watch('hoursPerWeek'))}
              </Alert>
            </ListItem>
            <ListItem>
              <Alert severity="warning" style={{ width: '100%' }}>
                <AlertTitle>{employee.employeeName} tax for that week</AlertTitle>
                $ {Employee.calculateTax(employee.calculateWage(watch('hoursPerWeek')))}
              </Alert>
            </ListItem>
          </>}
        </List>
      </form>
    </div>
  )
}

export default CalculateWageForm;