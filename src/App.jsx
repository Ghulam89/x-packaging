
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screen/home'
import CategoryPackaging from './screen/CategoryPackaging'
function App() {
  return (
    <>
     
     <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/category/:id' element={<CategoryPackaging/>} />
     </Routes>
    </>
  )
}

export default App
