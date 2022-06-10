const GET_ALL_EMPLOYEES_QUERY = `
  SELECT 
    E.idEmployee,
    E.name,
    E.ratePerHour,
    E.expireDate,
    E.registrationNumber,
    ET.name AS EmployeeTypeName,
    B.name AS BranchName
  FROM Employee E
  INNER JOIN Employee_Type ET
    ON E.Employee_Type_idEmployee_Type=ET.idEmployee_Type
  RIGHT JOIN Branch B 
    ON E.Branch_idBranch = B.idBranch
  Order By E.idEmployee;
`

const GET_EMPLOYEE_BY_ID_QUERY = `
  SELECT 
    E.idEmployee,
    E.name,
    E.ratePerHour,
    E.expireDate,
    E.registrationNumber,
    ET.name AS EmployeeTypeName,
    B.name AS BranchName
  FROM Employee E
  INNER JOIN Employee_Type ET
    ON E.Employee_Type_idEmployee_Type=ET.idEmployee_Type
  RIGHT JOIN Branch B 
    ON E.Branch_idBranch = B.idBranch
  Order By E.idEmployee
  WHERE E.idEmployee = <id>;
`

const NEW_EMPLOYEE_QUERY = `INSERT INTO Employee (name, ratePerHour, expireDate, registrationNumber, Employee_Type_idEmployee_Type, Branch_idBranch) VALUES `

//TODO
const UPDATE_EMPLOYEE_QUERY = `UPDATE Employee SET`

const DELETE_EMPLOYEE_QUERY = `DELETE FROM Employee WHERE idEmployee = ?`;

export {
  GET_ALL_EMPLOYEES_QUERY,
  GET_EMPLOYEE_BY_ID_QUERY,
  NEW_EMPLOYEE_QUERY,
  UPDATE_EMPLOYEE_QUERY,
  DELETE_EMPLOYEE_QUERY,
}