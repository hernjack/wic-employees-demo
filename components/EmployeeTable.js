import React, { useState } from 'react';
import {
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const EmployeeTable = ({ data, onAdd, onEdit, onDelete }) => {

  const rows = data|| []

  const columns = [
    { field: 'employeeId', headerName: 'Id', width: 150 },
    { field: 'employeeName', headerName: 'Name', width: 200 },
    { field: 'ratePerHour', headerName: 'Rate per Hour', width: 150 },
    { field: 'registrationNumber', headerName: 'Registration No.', width: 150 },
    { field: 'expireDate', headerName: 'Expire date', width: 200,
    renderCell: (cell) => {
      if (!cell.value) return null;

      const date = `${new Date(cell.value).getUTCMonth()}/${new Date(cell.value).getUTCDate()}/${new Date(cell.value).getUTCFullYear()}`;
      return <>{date}</>
      }
    },
    {
      field: 'Actions', width: 225,
      renderCell: (value) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="contained"
              color="warning"
              endIcon={<EditIcon />}
              onClick={(event) => {
                onEdit(event, value);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteForeverIcon />}
              onClick={(event) => {
                onDelete(event, value);
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
    <div style={{ height: 500, width: '100%', margin: '0.5rem', display: 'flex', flexFlow: 'column' }}>
      <Button
        style={{ margin: '0.5rem 0', width: '25%', alignSelf: 'flex-end'}}
        variant="contained"
        color="success"
        endIcon={<EditIcon />}
        onClick={onAdd}
      >
        Add Employee
      </Button>
      <DataGrid
        getRowId={(row) => row?.employeeId}
        rows={rows}
        columns={columns}
      />
    </div>
  )
}

export default EmployeeTable;