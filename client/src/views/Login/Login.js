import React from 'react'
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';
import Logo from "./../../assets/logo.svg";
import "./Login.css"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


function Login() {

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  // const toastOptions = {
  //   position: "bottom-right",
  //   autoClose: 8000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // }

  

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    }
    else if (username.length === "") {
      toast.error("Username and Password is require", toastOptions);
      return false;
    }
   
    return true;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
     try{
      const { password,  username } = values;
      const {data} = await axios.post("/api/auth/register", {
       username,
       password,
      
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'quikchat-user',
          JSON.stringify(data.user)
        );
        navigate("/");
      }
     }
     catch(e){
      toast.error(e.message, toastOptions);
     }
      
    }
  }

  
  return (
    <>
      <div className='form-container'>
        <form onSubmit={(event) => { handleSubmit(event) }}>
          <div className='brand'>
            <img src={Logo} alt='' />
            <h1>quikchat</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => { handleChange(e)}}
            min="4"
          />
         
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => { handleChange(e)}}
          />
         
          <button type='submit'> Login In </button>
          <span>create an  new account ? <Link to="/register">Register</Link></span>

        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
