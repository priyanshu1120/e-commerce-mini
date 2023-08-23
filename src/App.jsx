import { useState } from 'react'
import Navbar from  "./Components/Navbar"
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ShoppingPage from './Pages/ShoppingPage'
import "./App.css"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProductDetails from './Components/ProductDetails'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/collection/all" element={<ShoppingPage/>}/>
          <Route path="/collection/all/:id" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
       </Routes>
    </>
  )
}

export default App
