import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useEverywhere } from '../components/contex';

const Available = () => {
	const [ info, setInfo ] = useState([]);
	const {setHospital } = useEverywhere();
	const [deleted,setDeleted]=useState([]);
	//in useeffect to run on first render
	const nav = useNavigate();
	const fetching = async () => {
		let data = await fetch('http://localhost:4000/hospitaldonations', {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('token')
			},
			method: 'post'
		});
		data = await data.json();
		if(data.admin){
			alert('Please, you\'re not an admin')
		}
		setInfo(data); 
		console.log(data);
	};
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
		setDeleted(data)
		console.log(data);
  }
  const donate=(x)=>{
	setHospital(x)
    nav('/donate')
  }
	useEffect(() => {
		fetching();
		if (!localStorage.getItem('token')) {
			nav('/login');
		}
	}, [deleted]);
	return (
		<div className="container mt-5">
		{info[0] ?	
			<div>
			<h4>
				<i className="fa fa-ambulance" /> Donations to {localStorage.getItem('hospital')} Hospital
			</h4>
		<table className="table table-bordered table-striped table-advance table-hover;">
				<thead className="bg-dark text-light">
					<tr>
						<th>Donator</th>
						<th>Hospital</th>
						<th>Blood Group+</th>
						<th>Quantity</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{info.map((each) => {
						return (
							<tr key={each._id}>
								<td>{each?.donator?.name}</td>
								<td>{each.hospital}</td>
								<td>{each.bloodGroup}</td>
								<td>{each.quantity}</td>
								<td>
									<button className='btn btn-danger btn-sm' onClick={()=>deleteDonation(each._id)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table> 
			</div>
			:<div>
				<h4>Donations to {localStorage.getItem('hospital')} Hospital</h4>
				<center><h3 className='text-secondary'>No data yet</h3></center>
			</div>}
		</div>
	);
};

export default Available;
