class Employee {
  constructor({employeeId, employeeName, ratePerHour }) {
    this.employeeId = employeeId ?? null;
    this.employeeName = employeeName ?? null;
    this.ratePerHour = ratePerHour ?? null;
  }

  calculateWage(params) {
    return null;
  }
};

export default Employee;

const rows = data;

const columns = [
  { field: 'employeeId', headerName: 'Id', width: 150 },
  { field: 'employeeName', headerName: 'Name', width: 150 },
  { field: 'ratePerHour', headerName: 'Rate per Hour', width: 150 },
];