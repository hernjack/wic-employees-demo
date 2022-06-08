import executeQuery from '../../../utils/db'
import nc from 'next-connect';
import { fromRawDataToEmployees } from '../../../utils/translators';
import { GET_ALL_EMPLOYEES_QUERY } from '../../../utils/queries';

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
  // await db.connect();
  // const newOrder = new Order({
  //   ...req.body,
  //   user: req.user._id,
  // });
  // const order = await newOrder.save();
  // res.status(201).send(order);
  try {
    console.log("------> POST new Employee to DB");
    console.log("req body", req.body)
    
    // const result = await executeQuery({
    //   query: POST_NEW_EMPLOYEE
    //     .replace('<name>', name),
    // });
    // res.status(201).send(result);
    res.status(201).send('OK');
  } catch (error) {
    console.log(error);
  }
});

export default handler;