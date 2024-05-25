import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import React from 'react';
import './App.css';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus';
import Home from './components/Home'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import ForKids from "./components/ForKids";
import ForAdults from './components/ForAdults';
import Profile from "./components/Profile";
import ExecutiveClass from './components/ExecutiveClass'
import Classes from "./components/Classes";

const App: React.FC = () => {
  return (
    <>
    <Navbar /><Routes>
      <Route path='/' element={<Home />} />
      <Route path='/aboutus' element={<Aboutus />} />
      <Route path='/contactus' element={<Contactus />} />
      <Route path='/forkids/:belt' element={<ForKids />} />
      <Route path='/classforadults' element={<ForAdults />} />
      <Route path='/executiveclass' element={<ExecutiveClass />} />
      <Route path='/classforkids' element={<Classes />} />
      <Route path='/profile' element={<Profile />} />

    </Routes>
    <Footer/>
    </>
  );
};

export default App;
