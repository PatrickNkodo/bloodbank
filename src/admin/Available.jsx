import React, { useState, useEffect } from 'react';
import { useEverywhere } from '../components/contex';

const Available = () => {
	const [ A, setA ] = useState('');
	const [ B, setB ] = useState('');
	const [ O, setO ] = useState('');
	const [ updateA, setUpdateA ] = useState(false);
	const [ updateB, setUpdateB ] = useState(false);
	const [ updateO, setUpdateO ] = useState(false);
	const [ hospital, setHospital ] = useState('');
	const [ groups, setGroups ] = useState([]);

	const {fetchUser,user}=useEverywhere();
	// console.log(user)
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
			setHospital(data.res.hospital);
			// console.log(data.res);
		} catch (e) {
			console.log('Error: ' + e);
		}
	};
	const fetchData2 = async () => {
		try {
			let data = await fetch('http://localhost:4000/fetch', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});
			data = await data.json();
			setGroups(data);
			setA(data.A);
			setB(data.B);
			setO(data.O);
			// console.log(data);
		} catch (e) {
			console.log('Error: ' + e);
		}
	};

	const removeDisabled = (inputClass) => {
		console.log('removeDisabled');
		let input = document.querySelector('.' + inputClass);
		input.removeAttribute('disabled');
		input.focus();
		if (inputClass == 'A') {
			setUpdateA(true);
		} else if (inputClass == 'B') {
			setUpdateB(true);
		} else {
			setUpdateO(true);
		}
	};
	const addDisabled = (x) => {
		console.log('addDisabled');
		let input = document.querySelector('.' + x);
		input.setAttribute('disabled',true);
		if (x == 'A') {
			setUpdateA(false);
		} else if (x == 'B') {
			setUpdateB(false);
		} else {
			setUpdateO(false);
		}
	};
	console.log(groups);
	useEffect(() => {
		fetchUser();
		fetchData();
		fetchData2();
	}, []);
	const update = async (x) => {
		let body;
        addDisabled(x)
        console.log('update ' + x);
		if (x == 'A') {
			body = JSON.stringify({ group: x, hospital, A });
		} else if (x == 'B') {
			body = JSON.stringify({ group: x, hospital, B });
		} else {
			body = JSON.stringify({ group: x, hospital, O });
		}
		if (x == 'A') {
			setUpdateA(false);
		} else if (x == 'B') {
			setUpdateB(false);
		} else {
			setUpdateO(false);
		}
		let data = await fetch('http://localhost:4000/updateblood', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			body
		});
		if(data.error){return console.log(data.error)}
		data = await data.json();
		console.log(data);
	};
	console.log(updateA);
	return (
		<div className="container">
			<h3>
				<i className="fa fa-hospital" aria-hidden="true" />Available blood in {hospital} Hospital
			</h3>
			<h4>Blood Groups</h4>
			<table className="table table-bordered text-center">
				<thead className="table-dark">
					<tr>
						<th>Blood Group</th>
						<th>Quantity(in milliliters)</th>
						<th className='col-4'>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>A/A+</td>
						<td>
							<input
								type="number"
								className="A"
								onChange={(e) => setA(e.target.value)}
								value={A}
								disabled
							/>
						</td>
						<td>
							<button
								className="btn btn-dark btn-sm"
								onClick={updateA ? () => update('A') : () => removeDisabled('A')}
							>
								<i className="fa fa-pen" aria-hidden="true" />
								{updateA ? ' Update' : ' Edit'}
							</button>
						</td>
					</tr>
					<tr>
						<td>B/B+</td>
						<td>
							<input
								type="number"
								className="B"
								onChange={(e) => setB(e.target.value)}
								value={B}
								disabled
							/>
						</td>
						<td>
							<button
								className="btn btn-dark btn-sm"
								onClick={updateB ? () => update('B') : () => removeDisabled('B')}
							>
								<i className="fa fa-pen" aria-hidden="true" />
								{updateB ? ' Update' : ' Edit'}
							</button>
						</td>
					</tr>
					<tr>
						<td>O/O+</td>
						<td>
							<input
								type="number"
								className="O"
								onChange={(e) => setO(e.target.value)}
								value={O}
								disabled
							/>
						</td>
						<td>
							<button
								className="btn btn-dark btn-sm"
								onClick={updateO ? () => update('O') : () => removeDisabled('O')}
							>
								<i className="fa fa-pen" aria-hidden="true" />
								{updateO ? ' Update' : ' Edit'}
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Available;
