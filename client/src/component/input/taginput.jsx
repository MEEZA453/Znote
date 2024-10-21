import {MdAdd , MdClose} from 'react-icons/md'
import  {useState} from 'react';
export default function  TagInput({tags , setTags}) {
    const [inputValue , setInputValue]  = useState('');
     const handleInputChange = (e)=>{
    setInputValue(e.target.value)
    } 
    const addNewTag = ()=>{
        if(inputValue.trim() !==""){
            setTags([  ...tags , inputValue.trim()]);
            setInputValue("") ;

        }
    }
    const handleKeyDown = (e)=>{
        if(e.key ==='Enter'){
            addNewTag();
        }
    };
    const handleRemoveTags = (tagToRemove)=>{
setTags(tags.filter((tag) =>  tag !== tagToRemove))
    }

    return <div>
       { tags?.length > 0 && (<div className = 'flex items-center gap-3 flex-wrap  mt-2'>
            {tags.map((tag , index) =>(
                <span className=' bg-slate-200 rounded-sm p-1 ' key={index}>{tag} <button  > <MdClose size={10}/>  </button></span>
            ))}
        </div>)}
    <div className = 'flex items-center gap-4  mt-3'>
        <input type = 'text'  onKeyDown = {handleKeyDown} value = {inputValue}   onChange = {handleInputChange} className = 'text-sm bg-transeparent border px-3 py-2 rounded outline-none' placeholder="Add tags" />
        <button  onClick = {()=>{addNewTag()}}className = 'w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'><MdAdd className = 'text-2xl text-blue-700 hover:text-white'>
            </MdAdd></button>
    </div>
    </div>
}