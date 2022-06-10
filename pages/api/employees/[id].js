import { DELETE_EMPLOYEE_QUERY, UPDATE_EMPLOYEE_QUERY, GET_EMPLOYEE_BY_ID_QUERY } from '../../../utils/queries';

import nc from 'next-connect';
import executeQuery, { db } from '../../../utils/db';
import EMPLOYEE_TYPES from '../../../utils/constants';
import { getEmployeeMapFromFormData } from '../../../utils/translators';

const handler = nc();

handler.delete(async (req, res) => {
  try {
    console.log("------> DELETE EMPLOYEE from DB");
    console.log("req query", req.query)

    const result = await executeQuery({
      query: DELETE_EMPLOYEE_QUERY,
      values: [req.query.id]
    });
    
    console.log("DELETED SINGLE EMPLOYEE BY: ", result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

handler.put(async (req, res) => {
  try {
    console.log("------> UPDATE EMPLOYEE from DB");
    console.log("req body", req.body)
    console.log("req query", req.query)

    const employee = getEmployeeMapFromFormData(req.body);
    const query = `${UPDATE_EMPLOYEE_QUERY} name='${employee.name}', ratePerHour=${employee.ratePerHour}, ${employee.expireDate ? "expireDate='" + employee.expireDate + "'" : null}, ${employee.registration ? "registrationNumber='" + employee.registration + "'" : null}, Employee_Type_idEmployee_Type=${employee.employeeType} WHERE idEmployee = ${req.query.id};`
    const result = await db.transaction()
      .query(query)
      .commit()
    await db.end();

    res.status(200).send(result);
    console.log("UPDATED SINGLE EMPLOYEE BY: ", result);
    res.send((result));
  } catch (error) {
    console.log(error);
  }
});

handler.get(async (req, res) => {
  try {
    console.log("------> GET data from DB");
    const result = await executeQuery({
      query: GET_EMPLOYEE_BY_ID_QUERY,
      value: [req.query.id]
    });
    console.log("GET SINGLE EMPLOYEE BY ID RAW DATA: ", result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

export default handler;