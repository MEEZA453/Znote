import { FaMagnifyingGlass } from "react-icons/fa6"
import {IoMdClose} from 'react-icons/io'
export default function SearchBer({value , onChange , handleSearch , onClearSearch}){
    return <div className = 'w-80 items-center px-4 bg-slate-100 rounded-md flex h-10 mt-3 '>
    <input type = 'text' placeholder = 'Search notes' className = 'w-full text-xs bg-transparent py-[11px] outline-none' value = {value} onChange = {onChange}></input>
    { value &&(<IoMdClose onClick= {onClearSearch}  className="text-slate-400 hover:text-slate-950 duration-500 mr-4 cursor-pointer"/>)}
    <FaMagnifyingGlass className="text-slate-400 hover:text-slate-950 duration-500 cursor-pointer " onClick={handleSearch}></FaMagnifyingGlass>
    </div>
}           