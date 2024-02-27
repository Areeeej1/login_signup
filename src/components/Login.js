import React from 'react'
import {  useState } from "react";
import axios from "axios";
import ApiList from "../api/ApiList";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,Navigate} from "react-router-dom";
import { Snackbar } from '@mui/material';
import isAuth from './isAuth';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';


const Login = () => {
 
    const [loading, setLoading] = useState(false);
    const [loggedin, setLoggedIn] = useState(isAuth());
    const [error, setErrors] = useState("");
    const [errorBar, setErrorBar] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
      username: "" ,
      password: "",
    });
    const handleInput = (key, value) => {
      setLoginDetails({
        ...loginDetails,
        [key]: value,
      });
    };
    const loginUserApi = () => {
       setLoading(true)
      axios
        .post(ApiList.LoginApi2, { 
          
          "username": loginDetails.username,
          "password": loginDetails.password,
          "role": "user",
          "usertype": "app"
           },

        {
          headers: {
            'content-type': 'text/json'
          }
        })
        .then((response) => {
          
          
          setErrors(response.data.message);
          setErrorBar(true);
          
         
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userName",loginDetails.username);
          setTimeout(function () {
            setLoading(false);
            setLoggedIn(true);
          }, 1000);
        
      
        
        })
        .catch((e) => {
         
          setErrors(e.response.data.message);
          setErrorBar(true);
          setLoading(false)
          
        });
    };
    const loginUsersecondApi = () => {
     
      // var formData = new FormData();
      // formData.append('username', 'ir4u');
      // formData.append('email', 'ir4u@gmail.com');
      //  formData.append('password', 'ir4u');
      //  formData.append('role', 'user');
      //  formData.append('usertype', 'app');
    
      axios
     
    
         .post(ApiList.LoginApi1, { 
             // data: formData
             "username": loginDetails.username,
             "password": loginDetails.password,
             "role": "user",
             "usertype": "app"
           
          },

        {
         withCredentials:false,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
        // })
         )
        .then((response) => {
         
          console.log("login Second Api response");
          console.log(response.status);
        
          
         
        
        })
        .catch((e) => {
       
          console.log("login Second Api response");
          console.log(e.response.data.error);
      
         
          
        });
    };
  
  
    function validateUsername(){
      if (loginDetails.username.trim().length !== 0) {
        return true;
      }
      else{
        setErrors("UserName can't be empty");
        setErrorBar(true);
        return false;
      }

    }
    function validatePassword(){
      if (loginDetails.password.trim().length !== 0) {
        return true;
      }
      else{
        setErrors("Password can't be empty");
        setErrorBar(true);
        return false;
      }
    }
    const loginUser=()=>{
      if( validateUsername()&&
      validatePassword())
      {
        loginUserApi();
        loginUsersecondApi();
      }

    }

   
 
    const  handleClose=()=>{
      setErrorBar(false);
     }

  return  loggedin?(
   
    
    <Navigate to="/" replace={true} />

 
  )
  :
  ( <>
  
   <Snackbar
   

  open={errorBar}
  autoHideDuration={6000}
  onClose={handleClose}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  message={error}
  sx={{ border: "1px solid #006cfa"}}
/>

    <div className="formStyle2" >
  
    
    <h2>
    
      Login</h2>
   
        <TextField 
           
            label="UserName"
            onChange={(event) => handleInput("username", event.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{mb: 3}}
            fullWidth
            value={loginDetails.username}
            placeholder='hmna1'
            
            autoComplete='off'
            InputProps={{
            
             
              startAdornment: (
                <InputAdornment position="start">
                  < AccountCircleTwoToneIcon/>
                </InputAdornment>
              ),
            }}
        
         >
      
  
         </TextField>
     <TextField 
            label="Password"
            onChange={(event) => handleInput("password", event.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            sx={{mb: 3}}
            fullWidth
            value={loginDetails.password}
            placeholder='*******'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
             < LockTwoToneIcon />
                </InputAdornment>
              ),
            }}
           
         /> 
         <Button disabled={loading}  className="signup-button" variant="outlined" color="secondary" onClick={() => {loginUser()}}>Login &nbsp;  &nbsp;<LoginTwoToneIcon/> </Button>
         {loading?    
    <CircularProgress size="1rem" /> 
           :null}
           
           <br></br><br></br>
             
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <small className='textLast'>Donot Have Account? <Link to ="/signup" >Sign Up</Link></small>
      

         </div>
         </>
  )
}

export default Login