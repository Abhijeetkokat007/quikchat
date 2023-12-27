import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "./../../assets/logo.svg";
import "./Register.css"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Register() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation();
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    }
    else if (username.length < 5) {
      toast.error("Username should be greater than 5 characters", toastOptions);
    }
    else if (password.length < 8) {
      toast.error("password should be equal or greater than 8 characters", toastOptions);
      return false;
    }
    else if (email === ""){
      toast.error("email is required ", toastOptions);
    }
    return true;
  }
  

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.values })
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
            onChange={(e) => { handleChange(e) }}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => { handleChange(e) }}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => { handleChange(e) }}
          />
          <input
            type='password'
            placeholder=' Confirm password'
            name='confirmPassword'
            onChange={(e) => { handleChange(e) }}
          />
          <button type='submit'> Create User </button>
          <span>already have an account ? <Link to="/">Login</Link></span>

        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
