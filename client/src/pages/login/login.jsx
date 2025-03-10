import Navber2 from '../../component/navber/navber2.jsx'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import PassInput from '../../component/input/passwordinput.jsx'
import { validEmail } from '../../utils/helper.jsx'
import axiosInstance from  '../../utils/axiosinstance.js'
import Loader from '../../component/loading.jsx'
import axios from 'axios'
export default function Login (){
    let [email , setEmail] = useState('')
let [password , setPassword] = useState('')
let [error , setError] = useState('')
const [loading , setLoading] = useState(false)
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


const handleLoginApi = async () => {
    const url = 'https://znote-9.onrender.com/login';
    const loginData = {
      email: email,
      password: password
    };

    try {
      setLoading(true)
      const response = await axios.post(url, loginData);
      localStorage.setItem("token" , response.data.accessToken)
      if(response) setLoading(false)
      nevigate('/dashboard')
        } catch (error) {
      // Handle any errors
      setLoading(false)
      console.log(error)
      setError('error hai ' )
    }
  };

    return( <div>
    <Navber2></Navber2>
   {!loading ?  <div  className='flex item-center justify-center mt-20'>
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
    </div> : <div className='w-screen h-screen items-center justify-center flex'><Loader/></div>}
    </div>
    )
}