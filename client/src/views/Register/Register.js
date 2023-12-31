import React from 'react'
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';
import Logo from "./../../assets/logo.svg";
import "./Register.css"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


function Register() {

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
    if (localStorage.getItem('quikchat-user')) {
      navigate("/");
    }
  }, []);

  

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    }
    else if (username.length < 4) {
      toast.error("Username should be greater than 5 characters", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("password should be equal or greater than 8 characters", toastOptions);
      return false;
    }
    else if (email === ""){
      toast.error("email is required ", toastOptions);
      return false;
    }
    return true;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
     try{
      const { password,  username, email } = values;
      const {data} = await axios.post("/api/auth/register", {
       username,
       password,
       email,
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
        <form onSubmit={(event) =>  handleSubmit(event) }>
          <div className='brand'>
            <img className='img-r-logo' src={Logo} alt='logo' />
            <h1 className='h1-r-heding'>quikchat</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => { handleChange(e)}}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => { handleChange(e)}}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => { handleChange(e)}}
          />
          <input
            type='password'
            placeholder=' Confirm password'
            name='confirmPassword'
            onChange={(e) => { handleChange(e)}}
          />
          <button type='submit' className='btn-submit'> Create User </button>
          <span className='text-r-span'>already have an account ? <Link to="/">Login</Link></span>

        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
