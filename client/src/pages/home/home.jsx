import Navber from "../../component/navber/navber2";
import AddNote from "../../component/notecard/addeditnote";
import NoteCard from "../../component/notecard/notecard";
import {MdAdd} from 'react-icons/md'
import {useState , useEffect} from 'react'
import Modal from 'react-modal'
import axios from 'axios'

export default function Home(finder){
    const [openAddEditModel , setOpenAddEditModel] = useState({

        isShown : false , 
        type : 'add',
        data : null ,
    });
let  [ data , setData ] = useState([]);
let [user , setUser] = useState([]);

let [currentId , setCurrentId] = useState(0)


  const  founderName = 'sohan ali'

const getNotes =  async()=>{
    try {
        const response = await axios.get('http://localhost:3000')
    const data = response.data
        setData(data)
        



   
    
    } catch (error) {
        console.log(error , 'sccceneeee!')
    }
}

const allUser= async ()=>{
    try {
        const response = await axios.get('http://localhost:3000/userdetails')
        setUser(response.data)
    } catch (error) {
        console.log(error)
    }
}

    //api
    useEffect(()=>{
       getNotes()
       allUser()
    },)

    return <div>
         <button className = 'text-red-500  underline mb-6 text-[10px] px-1 mt-3  tracking-tighter font-semibold ' onClick = {()=>{    navigate('/login')
            }}>LOGOUT</button>
        <Navber founderName = {founderName} userDeta = {user}/>
        <div className='text-xs font-medium pt-1 pl-6 '> What are you thinking?</div>            

        <div className= 'container mx-auto'>
            <div className =' max-sm:pr-5 max-sm:grid-cols-1 grid grid-cols-4  gap-5 mt-8'>
            {data.map((data)=>{    return <NoteCard key = {data._id} title = {data.title} date = {'3rd april 2024'} content = {data.content} tags = {data.tags} onEdit = {()=>{setOpenAddEditModel({isShown : true , type : 'edit' , data : null}), setCurrentId(data._id)}} id = {data._id}
            setId = {setCurrentId} pinning = {data.isPinned}/>})}

            </div>
            <button className = 'w-16 h-16 flex  max-sm:sticky max-sm:bottom-7 max-sm:translate-x-72 items-center justify-center bg-blue-500 absolute right-7 rounded-full' onClick={()=>{setOpenAddEditModel({isShown : true , type : 'add' , data : null})}}><MdAdd className = 'text-[32px] text-white'></MdAdd></button>
        </div>
        <Modal isOpen = {openAddEditModel.isShown} onRequestClose = {()=>{setOpenAddEditModel({isShown : false }), console.log('closed')}} style = {{overlay : {
            backgroundColor : 'rgba(0,0,0,.2)'
        }}}contentLabel = "" className = 'w-[40%] max-sm:w-[90%] bg-white rounded-md mx-auto mt-14 overflow-hidden p-5'>

        <AddNote   close = {setOpenAddEditModel}  currentId = {currentId} setCurrentId  = {setCurrentId} userDeta = {data} type ={openAddEditModel.type} noteData = {openAddEditModel.deta} onClose = {()=>{setOpenAddEditModel({isShown : false , type : 'add' , data : null })}} />
            
        </Modal>
        
    </div>
}