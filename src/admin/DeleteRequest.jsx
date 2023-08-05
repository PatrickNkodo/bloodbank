import React,{useEffect, useState} from 'react'
// import { useEverywhere } from '../components/contex';
import { useNavigate,Link} from 'react-router-dom';
const Requests = () => {
  const nav=useNavigate()
  const [data,setData]=useState([]);
  const [deleted,setDeleted]=useState([]);
//   const {setId}=useEverywhere()
  async function fetching(){
    let data= await fetch('http://localhost:4000/fetchhospitalrequests',{
            method:'post',
            headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
        })
        data=await data.json()
        setData(data)
        // console.log(data);
  }

  async function deleteRequest(a){
	let data= await fetch('http://localhost:4000/deleterequest',{
		body:JSON.stringify({id:a}),
		method:'post',
		headers:{'Content-Type': 'application/json',authorization:'Bearer '+localStorage.getItem('token')},
	})
	data=await data.json()
	setDeleted(data)
	// console.log(data);
  }
 
	useEffect(()=>{
    fetching()
		if(!localStorage.getItem('token')){
			nav('/login')
		}
	},[deleted])
  return (
		<div>
				<h4>
					<i className="fa fa-ambulance" />Blood requests in {data[0]?.requester?.hospital} Hospital
				</h4>
			<div className="container mt-5">
        <Link to='/requestblood'><button className='btn btn-danger mb-1'><i className="fa fa-plus" aria-hidden="true"></i>Request for blood</button></Link>
      <table className="table table-bordered table-striped">
				<thead className="bg-dark text-light">
					<tr>
            <th>Name</th>
						<th className="hidden-phone">Bloodgroup Needed</th>
						<th>Unit(in ml)</th>
            <th>Latest Date</th>
						<th>Town</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
          {data.map((x,i)=><tr key={i}>
            <td>{x.requester.name}</td>
            <td>{x.bloodGroup}</td>
            <td>{x.quantity}</td>
            <td>{x.latestDate}</td>
            <td>{x.requester.town}</td>
            <td><button className='btn btn-danger' onClick={()=>deleteRequest(x._id)}>Delete</button></td>
          </tr>)}
        </tbody>
			</table>
      </div>
		</div>
  )}
export default Requests
