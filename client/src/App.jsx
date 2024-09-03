import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import Signup from './pages/signup/signup.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App (){
  let [finder , setFinder] = useState(null)
  console.log(finder)

    const routes = (
      <Router>
      <Routes>
      <Route path='/dashboard' exact element={<Home finder = {finder}/>} />
      <Route path='/login' exact element ={<Login finder = {finder} setFinder = {setFinder}></Login>}/>
      <Route path = '/signup' exact element ={<Signup></Signup>}/>
      </Routes>
      </Router>
    )
    return <div>
        {routes}
    </div>
}
export default App
