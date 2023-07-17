const { configDb } = require("../config/dbConfig");
const mysql = require("mysql2/promise");

const saveContactServices = async (reqBody) => {
  const { body } = reqBody;
  const { ...data } = body;
  // Create Connection
  const connection = await mysql.createConnection(configDb);
  try {
    const query = `INSERT into contact_us (name,email,phone,message,created_on,status) VALUES ("${data.fullName}","${data.email}","${data.phone}","${data.message}",NOW(),1)`;

    const [result] = await connection.execute(query);
    connection.end();
    return 1;
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
const getContactlistServices = async (reqBody) => {
  const connection = await mysql.createConnection(configDb);
  try {
    // published blog list
    const query = `select * from  contact_us order by id desc`;
    const [result] = await connection.execute(query);

    connection.end();
    return [result];
  } catch (error) {
    connection.end();
    console.log(error);
  }
};
module.exports = {
  saveContactServices,
  getContactlistServices,
};
