const { verify } = require("jsonwebtoken");
const  verifyToken=(req,res,next)=>{
    let bearerHeader=req.headers["authorization"];
   if(typeof bearerHeader!=="undefined"){
       let bearer=bearerHeader.split(" ");
       let token=bearer[1];
       req.token=token;
         verify(req && req.token,"aqjdwehjferfejhrfher",(error,decoded)=>{
         console.log(decoded)
            if(error){
                return res.send({error:true,statusType:'expired',status:401,message:"Invalid Token"})
            }
            next();
         });
       
       
   }else{
       console.log("Access Denied unauthorized user");
       res.json({
           error:true,
           status:403,
           statusType:'unauthorized',
           message:'Access Denied unauthorized user'
       });
   }
}
module.exports={
   verifyToken
}