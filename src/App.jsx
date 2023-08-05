import React from 'react'
import { Routes, Route,BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar'
import Nav2 from './components/Nav2'
import Main from './components/Main'
import Footer from './components/Footer'
import Signin from './components/Signin'
import AdminSignin from './admin/AdminSignin'
import Home from './components/UserHome'
import Error from './components/Error'
import Login from './components/Login'
import About from './components/About'
import Profile from './components/Profile'
import Available from './components/Available'
import Requests from './components/Requests'
import HospitalRequests from './admin/hospitalRequests'
import RequestBlood from './components/RequestBlood'
import DeleteRequest from './admin/DeleteRequest'
import RequestInfo from './components/RequestInfo'
import Donate from './components/Donate'
import DeleteAccount from './admin/DeleteAccount'
import Donations from './admin/Donations'
import Success from './components/success'
import AvailableBlood from './admin/Available'
import {useEverywhere} from './components/contex'
import './index.css';

const App = () => {
  // const {user}=useEverywhere()
  // console.log(user);
  return (
      <Router>
       <div className="top">
       <Navbar/>
       {localStorage.getItem('admin') && <Nav2/>}
        <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/adminsignin' element={<AdminSignin/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/available' element={<Available/>} />
            <Route path='/requests' element={<Requests/>} />
            <Route path='/hospitalrequests' element={<HospitalRequests/>} />
            <Route path='/requestblood' element={<RequestBlood/>} />
            <Route path='/donate' element={<Donate/>} />
            <Route path='/hospitaldonations' element={<Donations/>} />
            <Route path='/hospitalblood' element={<AvailableBlood/>} /> 
            <Route path='/requests/request-info' element={<RequestInfo/>} />
            <Route path='/requests/success' element={<Success/>} /> 
            <Route path='/admin-deleterequest' element={<DeleteRequest/>} /> 
            <Route path='/delete' element={<DeleteAccount/>} /> 
            <Route path='*' element={<Error/>} />
        </Routes>
       </div>
        <Footer/>
    </Router>
)}  
export default App
