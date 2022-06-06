import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import Layout from '../components/Layout'
import { DataGrid } from '@mui/x-data-grid';
import TabPanel from '../components/TabPanel';
import data from '../utils/data';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };

  const rows = data;

  const columns = [
    { field: 'employeeId', headerName: 'Id', width: 150 },
    { field: 'employeeName', headerName: 'Name', width: 150 },
    { field: 'ratePerHour', headerName: 'Rate per Hour', width: 150 },
    { field: 'Actions', width: 225,
      renderCell: (cellValues) => {
        return(
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<EditIcon />}
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteForeverIcon />}
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Delete 
            </Button>
          </div>
        )
      },
    }
  ];
  
  return (
    <Layout>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs menu">
          <Tab label="Employees List"  />
          <Tab label="Add Employee" />
        </Tabs>
      </Box>
      <TabPanel value={value}  index={0}>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid 
            getRowId={(row) => row.employeeId} 
            rows={rows} 
            columns={columns} 
          />
        </div>
      </TabPanel>
      <TabPanel value={value}  index={1}>
      </TabPanel>
    </Layout>
  )
}
