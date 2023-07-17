const { blogUploadImg } = require("../routes/upload.route");
const {
  getBlogsListServices,
  createPostServices,
  getCategoryListServices,
  draftToPublishServices,
  getBlogByIdServices,
  getLatestBlogsListServices,
  getAllBlogsByCategoryListServices,
  getLatestBlogsThreeServices,
  blogToUnPublishServices,
} = require("../services/blogs.services");

const createPostController = async (req, res) => {
  const { body, files } = req;
  const getData = await blogUploadImg(files);
  let reqBodyData = { body, getData };
  const resultSet = await createPostServices(reqBodyData);
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

const getBlogsController = async (req, res) => {
  const resultSet = await getBlogsListServices();
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
const getCategoryController = async (req, res) => {
  const resultSet = await getCategoryListServices();
  try {
    if (resultSet.length > 0) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Data found",
        result: resultSet,
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
const draftToPublishController = async (req, res) => {
  const resultSet = await draftToPublishServices(req.body);
  try {
    if (resultSet === 1) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "published successfully",
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
const blogToUnPublishController = async (req, res) => {
  const resultSet = await blogToUnPublishServices(req.body);
  try {
    if (resultSet === 1) {
      res.status(200).send({
        status: 200,
        statusType: 1,
        message: "Unpublished successfully",
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
const getBlogsByIdController = async (req, res) => {
  const resultSet = await getBlogByIdServices(req.body);
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
const getLatestBlogsController = async (req, res) => {
  const resultSet = await getLatestBlogsListServices();
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

const getLatestThreeBlogsController = async (req, res) => {
  const resultSet = await getLatestBlogsThreeServices();
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

const getAllBlogsByCategoryController = async (req, res) => {
  const resultSet = await getAllBlogsByCategoryListServices(req && req.body);
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
  createPostController,
  getBlogsController,
  getCategoryController,
  draftToPublishController,
  getBlogsByIdController,
  getLatestBlogsController,
  getAllBlogsByCategoryController,
  getLatestThreeBlogsController,
  blogToUnPublishController,
};
