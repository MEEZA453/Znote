import Navber2 from '../../component/navber/navber2.jsx'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import PassInput from '../../component/input/passwordinput.jsx'
import { validEmail } from '../../utils/helper.jsx'
import axiosInstance from  '../../utils/axiosinstance.js'
import axios from 'axios'
export default function Login (finder , setFinder){
  console.log(finder.setFinder)
    let [email , setEmail] = useState('')
let [password , setPassword] = useState('')
let [error , setError] = useState('')
const [responseMessage, setResponseMessage] = useState('');
const nevigate = useNavigate()
const handleLogin = async (e)=>{
e.preventDefault()
if(!email){
    setError('please enter a valid email address')
} 
if(!password){
    setError('please enter your password')
}
if(!password && !email){
    setError('please fill up the form')
}

else{
setError('')
}

}


axios.get('https://example.com/data', {
  timeout: 20000  // Timeout set to 20 seconds
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});

const handleLoginApi = async () => {
    const url = 'http://localhost:3000/login';
    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(url, loginData);
      finder.setFinder(response.data.email)
      // console.log(finder.finder)
      // localStorage.setItem("token" , response.data.accessToken)
      nevigate('/dashboard')
        } catch (error) {
      // Handle any errors
      console.log(error)
      setError('error hai ' )
    }
  };

//     // login API call
//    function handleLoginApi (){ try {
//       const response = axiosInstance.post('/login', {
//         email : email , 
//         password : password, 
//     }) 


//       //Handle successfull login response
//       if(response.data && response.data.accessToken){
//         console.log(response.data)
//         localStorage.setItem("token" , response.data.accessToken)
//         nevigate('/dashboard');
//     }else{
//         console.log('happend ')
//     }
//     } catch (error) {
//         if(error.response && error.response.data && error.response.data.message){
//             setError(error.response.data.message0);
//         }else{
//             setError('An unexpected error occured , Please try again');
//         }   
//     }}
    return( <>
    <Navber2></Navber2>
    <div  className='flex item-center justify-center mt-20'>
        <div className= 'w-96  rouded bg-white px-7 py-10'>
            <form onSubmit  = {handleLogin}>
                <h4 className = 'text-2xl pb-5'>Login</h4>
                <input type="text" placeholder='Email' value = {email} className = ' w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'  onChange ={(e)=>setEmail(e.target.value)}/>
                <PassInput placeholder ='Password' value = {password} onChange = {(e)=>setPassword(e.target.value)}></PassInput>
        <p className = 'text-red-500 text-xs pb-1'>{error}</p>
                                <button onClick={handleLoginApi} className= 'btn-primary w-full bg-blue-500 p-2 rounded my-1 hover:bg-blue-700 text-white duration-300'>Login</button>
                            </form>
                <p className = 'text-sm text-center mt-4'>Not register yet ? <Link to = '/signup' className = ' font-medium text-blue-500 underline'>Create a Account</Link></p>
            
        </div>
    </div>
    </>
    )
}