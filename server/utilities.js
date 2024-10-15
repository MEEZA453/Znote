const jwt = require('jsonwebtoken');

function authenticateToken (req , res , next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];



    if(!token) return res.sendStatus(401) ;
    
   
   try {
     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user)=>{
        if(err) return  console.log(err)
            req.user = user;
        next();
        
    })

   } catch (error) {
    console.log(error , 'error in authentication')
   }
   
   


}
module.exports = {
    authenticateToken 
}