import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar.jsx'
import Error from './components/Error.jsx'
import App from './App.jsx'
import Parent from './Parent.jsx'
import { ContextProvider } from './components/contex.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ContextProvider>  
			<App /> 
	</ContextProvider>
  </React.StrictMode>
)
