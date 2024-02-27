import React,{useState} from 'react';
import axios from "axios";
import ApiList from "../api/ApiList";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,Navigate} from "react-router-dom";
import { Snackbar } from '@mui/material';
import isAuth from './isAuth';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(isAuth());
    const [signupDetails, setSignupDetails] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      });
  
      const [error, setErrors] = useState("");
      const [errorBar, setErrorBar] = useState(false);
      const handleInput = (key, value) => {
        setSignupDetails({
          ...signupDetails,
          [key]: value,
        });
      };
      const registerUser = () => {
        setLoading(true)
        axios
          .post(ApiList.signUpApi2, { 
            "firstname": signupDetails.firstname,
            "lastname": signupDetails.lastname,
            "username": signupDetails.username,
            "email": signupDetails.email,
            "password": signupDetails.password,
            "usertype": "app",
            "role": "user",
            "status": "active"
             },

          {
            headers: {
              'content-type': 'text/json'
            }
          })
          .then((response) => {
            
            setErrors(response.data.message);
            setErrorBar(true);
            localStorage.setItem("userName",signupDetails.username);
        
            
            setTimeout(function () {
              setLoading(false);
              setRegister(true);
            }, 1000);
           
          
          })
          .catch((e) => {
            setErrors(e.response.data.message);
            setErrorBar(true);
            setLoading(false);
          
            
          });
      };
      const createUser = () => {
       
        axios
          .post(ApiList.signUpApi1, { 
            "firstname": signupDetails.firstname,
            "lastname": signupDetails.lastname,
            "username": signupDetails.username,
            "email": signupDetails.email,
            "password": signupDetails.password,
            "usertype": "app",
            "role": "user",
            "status": "active"
             },

          {
            headers: {
              'content-type': 'text/json'
            }
          })
          .then((response) => {
         
            console.log("SignUP Second Api response");
            console.log(response.data.message); 
          
              
         
            
          
          })
          .catch((e) => {
            console.log("SignUP Second Api response");
            console.log(e.response.data.error); 
            
          });
      };

      // //////////////////////////////////////validateName////////////////////////////////////////////////
      function validateFirstName() {
        if (signupDetails.firstname.trim().length !== 0) {
        if (/^[A-Za-z]+$/.test(signupDetails.firstname)) {
          return true;
        } else {
          setErrors("First Name Should Contain only alphabet characters");
         setErrorBar(true);
         return false;
        }
      }
      else{
        setErrors("First Name can't be empty");
        setErrorBar(true);
        return false;
      }
      }
    
      function validateLastName() {
        if (signupDetails.lastname.trim().length !== 0) {
        if (/^[A-Za-z]+$/.test(signupDetails.lastname)) {
          return true;
        } else {
          setErrors("Last Name Should Contain only alphabet characters");
         setErrorBar(true);
         return false;
        }
      }
      else{
        setErrors("Last Name can't be empty");
        setErrorBar(true);
        return false;

      }
      }
 
       // //////////////////////////////////////validateUserName///////////////////////////////////////////////
       function validateUserName() {
        if (signupDetails.username.trim().length !== 0) {
          
  
          if (/^(?=.{4,20}$)[a-zA-Z0-9._]+$/.test(signupDetails.username)) {
          return true;
        } else {
          setErrors("invalid userName- Minimum four letters and only characters");
          setErrorBar(true);
          return false;
        }
      }
        else{
          setErrors("User Name can't be empty");
          setErrorBar(true);
          return false;
  
        }
      }
    
       // //////////////////////////////////////validatepassword///////////////////////////////////////////////
    
      function validatePassword() {
        if (signupDetails.password.trim().length !== 0) {
        if (/^[ A-Za-z0-9_@./#&+-]{6,}$/.test(signupDetails.password)) {
          return true;
        } else {
          setErrors("Weak Password - Minimum six characters, at least one letter and one number!");
          setErrorBar(true);
          return false;
        }
      }
      else{
        setErrors("Password can't be empty");
        setErrorBar(true);
        return false;

      }
      }
         // //////////////////////////////////////validateEmail/////////////////////////////////////////////////////
         function validateEmail() {
          if (signupDetails.email.trim().length !== 0) {
            // eslint-disable-next-line
          if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signupDetails.email)) {
            return true;
          } else {
            setErrors("You have entered an invalid email address!");
            setErrorBar(true);
            return false;
          }
        }
        else{
          setErrors("Email can't be empty");
          setErrorBar(true);
          return false;
  
        }
        }
         
   
     
  const registerNewUser =()=>{
   if( validateFirstName()&&
    validateLastName()&&
     validateEmail()&&
     validateUserName()&&
     validatePassword()
   
   ){
    registerUser();
    createUser();

   }
    else{
  
    }

   }
 
  
   const  handleClose=()=>{
    setErrorBar(false);
   }
    
  return  register?(
  

<Navigate to="/" replace={true} />
 
  ):
  (  <>
  
   <Snackbar
  open={errorBar}
  autoHideDuration={6000}
  onClose={handleClose}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  message={error}
  sx={{ border: "1px solid #006cfa"}}
 
    />
      <div className="formStyle"  >
            <h2>SIGN UP</h2>
                <TextField 
                    label="First Name"
                    onChange={(event) => handleInput("firstname", event.target.value.trim())}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={signupDetails.firstname}
                    autoComplete='off'
                    placeholder='Hmna'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                     < DriveFileRenameOutlineTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                
                 />
             <TextField 
                    label="Last Name"
                    onChange={(event) => handleInput("lastname", event.target.value.trim())}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={signupDetails.lastname}
                    placeholder='Malik'
                    autoComplete='off'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                     < DriveFileRenameOutlineTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                 /> 
                 <TextField 
                 label="Email"
                 onChange={(event) => handleInput("email", event.target.value)}
                 required
                 variant="outlined"
                 color="secondary"
                 type="email"
                 sx={{mb: 3}}
                 fullWidth
                 value={signupDetails.email}
                 placeholder='hmna@gmail.com'
                 autoComplete='off'
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                 < EmailTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                
              />
                 
                    <TextField 
           label="UserName"
           onChange={(event) => handleInput("username", (event.target.value).trim())}
           required
           variant="outlined"
           color="secondary"
           type="text"
           sx={{mb: 3}}
           fullWidth
           value={signupDetails.username}
           placeholder='hmna1'
           autoComplete='off'
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
           <  AccountCircleTwoToneIcon/>
              </InputAdornment>
            ),
          }}
        />
               <TextField 
              label="Password"
              onChange={(event) => handleInput("password", event.target.value.trim())}
              required
              variant="outlined"
              color="secondary"
              type="password"
              sx={{mb: 3}}
              fullWidth
              value={signupDetails.password}
              placeholder='******'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
               < LockTwoToneIcon />
                  </InputAdornment>
                ),
              }}
            
           /> 
     
           <Button disabled={loading}  className="signup-button" variant="outlined" color="secondary" onClick={() => {registerNewUser()}}>SignUP &nbsp;<ArrowForwardIosTwoToneIcon/></Button>
           {loading? 
             <CircularProgress size="1rem" /> 
 
     :null}
           
           <br></br><br></br>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     
       <small className='textLast'>Already have Account? <Link to ="/login" >Login</Link></small>
    </div>
    </>
  )
}

export default SignUp