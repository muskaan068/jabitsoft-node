const { getDasboardStatsServices } = require("../services/dashboard.services");

  const getDashboardController = async (req, res) => {
    const resultSet = await getDasboardStatsServices();
    try {
        
        if (resultSet.length>0) {
            res.status(200).send({
            status: 200,
            statusType: 1,
            message: "Data found",
            result:resultSet[0],
            });
        }
        else{
            res.status(404).send({
                status: 404,
                statusType: 1,
                message: "Data not found",
                result:resultSet,
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
  
  module.exports = { getDashboardController };
  