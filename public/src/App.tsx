import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import React from 'react';
import './App.css';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus';
import Home from './components/Home'
import Navbar from './Layout/Navbar'
import ForKids from "./components/ForKids";
import ForAdults from "./components/ForAdults";
import ModernJazz from './components/ModernJazz'

const App: React.FC = () => {
  return (
    <>
    <Navbar /><Routes>
      <Route path='/' element={<Home />} />
      <Route path='/aboutus' element={<Aboutus />} />
      <Route path='/contactus' element={<Contactus />} />
      <Route path='/hiphopforkids' element={<ForKids />} />
      <Route path='/hiphopforadults' element={<ForAdults />} />
      <Route path='/modernjazz' element={<ModernJazz />} />
    </Routes>
    </>
  );
};

export default App;
