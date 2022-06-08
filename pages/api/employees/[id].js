import executeQuery from '../../../utils/db'
import nc from 'next-connect';
import { fromRawDataToEmployees } from '../../../utils/translators';
import { GET_ALL_EMPLOYEES_QUERY, GET_EMPLOYEE_BY_ID_QUERY } from '../../../utils/queries';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.get(async (req, res) => {
  try {
    console.log("------> GET data from DB");
    const result = await executeQuery({
      query: GET_EMPLOYEE_BY_ID_QUERY.replace('<id>', req.query.id),
    });
    console.log("GET SINGLE EMPLOYEE BY ID RAW DATA: ", result);
    res.send(fromRawDataToEmployees(result));
  } catch (error) {
    console.log(error);
  }
});

export default handler;