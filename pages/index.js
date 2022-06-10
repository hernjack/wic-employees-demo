import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import Layout from '../components/Layout'
import TabPanel from '../components/TabPanel';
import mockData from '../utils/data';
import EmployeeTable from '../components/EmployeeTable';
import CalculateWageForm from '../components/CalculateWageForm';
import executeQuery from '../utils/db';
import { GET_ALL_EMPLOYEES_QUERY } from '../utils/queries';
import { fromRawDataToEmployees } from '../utils/translators';
import EmployeeForm from '../components/EmployeeForm';
import axios from 'axios';


const Home = (props) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = (event) => {
    setSelectedEmployee(null)
    setOpen(true)
  };

  const handleEdit = (event, cellValues) => {
    if (!cellValues.row) return

    setSelectedEmployee(cellValues.row)
    setOpen(true)
  };

  const handleDelete = (event, cellValues) => {
    if (!cellValues.row.employeeId) return

    return axios.delete(`/api/employees/${cellValues.row.employeeId}`)
      .then((response) => {
        console.log(response)
        onClose();
        reset({})
      })
      .catch((e) => { console.log(e) })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const employeesData = props.employees ? props.employees : mockData;

  return (

    <Layout
      title="WIC Employees"
      description="WIC Employees"
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs menu">
          <Tab label="Calculate Wage" />
          <Tab label="Employees List" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{ padding: '0.5rem 0' }}>
        <CalculateWageForm
          data={mockData}
        />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: '0.5rem 0' }}>
        <EmployeeTable
          data={employeesData}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <EmployeeForm
        employee={selectedEmployee}
        isOpen={open}
        onClose={handleClose}
      />
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    console.log("------> GET data from DB");
    const result = await executeQuery({
      query: GET_ALL_EMPLOYEES_QUERY,
    });
    console.log("GET EMPLOYEES RAW DATA: ", result);
    const employees = fromRawDataToEmployees(result).map(_ => _.getInfo());
    return {
      props: {
        employees,
      },
    };
  } catch (error) {
    console.log(error);
    const employees = fromRawDataToEmployees(mockData).map(_ => _.getInfo());
    return {
      props: {
        employees,
      },
    };;
  }
}

export default Home;