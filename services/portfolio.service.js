const { configDb } = require("../config/dbConfig");
const mysql = require("mysql2/promise");
const saveUpdatePortfolioServices = async (reqBody) => {
  const { timeLineDataList, tools, services, ...data } = reqBody;
  // Create Connection
  const connection = await mysql.createConnection(configDb);
  try {
    const query = `insert into jabit_portfolio
    (pid,title,description,overview,company_name,company_desc,requirements,duration,
    project_details,project_desc,challenges,conclusion,created_on,status) 
    values("${data.portfolioId}","${data.portfolioTitle}","${data.portfolioDesc}","${data.overview}",
    "${data.companyDesc}","${data.companyOverview}","${data.requirements}","${data.duration}",
    "${data.projectDetails}","${data.projectDesc}","${data.challenges}",
    "${data.conclusion}",NOW(),1) `;
    //console.log(query)
    const [result] = await connection.execute(query);
    const pId = data && data.portfolioId;
    //Insert Timeline
    if (timeLineDataList && Array.isArray(timeLineDataList)) {
      let timlineQuery = "";
      for (let i = 0; i < timeLineDataList.length; i++) {
        console.log(timeLineDataList[i].title);
        timlineQuery = `insert into jabit_project_timeline (pid,index_id,timeline_title,timeline_date,timeline_desc,status) 
            values("${pId}","${timeLineDataList[i].id}","${timeLineDataList[i].title}","${timeLineDataList[i].timelineDate}","${timeLineDataList[i].timeLineDesc}",1)`;
        const [result] = await connection.execute(timlineQuery);
      }
    }
    //insert tools
    if (tools && Array.isArray(tools)) {
      let toolsQuery = "";
      for (let j = 0; j < tools.length; j++) {
        toolsQuery = `insert into jabit_project_tools (pid,tool_name,status) 
            values("${pId}","${tools[j]}",1)`;
        const [result] = await connection.execute(toolsQuery);
      }
    }
    // Insert services
    if (services && Array.isArray(services)) {
      let servicesQuery = "";
      for (let k = 0; k < services.length; k++) {
        servicesQuery = `insert into jabit_project_services (pid,service_name,status) 
            values("${pId}","${services[k]}",1)`;
        const [result] = await connection.execute(servicesQuery);
      }
    }
    connection.end();
    return 1;
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

// insert portfolio images
const savePortfolioImages = async (data) => {
  const connection = await mysql.createConnection(configDb);
  try {
    const insertQuery = `insert into jabit_project_images(pid,img_name,img_path,full_url_path,status)
    values ("${data.portfolioId}","${data.fileName}","${data.pathName}","${data.fullUrl}",1)`;
    const [result]=await connection.execute(insertQuery);
    connection.end();
    return 1;
  } catch (error) {
    connection.end();
    console.log(error);
  }
}

// Get Portfolio published List
const getPortfolioPublishListServices = async () => {
  const connection = await mysql.createConnection(configDb);
  try {
    // published portfolio list
    const query = `select jp.*,jpi.full_url_path from  jabit_portfolio jp inner join jabit_project_images jpi on jp.pid = jpi.pid where jp.status=1`;
    const [result] = await connection.execute(query);
    // Portfolio images 
    const queryImges = `select * from jabit_project_images where status=1`;
    const [resultImg] = await connection.execute(queryImges);
    // Portfolio Timeline
    const queryTimeline = `select * from jabit_project_timeline where status=1`;
    const [resultTimeline] = await connection.execute(queryTimeline);
    // Portfolio Services
    const queryServices = `select * from jabit_project_services where status=1`;
    const [resultServices] = await connection.execute(queryServices);
    // Portfolio Tools
    const queryTools = `select * from jabit_project_tools where status=1`;
    const [resultTools] = await connection.execute(queryTools);

    connection.end();
    return [{ portfolioList: result, portfolioImg: resultImg,portfolioTimeline:resultTimeline,portfolioServices:resultServices,portfolioTools:resultTools }]
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
// Get publish and unpublished list
const getPortfolioUnpublishListServices = async () => {
  const connection = await mysql.createConnection(configDb);
  try {
    // published portfolio list
    const query = `select * from  jabit_portfolio where status=0`;
    const [result] = await connection.execute(query);
    // Portfolio images 
    const queryImges = `select * from jabit_project_images where status=0`;
    const [resultImg] = await connection.execute(queryImges);
    // Portfolio Timeline
    const queryTimeline = `select * from jabit_project_timeline where status=0`;
    const [resultTimeline] = await connection.execute(queryTimeline);
    // Portfolio Services
    const queryServices = `select * from jabit_project_services where status=0`;
    const [resultServices] = await connection.execute(queryServices);
    // Portfolio Tools
    const queryTools = `select * from jabit_project_tools where status=0`;
    const [resultTools] = await connection.execute(queryTools);
    connection.end();
    return [{ portfolioList: result, portfolioImg: resultImg,portfolioTimeline:resultTimeline,portfolioServices:resultServices,portfolioTools:resultTools }]
  } catch (error) {
    connection.end();
    console.log(error);
  }
};

const getPortfolioByIdServices = async (req) => {
  const {...data}=req;
  const connection = await mysql.createConnection(configDb);
  try {
    // published portfolio list
    const query = `select * from  jabit_portfolio where pid="${data.pId}" and status=1`;
    const [result] = await connection.execute(query);
    // Portfolio images 
    const queryImges = `select * from jabit_project_images where pid="${data.pId}" and  status=1`;
    const [resultImg] = await connection.execute(queryImges);
    // Portfolio Timeline
    const queryTimeline = `select * from jabit_project_timeline where pid="${data.pId}" and  status=1`;
    const [resultTimeline] = await connection.execute(queryTimeline);
    // Portfolio Services
    const queryServices = `select * from jabit_project_services where pid="${data.pId}" and  status=1`;
    const [resultServices] = await connection.execute(queryServices);
    // Portfolio Tools
    const queryTools = `select * from jabit_project_tools where pid="${data.pId}" and  status=1`;
    const [resultTools] = await connection.execute(queryTools);

    connection.end();
    return [{ portfolioList: result, portfolioImg: resultImg,portfolioTimeline:resultTimeline,portfolioServices:resultServices,portfolioTools:resultTools }]
  } catch (error) {
    connection.end();
    console.log(error);
  }
};


module.exports = {
  saveUpdatePortfolioServices,
  savePortfolioImages,
  getPortfolioPublishListServices,
  getPortfolioUnpublishListServices,
  getPortfolioByIdServices
};
