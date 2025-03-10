import {MdOutlinePushPin} from 'react-icons/md'  
import {MdCreate , MdDelete} from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
export default function NoteCard({title , date , content , tags  , onEdit , onDelete    ,  pinning , id , setId  }){
   let [ isPinned  , setIsPinned] = useState(false)


   const handlePinNote =  async ()=>{
    console.log('pin button clicked');
    if(isPinned == false){
     setIsPinned(true)
    setId(id)
    console.log(id);
    const url = `https://znote-9.onrender.com/pin-note/${id}`
    try {
        const response = await axios.patch(url , id)
        console.log(response)
        console.log('all committed')

    } catch (error) {
        console.log(error.message)
        
    }
    }else{
        setIsPinned(false)
    }
   

   }
 const handleNoteDelete = async ()=>{
    console.log('deleted')
    setId(id)
    const url =`https://znote-9.onrender.com/delete-note/${id}`
    try {
const response = await axios.delete(url , id)
console.log(response)
        
    } catch (error) {
        console.log(error.message)
    }
 }
 

//  const handlePinNote = async  ()=>{
//     if(isPinned){
//         setIsPinned(false)

    


//     }else{
//         setIsPinned(true)
// const url  =  `http://localhost:3000/pin-note/${id}`
//  try {
//     const response = await axios.patch(url , id)
//  } catch (error) {
//     console.log(error)
//  }
//     }

//  }
    return    <div className = ' ml-5 border rounded p-4 bg-zinc-50 hover:shadow-xl transition-all ease-in-out items-center'>
        <div className='flex justify-between'>

            <div className=' '>
                <h6 className = 'text-sm font-medium'>{title}</h6>
                <div className = 'text-xs text-slate-500 '>{date}</div>
              
            </div>
            <div>

<MdOutlinePushPin size={22} className ={`icons-btn ${isPinned ? 'text-blue-500' : 'text-slate-300' }`} onClick = {handlePinNote} ></MdOutlinePushPin>
</div>
        </div>
            <p className = ' text-xs text-slate-600 mt-2'> {content?.slice(0 , 60)}</p>
            <div className = 'flex items-center justify-between mt-2'> 
             <div className = 'text-xs text-slate-500'>{tags}</div>
             <div className = 'flex items-center gap-2'>
                <MdCreate className = 'icons-btn text-slate-300 hover:text-slate-600' onClick={onEdit}></MdCreate>
                <MdDelete className = 'icons-btn text-slate-300  hover:text-slate-600' onClick = {handleNoteDelete} ></MdDelete>
             </div>
            </div>
        </div>
}
