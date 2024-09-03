import {useState} from 'react'
import {FaRegEye , FaRegEyeSlash} from 'react-icons/fa6'


export default function PassInput({placeholder , value , onChange}){
    const [isShowPassword , setIsShowPassword] = useState(false)
    const toggleIsPassword = ()=>{
        setIsShowPassword(!isShowPassword)
    }
    return <div className = 'flex items-center bg-transparent border-[1.5px] w-full text-sm  px-5 py-3 rounded mb-4 outline-none'>
    <input placeholder={placeholder || 'password'} className = ' w-full  bg-transparent outline-none ' onChange = {onChange} type = {isShowPassword ?'text' : 'password'} />
    { isShowPassword ?<FaRegEye size = {20} className="text-blue-500 cursor-pointer -translate-x-5"  onClick = {()=>toggleIsPassword()}></FaRegEye> : <FaRegEyeSlash size = {20} className = 'text-blue-500 cursor-pointer -translate-x-5' onClick ={()=>toggleIsPassword()}> </FaRegEyeSlash>}
   
   
    </div>}