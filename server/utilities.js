const jwt = require('jsonwebtoken');

function authenticateToken (req , res , next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)


    if(!token) return res.sendStatus(401) , console.log('unable to find token you need to login firsst');
    
   
   
   try {
     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user)=>{
        if(err) return  console.log(err)
            req.user = user;
        console.log('token verified')
        next();
        
    })

   } catch (error) {
    console.log(error , 'error in authentication')
   }
   
   


}
module.exports = {
    authenticateToken 
}