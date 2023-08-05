import React, { useState, useEffect, useRef } from 'react';
import { useEverywhere } from './contex';
import { useNavigate } from 'react-router';

const Profile = () => {
	const nav = useNavigate();
	const [ name, setName ] = useState('');
	const [ donations, setDonations]=useState([])
	const [ requests, setRequests]=useState([])
	const [ email, setEmail ] = useState('');
	const [ bloodGroup, setBloodGroup ] = useState('');
	const [ gender, setGender ] = useState(null);
	const focuser = useRef();
	const [ showAll, setShowAll ] = useState(false);
	const [ showAll2, setShowAll2 ] = useState(false);
	const [changed,setChanged]=useState([]);
	// console.log({name,email,bloodGroup,gender});
	const fetchData = async () => {
		try {
			let data = await fetch('http://localhost:4000/profile', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});
			data = await data.json();
			setName(data.res.name);
			setEmail(data.res.email);
			setBloodGroup(data.res.bloodGroup);
			setGender(data.res.gender);
		} catch (e) {
			console.log('Error: ' + e);
		}
	};
	const myDonations = async () => {
		let data = await fetch('http://localhost:4000/mydonations', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('token')
			}})
			data=await data.json()
			setDonations(data)
			// console.log(data);
	}
	const myRequests = async () => {
		let data = await fetch('http://localhost:4000/myrequests', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('token')
			}})
			data=await data.json()
			setRequests(data)
			console.log(data);
	}
	// console.log(donations);
	const removeRequired = (e) => {
		let field = document.querySelectorAll('.readonly');
		let select = document.querySelector('.disabled');
		let modify = document.querySelector('.modify');
		let update = document.querySelector('.update');
		modify.classList.remove('d-flex');
		modify.classList.add('d-none');
		update.classList.remove('d-none');
		update.classList.add('d-flex');
		focuser.current.focus();
		field.forEach((x) => {
			x.removeAttribute('readonly');
		});
		select.removeAttribute('disabled');
	};
	const addRequired = (e) => {
		let field = document.querySelectorAll('.readonly');
		let select = document.querySelector('.disabled');
		let modify = document.querySelector('.modify');
		let update = document.querySelector('.update');
		modify.classList.remove('d-none');
		modify.classList.add('d-flex');
		update.classList.remove('d-flex');
		update.classList.add('d-none');
		field.forEach((x) => {
			x.setAttribute('readonly', true);
		});
		select.setAttribute('disabled', true);
	};
	const updateFxn = async () => {
		let data = await fetch('http://localhost:4000/update', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({ name, email, bloodGroup, gender })
		});
		data = await data.json();
		setName(data.name);
		setEmail(data.email);
		setBloodGroup(data.bloodGroup);
		setGender(data.gender);
		addRequired();
		// console.log(data);
	};
	//in useeffect to run on first render
	// console.log(info);
  const deleteDonation=async(x)=>{
		let data=await fetch('http://localhost:4000/deletedonation',{
			method:'post',
			headers:{
				'content-type':'application/json',
				authorization:'Bearer '+localStorage.getItem('token')
			},
			body:JSON.stringify({id:x})
		})
		data=await data.json()
		setChanged(data)
		// console.log(data);
  }
  const deleteRequest=async(x)=>{
		let data=await fetch('http://localhost:4000/deleterequest',{
			method:'post',
			headers:{
				'content-type':'application/json',
				authorization:'Bearer '+localStorage.getItem('token')
			},
			body:JSON.stringify({id:x})
		})
		data=await data.json()
		setChanged(data)
		// console.log(data);
  }
  const updateDonation=async(x)=>{
	  let quantity=prompt('Enter the new quantity(an Integer):')
		let data=await fetch('http://localhost:4000/updatedonation',{
			method:'post',
			headers:{
				'content-type':'application/json',
				authorization:'Bearer '+localStorage.getItem('token')
			},
			body:JSON.stringify({id:x,quantity})
		})
		data=await data.json()
		setChanged(data)
		// console.log(data);
  }
  const updateRequest=async(x)=>{
	  let quantity=prompt('Enter the new quantity(an Integer):')
		let data=await fetch('http://localhost:4000/updaterequest',{
			method:'post',
			headers:{
				'content-type':'application/json',
				authorization:'Bearer '+localStorage.getItem('token')
			},
			body:JSON.stringify({id:x,quantity})
		})
		data=await data.json()
		setChanged(data)
		// console.log(data);
  }

  function setSelect(){
	//   console.log('run it');
	 let options=document.querySelectorAll('option')
	 options.forEach((x)=>{
		//  console.log(gender,x.value);
		if(x.value==gender){
			 return x.setAttribute('selected',true)
			}
	 })
  }
  setSelect()

	useEffect(() => {
		fetchData();
		myDonations()
		myRequests()
		if (!localStorage.getItem('token')) {
			nav('/login');
		}
	},[changed]);
