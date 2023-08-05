import React, { useEffect, useState } from 'react'
import {useEverywhere} from './contex'
import {useNavigate,Link} from 'react-router-dom'
const Login = () => {
  const {setLoggedIn,setUser}=useEverywhere()
  const nav=useNavigate()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  
  const loginFxn=async()=>{
      try{
        let data=await fetch('http://localhost:4000/login',{
          method:'post',
          body:JSON.stringify({email,password}),
          headers: {
            //set content type.
            'Content-Type': 'application/json',
          }
        })
        data=await data.json() //back to an object
        if(!data.error){
          localStorage.setItem('token',data.token)
          setLoggedIn(true)
          console.log(data);
          localStorage.setItem('userId',data.user._id)
          data.user.admin && localStorage.setItem('admin','true')
          data.user.hospital && localStorage.setItem('hospital',data.user.hospital)
          data.user.town && localStorage.setItem('town',data.user.town)

          setUser(data.user)
          return nav('/home')
        }
        console.log(data.error);
      }catch(e){
        alert("Error: "+e);
        console.log("Error: "+e);
      }
    }
    return (
    <div className="row justify-content-center">
      <div className='col-8 login'>
        <h3>Login to continue</h3>
      <p className='text-secondary'>No account yet? create one <Link style={{color:'black'}} to='/signin'><b>here</b></Link></p>
      <form action="" onSubmit={function(e){e.preventDefault()}}>
        <label htmlFor="">Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
        <label htmlFor="">Password</label>
        <input type="text" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
        <div className="justify-content-end d-flex mt-2">
          {/* <Link to='/home'> */}
            <button className='btn btn-danger' onClick={loginFxn}>Login</button>
            {/* </Link>  */}
		    </div>
      </form>
    </div>
  </div>
  )
}

export default Login
