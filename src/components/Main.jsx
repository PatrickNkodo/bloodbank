import React from 'react';
import donation from '../images/donation1.jpg';
import '../index.css';
const Main = () => {
	return (
		<div>
			<marquee scrollamount={5}>
				<b>
					<i>Hi,Welcome to our Online Blood Bank Management System Website.Save Lives. Join the Red Cross</i>
				</b>
			</marquee>
			<div className="parent">
				<div className="child1">
					<img src={donation} alt="" />
					<div className="">
                        <h1>Our Mission</h1>
						<p>Mybood.co Red Cross will provide a sustained and effective humanitarian service
						committed to build resilient communities, ran by well-trained and dedicated staff and volunteers
						imbued with integrity, equipped with the necessary logistics and the maximum usage of
						information technology. The blood you donate gives someone another chance of life. One day that
						someone maybe a close relative, a friend, a loveone or even you.</p>
					</div>
				</div>
				<div className="child2">
					<p><span className='myblood'>Myblood.co</span> Red Cross will provide a sustained and effective humanitarian service committed to build
					resilient communities, ran by well-trained and dedicated staff and volunteers imbued with integrity,
					equipped with the necessary logistics We will continue to expand our volunteer network in every part
					of the country to ensure swift delivery of our services. The humanitarian service committed to build
					resilient communities, ran by well-trained and dedicated staff and volunteers imbued with integrity,
					equipped with the necessary logistics. We will continue to expand our volunteer network in every
					part of the country to ensure swift delivery of our services.</p>
				</div>
			</div>
		</div>
	);
};

export default Main;
