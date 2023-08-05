import React,{useEffect, useState} from 'react'
// import { useEverywhere } from '../components/contex';
import { useNavigate,Link} from 'react-router-dom';
const Requests = () => {
  const nav=useNavigate()
  const [data,setData]=useState([]);
  const [deletehRequest,setDeleteHrequest]=useState(false);
  const [sent,setSent]=useState(false);
  // const [requester,setRequester]=useState('');
  // const [to,setTo]=useState('');
//   const {setId}=useEverywhere()
  async function fetching(){
    let data= await fetch('http://localhost:4000/fetchhospitalrequests',{
            method:'post',
            headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
        })
        data=await data.json()
        if(data.admin){
          alert('You\'re not an admin')
          return nav('/home')
        }
        setData(data)
        // console.log(data);
  }
  const sendMsg=async(a,b)=>{
    let data=await fetch('http://localhost:4000/sendmessage',{
      method:'post',
      headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
      body:JSON.stringify({to:a,requestId:b})
    })
    data=await data.json()
    if(!data.error){
        setSent(true)
        // console.log(data);
    }
  }
 async function deleteRequest(a,b){
    let data=await fetch('http://localhost:4000/deletehospitalrequest',{
        method:'post',
        headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
        body:JSON.stringify({userId:a,requestId:b})
 })
 data=await data.json()
 console.log(data);
 if(!data.error){
     setDeleteHrequest(true)
     console.log(data);
 }
}
	useEffect(()=>{
    fetching()
		if(!localStorage.getItem('token')){
			nav('/login')
		}
	},[sent,deletehRequest])
  return (
		<div>
			<div className="container mt-5">
				<h4>
					<i className="fa fa-ambulance" />Blood requests to {localStorage.getItem('hospital')} Hospital
				</h4>
      <table className="table table-bordered table-striped">
				<thead className="bg-dark text-light">
					<tr>
            <th>Name</th>
						<th className="hidden-phone">Bloodgroup Needed</th>
						<th>Quantityt(in ml)</th>
            <th>Latest Date</th>
						<th>Town</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
          {data.map((x,i)=><tr key={i}>
            <td>{x.requester?.name}</td>
            <td>{x.bloodGroup}</td>
            <td>{x.quantity}</td>
            <td>{x.latestDate}</td>
            <td>{x.requester?.town}</td>
            <td>
                <b>{x.given?'Given':<button className='btn btn-danger btn-sm' onClick={()=>sendMsg(x.requester?._id,x._id)}>Give</button>}</b>
                <button className='btn btn-danger btn-sm ms-2' onClick={()=>deleteRequest(x.requester?._id,x._id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
			</table>
      </div>
		</div>
  )}
export default Requests
