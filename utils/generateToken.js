const jwt=require('jsonwebtoken');
const generateToken=async(payload)=>{
    const token= await jwt.sign({
        data: payload
      }, "aqjdwehjferfejhrfher", { expiresIn: '1h' });
      return token;
}

module.exports={generateToken}