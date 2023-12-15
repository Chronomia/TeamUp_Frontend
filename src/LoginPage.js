import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from 'react-router-dom';

function LoginPage() {
	const [username, setUsername] = useState(""); // State for the username input
	const [password, setPassword] = useState(""); // State for the password input
	const [showPassword, setShowPassword] = useState(false);
	const [currentPage, setCurrentPage] = useState('login');

	const handleLogin = (event) => {
		event.preventDefault();
	};

	const showPasswordOrNot = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="login-page">
			<div className="login-form-container">
				<h1>Welcome Back</h1>
				<form onSubmit={{handleLogin}}>
					<div className="input-group">
						<input
							type='text'
							placeholder="Enter Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="input-group">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<img
							src={showPassword ? "/show.png" : "/hide.png"}
							alt="Show password"
							onClick={showPasswordOrNot}
							className="password-icon"
						/>
					</div>
					<button className="login-button" type="submit">Sign In</button>
				</form>
				<a className="loginLink" href="/forgot-password" >Forget Password</a>
				<div className="register-link">
				  Not a member yet? <Link className="loginLink" to="/register">Register now</Link>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
