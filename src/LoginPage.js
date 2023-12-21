import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
	const [username, setUsername] = useState(""); // State for the username input
	const [password, setPassword] = useState(""); // State for the password input
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault();
		const userData = new URLSearchParams();
		userData.append("username", username);
		userData.append("password", password);
		const url = "http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/token";
		const options = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: userData
		};
		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				if (data.detail) {
                	alert(data.detail);
            	}
				else{
					console.log('Success:', data);
					navigate('/home', { state: { username: username } });
				}
			})
		.catch(error => {
			console.error('There was an error!', error);
		});

	};

	const showPasswordOrNot = () => {
		setShowPassword(!showPassword);
	};

	const checkStatus = () => {
		const statusPromises = [
			fetch('http://3.19.41.237:8001/check/event-service', {method: 'GET'})
				.then(response => response.json())
				.then(data => `Event Microservice: ${data['service status']}`)
				.catch((error) => {console.error('Error:', error);}),
			fetch('http://3.19.41.237:8001/check/group-service', {method: 'GET'})
				.then(response => response.json())
				.then(data => `Group Microservice: ${data['service status']}`)
				.catch((error) => {console.error('Error:', error);}),
			fetch('http://3.19.41.237:8001/check/user-service', {method: 'GET'})
				.then(response => response.json())
				.then(data => `User Microservice: ${data['service status']}`)
				.catch((error) => {console.error('Error:', error);})
		];

		Promise.all(statusPromises).then((results) => {
			const statusMessage = results.join('\n');
        	alert(statusMessage);
		});
	}

	return (
		<div className="login-page">
			<div className="login-form-container">
				<h1>Welcome Back</h1>
				<form onSubmit={handleLogin}>
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
							src={showPassword ? "/images/show.png" : "/images/hide.png"}
							alt="Show password"
							onClick={showPasswordOrNot}
							className="password-icon"
						/>
					</div>
					<button className="login-button" type="submit">Sign In</button>
				</form>
				<div className="register-link">
					Not a member yet? <Link className="loginLink" to="/register">Register now</Link>
				</div>
				<button className="checkStatus"onClick={checkStatus}>check microservices status</button>
			</div>
		</div>
	);
}

export default LoginPage;
