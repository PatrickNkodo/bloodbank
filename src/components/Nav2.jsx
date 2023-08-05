import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import image from '../images/logo.png';
import  {useEverywhere} from './contex'
import '../index.css';

const Nav2 = () => {
	const [loggedOut,setLoggedOut]=useState(false)
	const nav=useNavigate()
	return (
		<div className="nav bg-warning p-2">
			<div className="">
				<h4>Admin Panel</h4>
			</div>
			<div className=""><Link to='/adminsignin'><button className="btn btn-danger btn-sm"><i className="fa fa-plus" aria-hidden="true"></i> Add a hospital</button></Link></div>
			<div className="elements">
					<Link to='/hospitalrequests'>
						<li><button className="btn btn-dark btn-sm me-2">Hospital requests</button></li>
					</Link>
					<Link to='/hospitaldonations'>
						<li><button className="btn btn-dark btn-sm">Donations Recieved</button></li>
					</Link>
					<Link to='/hospitaldonations'>
						<li><button className="btn btn-dark btn-sm ms-2">Donations Given</button></li>
					</Link>
					<Link to='/hospitalblood'>
						<li><button className="btn btn-dark btn-sm ms-2">Hopital blood</button></li>
					</Link>
			
			</div>
		</div>
	);
};
export default Nav2;
