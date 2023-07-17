const { configDb } = require("../config/dbConfig");
const mysql = require("mysql2/promise");

// Get Blog List
const getDasboardStatsServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // blog status
    const query = `select  (select count(1)  from  jabit_blogs where status=1 ) as totalBlog,
        (select created_on  from  jabit_blogs where status=1 order by id desc limit 1) as blogLatestUpdate,
        (select count(1)  from  jabit_portfolio where status=1 ) as totalPortfolio,
        (select created_on  from  jabit_portfolio where status=1 order by id desc limit 1) as portfolioLatestUpdate,
        (select count(1) from contact_us where status=1) as totalInquiries,
        (select created_on from contact_us where status=1 order by id desc limit 1) as inquiriesLatestUpdate

     group by totalBlog,blogLatestUpdate,totalPortfolio,portfolioLatestUpdate,totalInquiries,inquiriesLatestUpdate`;
    const [result] = await connection.execute(query);
    connection.end();
    return result;
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

module.exports = { getDasboardStatsServices };
