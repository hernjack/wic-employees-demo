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


const Home = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
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
          onEdit={handleClick}
          onAdd={handleClick}
          onDelete={handleClick}
        />  
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
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
  }
}

export default Home;