import React, { useState } from 'react';
import { users } from '../test_data/users_data';
import './Login.css'

function Login() {
    const [errorMessages, setErrorMessages] = useState({message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate JSX code for error message
  const renderErrorMessage = () => (
		<div className="error">{`Error: ${errorMessages.message}`}</div>
	);

    const errors = {
      username: "Username is incorrect.",
      password: "Password is incorrect.",
      branch: "Branch is incorrect.",
    };
    
    const handleSubmit = (event: React.FormEvent) => {
      //Prevent page reload
      event.preventDefault();
      console.log('document', document.forms[0]);
      var { username, password, branch } = document.forms[0];
    
      // Find user login info
      const userData = users.find((user) => user.userName === username.value);
      console.log('userData', userData?.branchId);
      console.log('branch', branch.value);
      // Compare user info
      if (userData) {
        if(Number(userData.branchId) !== Number(branch.value)) {
          // Invalid branch
          setErrorMessages({message: errors.branch });
        }
        else if (userData.password !== password.value) {
          // Invalid password
          setErrorMessages({ message: errors.password });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ message: errors.username });
      }
    };

    // JSX code for login form
    const renderForm = (
    <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input-container">
            <input type="text" name="username" placeholder='Username' required /> 
            </div>
            <div className="input-container">
            <input type="password" name="password" placeholder='Password' required />
            </div>
            <div className="input-container">
            <input type="text" name="branch" placeholder='Branch Id' required />
            </div>
            <div className="button-container">
            <input type="submit" value='Login' />
            </div>
            {errorMessages.message ? renderErrorMessage() : ''}
        </form>
    </div>
    );
	return (
		<div className="login-form">
        <div className="title">Log In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    </div>
	); 
}

export default Login;