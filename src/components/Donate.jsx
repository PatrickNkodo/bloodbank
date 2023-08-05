import React, { useEffect, useState } from 'react';
import { useEverywhere } from './contex';
import { useNavigate } from 'react-router';

const Donate = () => {
	const nav = useNavigate();
	const [requester,setRequester]=useState([])
	const [quantity,setQuantity]=useState('')
	const { hospital } = useEverywhere();

	const donateblood=async()=>{
		let donate=await fetch('http://localhost:4000/donateblood',{
			body:JSON.stringify({hospital,quantity}),
			method: 'post',
			headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('token')},
		})
		donate=await donate.json()
		if(donate.error){
			return console.log(donate.error)
		}
		nav('/available')
		console.log(donate);
	}
	// console.log(id);
	useEffect(() => {
		if (!localStorage.getItem('token')) {
			nav('/login');
		}
	}, []);
	return (
		<div className="container">
			<h4>Donate to {hospital} Hospital</h4>
			<center><h6>A donation will save lives in {hospital} Hospital. Thanks for donating your blood😊</h6></center>
			<form>
				<label htmlFor="">Quantity(mililiters)</label>
				<input type="number" className="form-control" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
				<div className="justify-content-end d-flex mt-2">
					<button type="button" className="btn btn-danger my-1" onClick={donateblood}>
						Donate
					</button>
				</div>
			</form>
		</div>
	);
};

export default Donate;
