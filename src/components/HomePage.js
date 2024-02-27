import React from 'react'
import {  useState } from "react";
import {Navigate} from "react-router-dom";

import isAuth from './isAuth';
const HomePage = () => {
  const [loggedin, setLoggedIn] = useState(isAuth());
  const logOut=()=>{
    localStorage.clear();
    setLoggedIn(false);
  }
  return  loggedin?(
    <>
    <div className='homePage'>HomePage</div>
    <button className="logout-btn"   variant="outlined" color="secondary"  onClick={() => {logOut()}}>LogOut</button>
    </>
  ):(
    <>
    <Navigate to="/login" replace={true} />
  </>
  )
  
}

export default HomePage