
require('dotenv').config();
const config = require('./config.json')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors') ;
const jwt = require('jsonwebtoken');
const user = require('./models/userModel.js')
const Note = require('./models/note-model.js')
const cookie = require('cookie-parser')
const {authenticateToken} = require('./utilities');
mongoose.connect(config.connectionString)
.then(()=>{console.log('database connected successfully')})
.catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT
const App = express()
App.use(express.json())
App.use(cors({
    origin : '*'
}))




App.get('/'  ,  async (req,res)=>{

const user = req.user ;


    const note = await Note.find().sort({isPinned : -1});
    res.json({
        note : note , 
        user : user ,
    })
})
App.get('/userdetails', async (req , res)=>{
  const person =  await user.find()

res.json(person)

})
App.post('/create-account' , async (req , res)=>{
   
    console.log('reached to the create account page')
    const {fullName , email  , password } = req.body ; 
    console.log(fullName , email , password)
    if(!fullName){
    return  res.status(400).json('fullname is required')
    }
    if(!email){
        return        res.status(400).json('email is required')
        }
    if(!password) {
        return res.status(400).json('password is required')

    }

 const isUser =  await user.findOne({email : email});
if(isUser){
    return console.log('user already exists')
    
}
const User = await user.create({
    fullName , email , password
});
const accessToken = jwt.sign({User} , process.env.ACCESS_TOKEN_SECRET , {
    expiresIn : '3600m',
})
return res.json( { error : false , user , accessToken , message : 'Registration SuccessFully'}),
console.log('account created successfully ')

})

App.post('/login'  ,     async (req , res)=>{
    try{
        console.log('reached to the login route')
        const {email , password} = req.body;
        console.log(email , password)
        if(!email){
            return res.status(400).json('email required');
            console.log('email required')
    
        }
        if(!password){
            return res.status(400).json('password is required')
        }
     const foundUser = await user.findOne({email : email })
    if(!foundUser){
        console.log('user not found')
        res.status(400).json('user not found')
    } 
    if(foundUser.email == email , foundUser.password == password){
     const user = { user : foundUser}
     const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {
    
     })
    
    
    
     console.log('login successfully')
     console.log(accessToken)
     return res.json({
        error : false , 
        message : 'login sucessfully',
        email , 
        accessToken,
    
    })
    }else{
        return res.status(400).json({
            error :   true ,
            message : 'Invailed Credential',
        })
    }

    }catch(err){
console.log(err)
    }
   

})
App.post('/add-note'  ,    async (req , res)=>{
  try {
    console.log('reached to the add note');
    const {title , content , tags , isPinned , userId , createdOn}  = req.body 
   
if(!title){
res.json('title is required')
}
if(!content){
    res.json('content is required')
    } 
     
 let note = await Note.create(
       { title , content , tags , isPinned , userId , createdOn }
    )

    console.log(note , '....created sucessfully')
    console.log(note._id)
    const id = note._id
    res.json({
     id
    })  
  } catch (error) {
    console.log(error)
  }
   

})
App.patch('/edit-note/:id'   , authenticateToken  ,async (req , res)=>{
console.log('reached to the edit-note post')
const {id} = req.params;
const {title , content , tags , isPinned} = req.body ;

try {
    
    const note = await Note.findOne({_id : id});
    console.log(note);
    
    
    if(!title && !content && !tags){
        return res.status(400).json('no changes provide');
    
    
    
    }
    if(title){
    note.title = title;
    
    }
    if(content){
        note.content = content;
        
    }
    if(tags){
            note.tags = tags;
            
     }
     await note.save();
     res.json({
        error : false ,
        note , 
        message : 'Note updated sucessfully'
    
     })
     console.log('userUpdated successfully')

} catch (error) {
    console.log('scene ho gaya' , error.message)
}


})
App.delete('/delete-note/:id'  , async(req , res)=>{
    console.log('reached to the delete post route')
    const {id} = req.params ;

    try {
        const note = await Note.findOne({_id : id})
    if(!note){
        return res.status(400).json('user not found for delete')

    }
    await Note.deleteOne({_id : id });
console.log('user deleted sucessfully')
res.json('user deleted succcessfully')

    } catch (error) {
        console.log('scene ho gaya' , error.message)
    }
})



App.patch( '/pin-note/:id'  , authenticateToken, async (req , res)=>{
    console.log('reached to the pin note ');
    const {id} = req.params ; 
    const note = await Note.findOne({_id : id})

    
    if(!note){
        res.json('post note found');

    }else{
        if(note.isPinned == false){
            note.isPinned = true ; 
        console.log(note.isPinned)
        await note.save()
        }
        
    }
 
})
// App.patch('/pin-note/:id' ,  async (req , res)=>{
//     console.log('reached to the pin post route');
//     const {id} = req.params;
//     const note = await Note.findOne({_id : id})
//     console.log(note);
//     if(!note){
//         res.json('post note found');
//     }
//     if(note.isPinned == false){
//  note.isPinned = true , 
//  await note.save()
//  console.log('note in unpinned')
//     }

//  note.isPinned =  false ,
//  await  note.save()
//  console.log('note pinned')
 
// })







const PORT  = 3000 || port ;

App.listen( PORT  , ()=>{console.log('App started')})

module.exports = App ;
