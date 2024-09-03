import ProfileInfo from '../../component/navber/profileinfo.jsx'
import SearchBer from './searchber.jsx';
import {useState} from 'react'
export default function Navber(founderName){
   
   
   
    



    let [searchQuery , setSearchQuery] = useState('')
    const clearSearch = ()=>{
        setSearchQuery("")
    }
    const handleSearch = ()=>{
        console.log('result')
    }
    return(
        <div className = 'bg-white flex item-center justify-between px-2 drop-shadow h-16 max-sm:gap-2  max-sm:sticky max-sm:top-0 '>
            <h2 className="text-xl font-medium text-black py-2 max-sm:text-md max-sm:pt-2">Notes</h2>
            <SearchBer value ={searchQuery} onChange = {({target})=>setSearchQuery(target.value)} onClearSearch={clearSearch} handleSearch={handleSearch}/>
            <ProfileInfo  founderName = {founderName.founderName} />

        </div>
    )
}
