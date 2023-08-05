import React, { useState, useContext } from 'react';
const Context = React.createContext();
const ContextProvider = ({ children }) => { //children here are the child componets which will access the context data
	const [ information, setInformation ] = useState([]);
	const [ user, setUser ] = useState([]);
	const [ id, setId ] = useState();
	const [ hospital, setHospital ] = useState('');
	const [ admin, setAdmin ] = useState(false);
	const [ loggedIn, setLoggedIn ] = useState(false);

	const fetchUser=async()=>{
		try{
		let data=await fetch('http://localhost:4000/profile',{
			method: 'post',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + localStorage.getItem('token')
				}
		});
		data=await data.json();
		setUser(data);
		// console.log(data);
		}catch(e){
			console.log("Error: "+e.message);
		}
	}
	const setDonation=async(a)=>{
		console.log(a);
		const data=await fetch('http://localhost:4000/donateblood',{
			body:{id:a},
			headers:{'content-type':'application/json',authorization:'Bearer '+localStorage.getItem('token')},
			method:'post',
			// mode:'no-cors'
			
		})
		await data.json()
		setInformation(data)
		console.log(data);
	}
	return (
		<Context.Provider value={{user,setUser,fetchUser,setDonation,setInformation,information,id,setId,hospital,setHospital,admin,setAdmin,loggedIn,setLoggedIn}}>
			{children}
		</Context.Provider>
	);
};
//custom hook to call ContextProvider data
export const useEverywhere = () => {
	//useEverywhere will be used, rather than the below
	return useContext(Context);
};
export { Context, ContextProvider }; //
