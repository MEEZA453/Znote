import {useState} from 'react' 
import TagInput from "../input/taginput"
import {MdClose} from 'react-icons/md'
import axios from 'axios'
import { useEffect } from 'react'
export default function AddNote({onClose , noteData ,  close , type , userDeta , currentId  
}){
let [title , setTitle] = useState('')
let [content , setContent] = useState('');
let [error , setError] = useState()
let [tags , setTags] = useState([])
const foundUser = userDeta.find((user)=>user._id === currentId )


const editNote =  async ()=>{
    console.log(currentId)


  const url = `http://localhost:3000/edit-note/${currentId}`;
  const id = currentId;
  const data = {
    title , 
    content ,   
    tags , 

  }
  try {
    const response = await axios.patch(url , data , id)
    console.log(response.data)
    close(false)
    
  } catch (error) {
    console.log(error.message)
  }
  


}
useEffect(()=>{

    
},[editNote])

const addNewNote =  async ()=>{
console.log(type)
const url = 'http://localhost:3000/add-note';
const data = {
    title ,
    content,
    tags ,
    userId : 23234424 , 
}
try {
    const response = await axios.post(url , data)

     
} catch (error) {
    console.log(error)
}
}

let handleAddNote = ()=>{
    if(!title){
        setError('enter your title ')
    }
    if(!content){
        setError('please add the content')
    }
    if(title && content){
        setError('note added ')
        onClose()
    }
    if(type === 'edit'){
        editNote()
    }else{
        addNewNote()

    }
   
}

//api handle 


    return <div className = 'relative'>
        <button className = 'absolute right-3 top-2'onClick={onClose}><MdClose size = {20} ></MdClose></button>
        <div className = 'flex flex-col gap-2'>
            <label className = 'text-xs text-slate-500'>TITLE</label>
            <input className = 'text-2xl text-slate-950 outline-none' value={title} onChange = {(e)=>setTitle(e.target.value)} placeholder = 'Go to Gym'/>
            
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className='text-xs text-slate-500'>CONTENT</label>
            <textarea rows={10} type = 'text' onChange = {(e)=>setContent(e.target.value)} value = {content} className ='text-sm text-slate-950 outline-none bg-slate-50 rounded p-2'placeholder = 'Content'></textarea>
        </div>
      { <p className = 'text-red-500 text-xs pt-4'>{error}</p>}
        <div className='mt-3'>


        <label className= 'text-xs text-slate-500'>TAGS</label>

        <TagInput tags = {tags} setTags ={setTags}/>
        </div>
        <button className = 'bg-blue-500 font-medium mt-5 text-white rounded-md  w-full p-3' onClick={handleAddNote}>ADD</button>
    
    </div> 
}