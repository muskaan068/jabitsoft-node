const { configDb } = require("../config/dbConfig");
const mysql = require("mysql2/promise");
// Create New Blog Post
const createPostServices = async (reqBody) => {
  const { body, getData } = reqBody;
  const { ...data } = body;
  const { ...fileData } = getData;
  // Create Connection
  const connection = await mysql.createConnection(configDb);
  try {
    const query = `insert into jabit_blogs (title,cover_img,cover_img_path,
                description,created_on,created_by,status,category) values("${
                  data.titleName
                }","${fileData.fileName}",
                "${fileData.pathName}",${mysql.escape(
      `${data.content}`
    )},NOW(),'admin','${data.status}',"${data.category}")`;
    const [result] = await connection.execute(query);
    connection.end();
    return 1;
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

// Get Blog List
const getBlogsListServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // published blog list
    const query = `select * from  jabit_blogs where status=1 order by id desc`;
    const [result] = await connection.execute(query);
    //draft blog list
    const draftQuery = `select * from  jabit_blogs where status=0 order by id desc`;
    const [draftResult] = await connection.execute(draftQuery);
    connection.end();
    return [{ publishedBlog: result, draftBlog: draftResult }];
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
// Get Category List
const getCategoryListServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // published blog list
    const query = `select * from  blog_category where status=1`;
    const [result] = await connection.execute(query);
    connection.end();
    return result;
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
const draftToPublishServices = async (reqBody) => {
  const { ...data } = reqBody;
  // Create Connection
  const connection = await mysql.createConnection(configDb);
  try {
    if (data && data.type === "publish") {
      const query = `update jabit_blogs set status=1,updated_on=NOW(),created_on=NOW() where id="${data.id}"`;
      const [result] = await connection.execute(query);
      connection.end();
      return 1;
    }
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

const blogToUnPublishServices = async (reqBody) => {
  const { ...data } = reqBody;
  // Create Connection
  const connection = await mysql.createConnection(configDb);
  try {
    if (data && data.type === "unpublish") {
      const query = `update jabit_blogs set status=0,updated_on=NOW(),created_on=NOW() where id="${data.id}"`;

      const [result] = await connection.execute(query);
      connection.end();
      return 1;
    }
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

// Get Blog List
const getBlogByIdServices = async (reqBody) => {
  const { ...data } = reqBody;
  const connection = await mysql.createConnection(configDb);
  try {
    if (data && data.type == "edit") {
      const query = `select * from  jabit_blogs where status=1 and id="${data.id}"`;
      const [result] = await connection.execute(query);
      connection.end();
      return result;
    }
    if (data && data.type == "draft") {
      const query = `select * from  jabit_blogs where status=0 and id="${data.id}"`;
      const [result] = await connection.execute(query);
      connection.end();
      return result;
    }
    if (data && data.type == "read_deatils") {
      const query = `select * from  jabit_blogs where status=1 and id="${data.id}"`;
      const [result] = await connection.execute(query);
      connection.end();
      return result;
    }
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
// Get Blog List
const getLatestBlogsListServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // Latest blog list
    const query = `select * from  jabit_blogs where status=1 order by id desc limit 10`;
    const [result] = await connection.execute(query);
    connection.end();
    return [{ latestBlog: result }];
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

// Get Blog List
const getLatestBlogsThreeServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // Latest blog list
    const query = `select * from  jabit_blogs where status=1 order by id desc limit 3`;
    const [result] = await connection.execute(query);
    connection.end();
    return [{ latestBlog: result }];
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

// Get Blog List
const getAllBlogsByCategoryListServices = async (reqBody) => {
  const { categoryId } = reqBody;
  const connection = await mysql.createConnection(configDb);
  try {
    // Latest blog list
    const query = `select * from  jabit_blogs where status=1 and category="${categoryId}" order by id desc`;
    // console.log(query)
    const [result] = await connection.execute(query);
    connection.end();
    return [{ blogList: result }];
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

module.exports = {
  createPostServices,
  getBlogsListServices,
  getCategoryListServices,
  draftToPublishServices,
  getBlogByIdServices,
  getLatestBlogsListServices,
  getAllBlogsByCategoryListServices,
  getLatestBlogsThreeServices,
  blogToUnPublishServices,
};
