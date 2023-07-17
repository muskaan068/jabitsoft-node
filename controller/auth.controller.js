const {
  loginServices,
  loginVerfyServices,
} = require("../services/auth.service");
const { generateToken } = require("../utils/generateToken");
const loginController = async (req, res) => {
  console.log(req.body)
  const resultSet = await loginServices(req.body);
 // console.log(resultSet)
  try {
    if (resultSet.length > 0) {
      const token = await generateToken(resultSet[0]);
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "login successfully",
        // result:resultSet && resultSet[0],
        token: token,
      });
    }
    if (resultSet === 0) {
      res.status(200).send({
        status: 200,
        statusType: 0,
        message: "Sorry adminId and password incorrect!",
        // result:resultSet
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "something went wrong"+error,
      status: 500,
      statusType: -1,
    });
  }
};
//login verification
const loginVerifyController = async (req, res) => {
  const resultSet = await loginVerfyServices(req.body);
  try {
    if (resultSet === 1) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "verification successfully done!",
        // result:resultSet && resultSet[0],
      });
    }
    if (resultSet === 0) {
      res.status(200).send({
        status: 200,
        statusType: 0,
        message: "Security Code not valid!",
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

module.exports = { loginController, loginVerifyController };
