import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useEverywhere } from './contex';

const Available = () => {
	const [ info, setInfo ] = useState([]);
	const {setHospital } = useEverywhere()
	let town=localStorage.getItem('town');
	//in useeffect to run on first render
	const nav = useNavigate();
	const fetching = async () => {
		let data = await fetch('http://localhost:4000/fetch', {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('token')
			},
			method: 'get'
		});
		data = await data.json();
		setInfo(data); 
		// console.log(data);
	};
	// console.log(info);
  const request=(x)=>{
	setHospital(x)
    nav('/requestblood')
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
	}, []);
	return (
		<div className="container">
			<h4>
				<i className="fa fa-ambulance" /> Blood Available in {town}
			</h4>
			<table className="table table-bordered table-striped table-advance table-hover;">
				<thead className="bg-dark text-light">
					<tr>
						<th>Hospital</th>
						<th>A/A+</th>
						<th>B/B+</th>
						<th>O/O+</th>
						<th className='col-4'>Action</th>
					</tr>
				</thead>
				<tbody>
					{info.map((each) => {
						return (
							<tr key={each._id}>
								<td>{each.hospital}</td>
								<td>{each.A}</td>
								<td>{each.B}</td>
								<td>{each.O}</td>
								<td>
									<button className='btn btn-danger btn-sm' onClick={()=>request(each.hospital)}>Request for blood</button>
									<button className='btn btn-danger btn-sm ms-3' onClick={()=>donate(each.hospital)}>Make a Donation</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Available;
