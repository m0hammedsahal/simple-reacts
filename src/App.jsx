import { useState } from 'react'
import './App.css'
import './index.css'
import { AiFillAppstore } from "react-icons/ai";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sample from './component/sample';
import Navbar from './component/Navbar';
import Home from './component/Home';
import ProductSection from './component/ProductSection';
import ProductForm from './component/ProductForm';
import Index from './component/pro2/Index';
import NotFound from './component/helpers/NotFound';
import Login from './component/ecomm/Login';
import Register from './component/ecomm/Register';
import StudentComponent from './component/helpers/StudentComponent';
import BookingForm from './component/bridal/BookingForm';
import Skin from './component/bridal/Skin';

function App() {

  return (
    <div>
      {/* <BookingForm/> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/skin' element={<Skin/>}/>
      <Route path='/products' element={<ProductSection/>}/>
      <Route path='/create' element={<ProductForm/>}/>
      <Route path='/offer' element={<Index/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/students" element={<StudentComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>


    </div>
  )
}

export default App
