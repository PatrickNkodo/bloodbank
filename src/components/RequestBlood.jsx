import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useEverywhere } from './contex'

const RequestBlood = () => {
    const nav= useNavigate()
    const [quantity,setQuantity]=useState(0)
    const [bloodGroup,setBloodGroup]=useState('');
    const [latestDate,setLatestDate]=useState('')
    const {hospital,user} = useEverywhere()
    async function sendRequest(){
      console.log(hospital);
        console.log('send request');
        let data= await fetch('http://localhost:4000/requestblood',{
            method:'post',
            headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
            body:JSON.stringify({bloodGroup,quantity,latestDate,hospital})
        })
        data=await data.json()
        if(!data.error){
            nav('/requests')
            console.log(data);
        }
        console.log(data);
    }
  return (
    <div>
      <div className="container col-5 form my-5">
          <h3>Request Blood from {hospital} Hospital</h3>
					<form>
						<label htmlFor="">Quantity needed(mililiters)</label>
						<input type="number" className="form-control"  onChange={(e)=>setQuantity(e.target.value)} value={quantity} required/>
                        <label htmlFor="">Latest date</label>
                        <input type="date" className="form-control" onChange={(e)=>setLatestDate(e.target.value)} value={latestDate} required/>
						<label htmlFor="">Blood Group needed</label>
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
						<div className="justify-content-end d-flex mt-2">
							<button type='button' className="btn btn-danger my-1" onClick={sendRequest}>Request</button>
						</div>
					</form>
				</div>
    </div>
  )
}

export default RequestBlood
