import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signin = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ number, setNumber ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ hospital, setHospital ] = useState('');
	const [ bloodGroup, setBloodGroup ] = useState();
	const [ gender, setGender ] = useState();
	const [ town, setTown ] = useState();
  const navigate=useNavigate()
	const addUser = async (e) => {
		e.preventDefault();
		try {
			let result = await fetch('http://localhost:4000/adminsignin', {
				method: 'post',
				body: JSON.stringify({ name, email, number, password, bloodGroup,hospital, gender,town }), //set this json to a string (a json instead of a js object)
				headers: {
					//set content type.
					'Content-Type': 'application/json'
				}
			});
			result = await result.json();
			if(result.error){
				return console.log(result.error);
			}
			console.log('Admin User '+result.name+' created');
			console.log(result);
      		navigate('/home')  //this is the variable name of useNavigate() used to redirect   window.location in js
			// setEmail('');
			// setName('');
		} catch (e) {
			console.log("Error: "+e);
		}
	};
	return (
		<div className="row justify-content-center">
			<div className="col-8 signin">
				<h3>Signin here to join our community</h3>
				<p className='text-danger'><b>NB:This is a Signin form for Admins only!</b> If the user signing in is not an admin, 
					please let him signin from this <Link to='/signin' style={{color:'black'}} href="/signin"><b>user signin form</b></Link>
				</p>
				<form action="">
					<label htmlFor="">Username</label>
					<input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
					<label htmlFor="">Email</label>
					<input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
					<label htmlFor="">Phone number</label>
					<input type="tel" className="form-control" onChange={(e) => setNumber(e.target.value)} value={number} />
					<label htmlFor="">Password</label>
					<input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
					<label htmlFor="">Blood Group</label>
					<input type="text" className="form-control" onChange={(e) => setBloodGroup(e.target.value)} />
					<label htmlFor="">Gender</label>
					<select className="form-control" name="" id="" onChange={(e) => setGender(e.target.value)} value={gender}>
						<option value="">Choose gender...</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<label htmlFor="">Are you an Admin owning a hospital?</label>
					<select name="" id="" className="form-control" disabled>
						<option value='true'>Yes</option>
					</select>
					<label htmlFor="">Hospital name</label>
					<input type="text" className="form-control" onChange={(e) => setHospital(e.target.value)} value={hospital}/>
					<label htmlFor="">Town</label>
					<select className="form-control" name="" id="" onChange={(e) => setTown(e.target.value)}>
						<option value="">Choose town...</option>
						<option value="Maroua">Maroua</option>
						<option value="Garoua">Garoua</option>
						<option value="Ngoundere">Ngoundere</option>
						<option value="Yaounde">Yaounde</option>
						<option value="Bamenda">Bamenda</option>
						<option value="Buea">Buea</option>
						<option value="Bafoussam">Bafoussam</option>
						<option value="Bertoua">Bertoua</option>
						<option value="Douala">Douala</option>
						<option value="Ebolowa">Ebolowa</option>
					</select>
					<div className="justify-content-end d-flex mt-2">
						{/* <Link to='/login'> */}
						<button type="submit" className="btn btn-danger" onClick={addUser}>
							Sign in
						</button>
						{/* </Link> */}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signin;
