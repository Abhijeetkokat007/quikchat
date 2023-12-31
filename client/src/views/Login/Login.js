import React from 'react'
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';
import Logo from "./../../assets/logo.svg";
import "./Login.css" 
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem('quikchat-user')) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(`/api/auth/login`, {
        username,
        password,
      });
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
  };

  
  return (
    <>
      <div className='form-container'>
        <form onSubmit={(event) => { handleSubmit(event) }}>
          <div className='brand'>
            <img className='img-r-logo' src={Logo} alt='' />
            <h1 className='h1-r-heding'>quikchat</h1>
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
         
          <button className='btn-submit' type='submit'> Login In </button>
          <span className='text-r-span'>Don't have an  account ? <Link to="/register">Register</Link></span>

        </form>
      </div>
      <ToastContainer />
    </>
  )
}


