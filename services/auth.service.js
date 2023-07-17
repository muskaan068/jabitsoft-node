const {configDb}=require('../config/dbConfig');
const mysql=require("mysql2/promise");
const loginServices=async(reqBody)=>{
    const {adminId,password}=reqBody;
    // Create Connection
    const connection=await mysql.createConnection(configDb)
    try {
        const query=`select id,admin_id,email,status  from admin_user where admin_id="${adminId}" and password="${password}"`;
        const [result]= await connection.execute(query);
        if(result[0]){
            connection.end();
            return [result[0]];
        }
        else{
           connection.end();
            return 0;
        }
       
    } catch (error) {
        console.log(error)
        connection.end();
        
    }
}
const loginVerfyServices=async(reqBody)=>{
    const {securityCode}=reqBody;
    // Create Connection
    const connection=await mysql.createConnection(configDb)
    try {
        const query=`select * from jabit_code where security_code="${securityCode}"`;
        const [result]= await connection.execute(query);
        if(result[0]){
             connection.end();
            return 1
        }
        else{
            connection.end();
            return 0;
        }
       
    } catch (error) {
        connection.end();
        console.log(error)
    }
}
module.exports={loginServices,loginVerfyServices}