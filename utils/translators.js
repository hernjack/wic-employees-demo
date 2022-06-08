import Employee from "../models/Employee"
import Technician from "../models/Technician";
import Accountant from "../models/Accountant";
import EMPLOYEE_TYPES from "../utils/constants";

const fromRawDataToEmployee = (_) => {
  if (_.EmployeeTypeName === EMPLOYEE_TYPES.TECHNICIAN) {
    return new Technician({
      id: _.idEmployee,
      name: _.name,
      ratePerHour: _.ratePerHour,
      registration: _.registrationNumber,
      expireDate: _.expireDate,
    })
  }

  if (_.EmployeeTypeName === EMPLOYEE_TYPES.ACCOUNTANT) {
    return new Accountant({
      id: _.idEmployee,
      name: _.name,
      ratePerHour: _.ratePerHour,
      registration: _.registrationNumber,
    })
  }

  return new Employee({ id: _.idEmployee, name: _.name, ratePerHour: _.ratePerHour })
}

const fromRawDataToEmployees = (data) => {
  return data.map((_) => fromRawDataToEmployee(_))
}

export {
  fromRawDataToEmployees
}