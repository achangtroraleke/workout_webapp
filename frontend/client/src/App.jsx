
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Registration'
import WorkoutLogger from './components/WorkoutLogger'
import WorkoutDisplay from './components/WorkoutsDisplay'
import PrivateRoutes from './utils/PrivateRoute'

import {Routes, Route, BrowserRouter} from 'react-router'
import WorkoutDetailPage from './pages/WorkoutDetail'
import Homepage from './pages/Home'
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/workout/:id' element={<WorkoutDetailPage/>}/>
        <Route path='/workout/' element={<WorkoutDisplay/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
 
    </Routes>
      
      <RegistrationPage/>
   
      
    

     </BrowserRouter>
    </>
  )
}

export default App
