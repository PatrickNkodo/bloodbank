import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const DeleteAccount = () => {
    const nav = useNavigate();
    async function deleteUser(){
        let data=await fetch('http://localhost:4000/deleteaccount',{
            method:'post',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('token')},
        })
        data=await data.json()
        localStorage.removeItem('token')
        console.log(data);
    }
    useEffect(() => {
		if (!localStorage.getItem('token')) {
			nav('/login');
		}
	}, []);
  return (
    <div className='container'>
        <h2>Clicking on this button means you want to leave our community.</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quidem sapiente ratione aliquam,
             veritatis atque! Illum deserunt 
            laudantium quidem, sit aperiam quas inventore delectus, neque maxime, reprehenderit vel consequuntur dolorum!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quidem sapiente ratione aliquam,
             veritatis atque! Illum deserunt 
            laudantium quidem, sit aperiam quas i
        </p>
        <h5>Are you sure you want to <b>delete your account?</b></h5>
        <button className="btn btn-dark" onClick={deleteUser}>Delete my account</button>
    </div>
  )
}

export default DeleteAccount
