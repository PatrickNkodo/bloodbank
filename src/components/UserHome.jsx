import React, { useEffect } from 'react';
import { useEverywhere } from './contex';
import image from '../images/blood.png';
import { useNavigate } from 'react-router';
const UserHome = () => {
	const nav=useNavigate()

	//in useeffect to run on first render
	useEffect(()=>{
		if(!localStorage.getItem('token')){
			nav('/login')
		}
	},[])
	return (
		<div className="parent">
			<div className="">
				<img src={image} alt="save blood" height="400px" width="600px" />
			</div>
			<div className=" text">
				<p>
					Blood is essential to life. Blood circulates through our body and delivers essential substances like
					oxygen and nutrients to the body’s cells. It also transports metabolic waste products away from
					those same cells. There is no substitute for blood. It cannot be made or manufactured. Generous
					blood donors are the only source of blood for patients in need of a blood transfusion.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatibus quos quisquam quod a
					culpa nihil, facilis quo? Eligendi aliquam dolorem tempore quam dicta. Cumque aspernatur cupiditate
					magni ullam ein?
				</p>
			</div>
		</div>
	);
};

export default UserHome;
