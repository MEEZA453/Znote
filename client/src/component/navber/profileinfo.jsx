import { useEffect } from 'react'
import {getInitials} from '../../utils/helper.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
export default function ProfileInfo({userDeta , founderName}){
    const navigate = useNavigate()
   
    const onLogout = ()=>{
      localStorage.setItem('token' , '')
        navigate('/')

    }
    

    return <div className = 'flex items-center gap-3 pr-3'>
       <div className = 'w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
     {getInitials(founderName)}
       </div>
       <div className = 'text-xs font-bold '>
       <p className = 'leading-3'>
        {founderName}
        </p>
        <button className = 'underline font-normal' onClick = {onLogout}>Logout</button>
       </div>
    </div>
}