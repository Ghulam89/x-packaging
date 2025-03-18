
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screen/home'
import CategoryPackaging from './screen/CategoryPackaging'
import Catalogue from './screen/catalogue/Catalogue'
import Category from './screen/Category'
function App() {
  return (
    <>
     
     <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/category/:id' element={<CategoryPackaging/>} />
      <Route  path='/catalogue' element={<Catalogue/>} />
      <Route  path='/:id' element={<Category/>} />
     </Routes>
    </>
  )
}

export default App
