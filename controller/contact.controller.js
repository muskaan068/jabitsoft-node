const {
  saveContactServices,
  getContactlistServices,
} = require("../services/contact.service");

const saveContactController = async (req, res) => {
  const { body } = req;
  let reqBodyData = { body };
  const resultSet = await saveContactServices(reqBodyData);
  try {
    if (resultSet === 1) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "INSERT Successfully",
      });
    }
    if (resultSet === 0) {
      res.status(200).send({
        status: 200,
        statusType: 0,
        message: "Something went wrong",
        // result:resultSet
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "something went wrong",
      status: 500,
      statusType: -1,
    });
  }
};
const getContactlistController = async (req, res) => {
  const resultSet = await getContactlistServices();
  try {
    if (resultSet.length > 0) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Data found",
        result: resultSet[0],
      });
    } else {
      res.status(404).send({
        status: 404,
        statusType: 1,
        message: "Data not found",
        result: resultSet,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "something went wrong",
      status: 500,
      statusType: -1,
    });
  }
};
module.exports = {
  saveContactController,
  getContactlistController,
};