// console.log(info);
	return (
		<div className="container">
			<h3>Profile</h3>
			<div className="justify-content-center d-flex">
				<form
					className="col-6 "
					onSubmit={function(e) {
						e.preventDefault();
					}}
				>
					<h3>Personal Information</h3>
					<label className="label">Name</label>
					<input
						type="text"
						className="form-control readonly"
						ref={focuser}
						id=""
						onChange={(e) => setName(e.target.value)}
						value={name}
						readOnly
					/>
					<label className="label">Email</label>
					<input
						type="text"
						className="form-control readonly"
						id=""
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						readOnly
					/>
					<label className="label">Blood Group</label>
					<input
						type="text"
						className="form-control readonly"
						id=""
						onChange={(e) => setBloodGroup(e.target.value)}
						value={bloodGroup}
						readOnly
					/>
					<label className="label">Gender</label>
					<select
						type="text"
						className="form-control disabled"
						onChange={(e) => setGender(e.target.value)}
						disabled
					>
						<option value="">Choose gender...</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<div className="justify-content-end d-flex mt-2">
						<button className="btn btn-danger modify" onClick={removeRequired}>
							Modify
						</button>
					</div>
					<div className="justify-content-end d-none mt-2 update">
						<button className="btn btn-danger" onClick={updateFxn}>
							update
						</button>
					</div>
				</form>
			</div>
			<h3>Activities</h3>
			<h5 className="text-center">My Donations</h5>
		
			<div className="container col-9">
			<table className="table table-bordered table-striped table-advance table-hover">
				<thead className="bg-dark text-light">
					<tr>
						<th>Hospital</th>
						<th>Quantity (milliliters)</th>
					</tr>
				</thead>
				<tbody>
					{donations.slice(0,showAll?undefined:5).map((each) => {
						return (
							<tr key={each._id}>
								<td>{each.hospital}</td>
								<td>{each.quantity}</td>
							</tr>
						);
					})}
				</tbody>
			</table> 
			<div className="d-flex justify-content-end"><button className="btn btn-dark btn-sm" onClick={()=>setShowAll(true)}>All donations</button></div>
			</div>
		
			<h5 className="text-center my-5">My Requests</h5>
			<div className="container col-9">
			<table className="table table-bordered table-striped table-advance table-hover">
				<thead className="bg-dark text-light">
					<tr>
						<th>Hospital</th>
						<th>Quantity (milliliters)</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{requests.slice(0,showAll2?undefined:5).map((each) => {
						return (
							<tr key={each._id}>
								<td>{each.hospital}</td>
								<td>{each.quantity}</td>
								<td>{each.status?'Given':'Waiting..'}</td>
							</tr>
						);
					})}
				</tbody>
			</table> 
			<div className="d-flex justify-content-end"><button className="btn btn-dark btn-sm" onClick={()=>setShowAll2(true)}>All Requests</button></div>
			</div>
		</div>
	);
};

export default Profile;
