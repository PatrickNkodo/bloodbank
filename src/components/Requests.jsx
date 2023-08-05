import React,{useEffect, useState} from 'react'
import { useEverywhere } from './contex';
import { useNavigate,Link} from 'react-router-dom';
const Requests = () => {
  const nav=useNavigate()
  const [data,setData]=useState([]);
  // const [requester,setRequester]=useState('');
  // const [to,setTo]=useState('');
  const {setId}=useEverywhere()
  async function fetching(){
    let data= await fetch('http://localhost:4000/fetchrequests',{
            method:'post',
            headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
        })
        data=await data.json()
        setData(data)
        console.log(data);
  }
  const sendMsg=async(a,b)=>{
    let data=await fetch('http://localhost:4000/sendmessage',{
      method:'post',
      headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
      body:JSON.stringify({to:a,requestId:b})
    })
    data=await data.json()
    console.log(data);
  }

	useEffect(()=>{
    fetching()
		if(!localStorage.getItem('token')){
			nav('/login')
		}
	},[])
  return (
		<div>
			<div className="container mt-5">
				<h4>
					<i className="fa fa-ambulance" />Blood requests in {data[0]?.requester?.town} Town
				</h4>
      <table className="table table-bordered table-striped">
				<thead className="bg-dark text-light">
					<tr>
            <th>Name</th>
						<th>Bloodgroup Needed</th>
						<th>Quantityt(in ml)</th>
            <th>Latest Date</th>
						<th>Hospital Concerned</th>
						<th>Posted on</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
          {data.map((x,i)=><tr key={i}>
            <td>{x.requester?.name}</td>
            <td>{x.bloodGroup}</td>
            <td>{x.quantity}</td>
            <td>{x['latestDate']}</td>
            <td>{x.hospital}</td>
            <td>{x.date}</td>
            <td><b>{x.given?'Given':'Waiting..'}</b></td>
          </tr>)}
        </tbody>
			</table>
      </div>
		</div>
  )}
export default Requests
