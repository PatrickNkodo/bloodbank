import React,{useEffect, useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import { useEverywhere } from './contex'

const RequestInfo = () => {
	const [checkbox,setCheckbox]=useState();
	// useEffect(()=>{
	// 	console.log(refCheckbox.current.checked);
	// },[checkbox])
    const {name}=useEverywhere()
  return (
    <div className='container col-6'>
      	<h3>Request Information</h3>
		<label className="label">Name</label>
		<input type="text" className="form-control" name="" id="" value={name} readOnly />
		<label className="label">Bloodgroup</label>
		<input type="text" className="form-control" name="" id="" value='O' readOnly />
		<label className="label">Town </label>
		<input type="text" className="form-control" name="" id="" value='O' readOnly />
		<label className="label">Phone number </label>
		<input type="text" className="form-control" name="" id="" value="+237699152810" readOnly />
		<label className="label">Hospital</label>
		<input type="text" className="form-control" name="" id="" value="O" readOnly />
		<label className="label">Quantity (milliliters)</label>
		<input type="text" className="form-control" name="" id="" value="80O" readOnly />
		<input type="checkbox" onChange={(e)=>setCheckbox(e.target.checked)} name="" id="" className='me-2 mt-3'/>
		<label htmlFor=""><span className='bold'>I will be in the [hospital] in the following 1 hours and accept to undergo a blood test.</span></label>
		<form action="">
			<div className="justify-content-end d-flex mt-2">
				<Link to={checkbox?'/requests/success':''}><input type='submit' className='btn btn-danger' value='Donate to [name]' readOnly></input></Link>
			</div>
		</form>
    </div>
  )
}

export default RequestInfo
