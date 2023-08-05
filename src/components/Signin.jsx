import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signin = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ number, setNumber ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ bloodGroup, setBloodGroup ] = useState();
	const [ gender, setGender ] = useState();
	const [ town, setTown ] = useState();
  const navigate=useNavigate()
	const addUser = async (e) => {
		e.preventDefault();
		try {
			let result = await fetch('http://localhost:4000/signin', {
				method: 'post',
				body: JSON.stringify({ name, email, number, password, bloodGroup, gender,town }), //set this json to a string (a json instead of a js object)
				headers: {
					//set content type.
					'Content-Type': 'application/json'
				}
			});
			result = await result.json();
			if(result.error){
				alert("Error")
				return console.log(result.error);
			}
			alert('Data saved succesfully');
			console.log(result);
      		navigate('/login')  //this is the variable name of useNavigate() used to redirect   window.location in js
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
					<select type="text" className="form-control" onChange={(e) => setBloodGroup(e.target.value)}>
					<option value="">Choose Bloodgroup...</option>
					<option value="A+">A+</option>
					<option value="A-">A-</option>
					<option value="B+">B+</option>
					<option value="B-">B-</option>
					<option value="AB+">AB+</option>
					<option value="AB-">AB-</option>
					<option value="O+">O+</option>
					<option value="O-">O-</option>
					</select>
					<label htmlFor="">Gender</label>
					<select className="form-control" name="" id="" onChange={(e) => setGender(e.target.value)} value={gender}>
						<option value="">Choose gender...</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
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
