import Navber2 from "../../component/navber/navber2.jsx"
import {useState} from 'react' 
import PassInput from '../../component/input/passwordinput.jsx'
import {Link , useNavigate} from 'react-router-dom'
import Loader from "../../component/loading.jsx"
import axios from 'axios' 
export default function Signup(){
    const navigate  = useNavigate()
     let [fullName , setFullName] = useState('')
    let [email , setEmail] = useState('')
let [password , setPassword] = useState('')
let [loading , setLoading] = useState(false)
let [error , setError] = useState('')
const handleSubmit = async (e)=>{
e.preventDefault()
if(!email){
    setError('please enter a valid email address')
}
if(!password){
    setError('please enter your password')
}
if(!fullName){
    setError('Enter your name')
}

}


//handle api 
 
const handleCreateAccountApi = async()=>{
    const url = 'https://znote-9.onrender.com/create-account'
    const accountData = {
        fullName , email , password
    }
    try {
        setLoading(true)
        const response = await axios.post(url , accountData)
        console.log(response.data)
        localStorage.setItem('token' , response.data.accessToken)
        if(response) setLoading(false)
        navigate('/')


    } catch (error) {
        
    }
}





    return( <>
         <Navber2></Navber2>
         {!loading ? <div  className='flex item-center justify-center mt-20'>
        <div className= 'w-96  rouded bg-white px-7 py-10'>
            <form onSubmit  = {handleSubmit}>

                <h4 className = 'text-2xl pb-5'>SignUp</h4>
            <input type="text" placeholder='Name' value = {fullName} className = ' w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'  onChange ={(e)=>setFullName(e.target.value)}/>
                <input type="text" placeholder='Email' value = {email} className = ' w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'  onChange ={(e)=>setEmail(e.target.value)}/>
                <PassInput placeholder ='Password' value = {password} onChange = {(e)=>setPassword(e.target.value)}></PassInput>
         <p className = 'text-red-500 text-xs pb-1'>{error}</p>
                                <button onClick = {handleCreateAccountApi} type= 'submit' className= 'btn-primary w-full bg-blue-500 p-2 rounded my-1 hover:bg-blue-700 text-white duration-300'>Create Account</button>
                            </form>
                <p className = 'text-sm text-center mt-4'>Already have an account? <Link to = '/' className = ' font-medium text-blue-500 underline'>Login</Link></p>
               
        </div>
    </div> : <div className='w-screen h-screen items-center justify-center flex'><Loader/></div>}
    </>)
}