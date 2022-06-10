import { fromRawDataToEmployees, getEmployeeMapFromFormData } from '../../../utils/translators';
import { GET_ALL_EMPLOYEES_QUERY, NEW_EMPLOYEE_QUERY } from '../../../utils/queries';
import nc from 'next-connect';
import executeQuery, { db } from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  try {
    console.log("------> GET data from DB");
    
    const result = await executeQuery({
      query: GET_ALL_EMPLOYEES_QUERY,
    });

    console.log("GET EMPLOYEES RAW DATA: ", result);
    res.send(fromRawDataToEmployees(result));
  } catch (error) {
    console.log(error);
  }
});

handler.post(async (req, res) => {
  try {
    console.log("------> POST new Employee to DB");
    console.log("req body", req.body)
    
    const newEmployee = getEmployeeMapFromFormData(req.body);
    const query = `${NEW_EMPLOYEE_QUERY} ('${newEmployee.name}', ${newEmployee.ratePerHour}, '${newEmployee.expireDate}', '${newEmployee.registration}', ${newEmployee.employeeType}, 1);`
    const result = await db.transaction()
      .query(query)
      .commit()
    await db.end();

    console.log("CREATE EMPLOYEE: ", result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(result)
  }
});

export default handler;