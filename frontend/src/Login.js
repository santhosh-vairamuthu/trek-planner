


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const auth_api_signup = axios.create({
    baseURL: "http://127.0.0.1:8000/signup"
});

const auth_api_login = axios.create({
    baseURL: "http://127.0.0.1:8000/login"
});

const SignupComponent = () => {
    const navigate = useNavigate();

    const signup = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const requestData = Object.fromEntries(formData.entries());
            const response = await auth_api_signup.post("", requestData);
            if (response.data.status === 'True') {
                navigate("/")
            } else {
                console.log("Signup failed!");
            }
        } catch (error) {
            console.error("Signup Error:", error);
        }
    };

    return (
        <form id="signup p-3" className='form' onSubmit={signup}>
            <label className='fs-4 fw-bolder' htmlFor="username">Name</label>
            <input type="text" id="username" name="username" required placeholder='Enter your name' />
            <label className='fs-4 fw-bolder' htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder='Enter valid email id' />
            <label className='fs-4 fw-bolder' htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder='Enter your password' />
            <button className='btn fs-5' type="submit">Sign Up</button>
        </form>
    );
};

const LoginComponent = () => {
    const navigate = useNavigate();
    const login = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const requestData = Object.fromEntries(formData.entries());
            const response = await auth_api_login.post("", requestData);
            if (response.data.status === 'True') {
                navigate("/");
            } else {
                console.log("Login failed!");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };
    

    return (
        <form id="login p-3" className='form' onSubmit={login}>
            <label className='fs-4 fw-bolder' htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder='Enter valid email id' />
            <label className='fs-4 fw-bolder' htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder='Enter your password' />
            <button className='btn fs-5' type="submit">Login</button>
        </form>
    );
};

function Login() {
    const LoginForm = (
        <LoginComponent />
    );

    const SignUpForm = (
        <SignupComponent />
    );

    const [isLoginForm, setIsLoginForm] = useState(true);
    const [account, setAccount] = useState("Don't have an account?");
    const [sign, setSign] = useState("Login");

    const switchState = () => {
        setIsLoginForm(!isLoginForm); 
        setAccount(isLoginForm ? "Already have an account?" : "Don't have an account?");
        setSign(isLoginForm ? "Sign up" : "Login");
    };

    return (
        <div className=" row justify-content-center mt-5">
            <div className='col-8 col-sm-8 col-md-6 col-lg-4 Login mt-5'>
                <h3 className='fs-3 mt-2 fw-bold '>{sign}</h3>
                {isLoginForm ? LoginForm : SignUpForm}
                <h5 className='mt-1'><span>{account}<button className="switch" onClick={switchState}>{sign === "Login" ? "Sign up" : "Login"}</button></span></h5>
            </div>
        </div>
    );
}

export default Login;

