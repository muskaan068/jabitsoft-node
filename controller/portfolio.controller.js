const { blogUploadImg, portfolioImgUpload } = require("../routes/upload.route");
const {
  saveUpdatePortfolioServices,
  getPortfolioPublishListServices,
  getPortfolioUnpublishListServices,
  getPortfolioByIdServices,
} = require("../services/portfolio.service");

const saveUpdatePortfolioController = async (req, res) => {
  const { body } = req;
  let reqBodyData = body;
  const resultSet = await saveUpdatePortfolioServices(reqBodyData);
  try {
    if (resultSet === 1) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Uploaded Successfully",
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
const getPortfolioListController = async (req, res) => {
  const published = await getPortfolioPublishListServices();
  const unPublished = await getPortfolioUnpublishListServices();
  const portfolioList = [{ published }, { unPublished }];
  try {
    if (portfolioList.length > 0) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Data found",
        result: portfolioList,
      });
    } else {
      res.status(404).send({
        status: 404,
        statusType: 1,
        message: "Data not found",
        result: portfolioList,
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

// Serve controller for public route as get all portfolio list
const getPortfolioPublicListController = async (req, res) => {
  const published = await getPortfolioPublishListServices();
  try {
    if (published.length > 0) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Data found",
        result: published,
      });
    } else {
      res.status(404).send({
        status: 404,
        statusType: 1,
        message: "Data not found",
        result: published,
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

// Get By Id

const getPortfolioByIdController = async (req, res) => {
  const { body } = req;
  console.log(body);
  const GetDataById = await getPortfolioByIdServices(body);
  try {
    if (GetDataById.length > 0) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Data found",
        result: GetDataById,
      });
    } else {
      res.status(404).send({
        status: 404,
        statusType: 1,
        message: "Data not found",
        result: GetDataById,
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
  saveUpdatePortfolioController,
  getPortfolioListController,
  getPortfolioPublicListController,
  getPortfolioByIdController,
};
