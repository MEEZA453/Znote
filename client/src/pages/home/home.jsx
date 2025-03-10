import Navber from "../../component/navber/navber";
import AddNote from "../../component/notecard/addeditnote";
import NoteCard from "../../component/notecard/notecard";
import {MdAdd} from 'react-icons/md'
import {useState , useEffect} from 'react'
import Modal from 'react-modal'
import Login from '../login/login.jsx'
import axiosInstance from '../../utils/axiosinstance'
import Loader from "../../component/loading.jsx";
export default function Home(finder){
    const [openAddEditModel , setOpenAddEditModel] = useState({

        isShown : false , 
        type : 'add',
        data : null ,
    });
let  [ data , setData ] = useState([]);

let [currentId , setCurrentId] = useState(0)
let [isToken , setIsToken ] = useState(false)
let [loading ,setLoading] = useState(false)


  const  founderName = 'sohan ali'

const getNotes =  async()=>{
    try {
       
        const response = await axiosInstance.get('https://znote-9.onrender.com')
    const data = response.data
        setData(data.note)

        
    
    } catch (error) {
        setLoading(false)
        console.log(error , 'sccceneeee!')
    }
}



    //api
    useEffect(()=>{
        setLoading(true)
       getNotes()
       setLoading(false)
       
       if(localStorage.getItem('token') === ''){
        setIsToken(false)
        console.log('not a Token')
    }else{
        setIsToken(true)
    }
    },)





   

    return <div>


{isToken ? <div>


        
<Navber founderName = {founderName}/>         

{!loading ? <div className= 'container mx-auto'>
    <div className =' max-sm:pr-5 max-sm:grid-cols-1 grid grid-cols-4  gap-5 mt-8'>
    {data.map((data)=>{    return <NoteCard key = {data._id} title = {data.title} date = {'3rd april 2024'} content = {data.content} tags = {data.tags} onEdit = {()=>{setOpenAddEditModel({isShown : true , type : 'edit' , data : null}), setCurrentId(data._id)}} id = {data._id}
    setId = {setCurrentId} pinning = {data.isPinned}/>})}

    </div>
    <button className = 'w-16 h-16 flex  max-sm:sticky max-sm:bottom-7 max-sm:translate-x-72 items-center justify-center bg-blue-500 absolute right-7 rounded-full' onClick={()=>{setOpenAddEditModel({isShown : true , type : 'add' , data : null})}}><MdAdd className = 'text-[32px] text-white'></MdAdd></button>
</div> : <div className='w-screen h-screen items-center justify-center flex'><Loader/></div>}
<Modal isOpen = {openAddEditModel.isShown} onRequestClose = {()=>{setOpenAddEditModel({isShown : false }), console.log('closed')}} style = {{overlay : {
    backgroundColor : 'rgba(0,0,0,.2)'
}}}contentLabel = "" className = 'w-[40%] max-sm:w-[90%] bg-white rounded-md mx-auto mt-14 overflow-hidden p-5'>

<AddNote   close = {setOpenAddEditModel}  currentId = {currentId} setCurrentId  = {setCurrentId} userDeta = {data} type ={openAddEditModel.type} noteData = {openAddEditModel.deta} onClose = {()=>{setOpenAddEditModel({isShown : false , type : 'add' , data : null })}} />
    
</Modal>    
</div> : <Login></Login> }

       
        
    </div>
}