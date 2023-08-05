import React, { useState } from 'react';
import {Link,useNavigate,Navigate} from 'react-router-dom'
import image from '../images/logo.png';
import  {useEverywhere} from './contex'
import '../index.css';

const Navbar = () => {
	// const [loggedOut,setLoggedOut]=useState(false)
	const {loggedIn,setLoggedIn}=useEverywhere()
	console.log(loggedIn);
	// const nav=useNavigate()
	return (
		<div className="nav bg-danger">
		<Link to={!localStorage.getItem('token')? '/' : 'home'}><img src={image} alt="" /></Link>
			<div className="elements">
			{!localStorage.getItem('token') && <ul>
					 <Link to='/'>
						<li>Home</li>
					</Link>
					<Link to='/signin'>
						<li>Sign Up</li>
					</Link>
					<Link to='login'>
						<li>Login</li>
				</Link>
					<Link to='/about'>
						<li>About Us</li>
				</Link>
				</ul>
			}
		{localStorage.getItem('token') && <ul >
					<Link to='/available'>
						<li>Blood in town</li>
					</Link>
					<Link to='/requests'>
						<li>Town Requests</li>
					</Link>
					<Link to='/profile'>
						<li>Profile</li>
					</Link>
					<Link onClick={()=>{
						const logout=window.confirm('Want to logout?')
						console.log(logout);
						if(logout){ 
							localStorage.removeItem('token')
							localStorage.removeItem('admin')
							localStorage.removeItem('userId')
							Navigate('/login')
							setLoggedIn(false)
						}
					}}>
						<li>Logout</li>
					</Link>
					<Link to='/delete'>
						<li><button className="btn btn-dark btn-sm">Delete account</button></li>
					</Link>
			</ul>
			}
			</div>
		</div>
	);
};
export default Navbar;
