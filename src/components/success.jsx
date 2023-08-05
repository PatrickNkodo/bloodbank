import React from 'react'
import image from '../images/homepage.png'
const success = () => {
  return (
    <div className='container parent'>
        <div className="">
            <img src={image} alt="img"/>
        </div>
        <div className="">
        <h4>Thanks, [Username] for helping [request user]. You're saving a live</h4>
        <p>The request of [request user] is now in the <b><i>Under testing...</i></b> status. To 
            terminate the donation, please get to the [hospital] to undergo the blood tests.
        </p>
        <p><b>NB:</b> In the following <b>1 hours</b>, if you are not in the [hospital], the request status will change back to <button className="btn btn-danger btn-sm">give</button>  </p>
        </div>
    </div>
  )
}

export default success
