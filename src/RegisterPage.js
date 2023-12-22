import React, { useState } from "react";
import "./RegisterPage.css";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [selectedInterests, setSelectedInterests] = useState("");

    const handleRegister = (event) => {
        event.preventDefault();
        const userData = {
            "username": username,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "contact": contact,
            "location": location,
            "interests": selectedInterests,
            "age": age,
            "gender": gender,
            "_id": "string",
            "friends": [],
            "password": password
        }
        fetch('http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.detail) {
                alert(data.detail);
            }
            else{
                console.log('Success:', data);
                alert(`User created successfully! Welcome, ${data.username}.`);
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const interests = [
        {id: "travel", name: "Travel"},
        {id: "food", name: "Food"},
        {id: "health", name: "Health & Fitness"},
        {id: "game", name: "Gaming"},
        {id: "technology", name: "Technology & Programming"},
        {id: "arts", name: "Arts & Creativity"},
        {id: "movie", name: "Movies & Entertainment"},
        {id: "music", name: "Music"}
    ];

    const toggleInterest = (interest) => {
        setSelectedInterests(prevSelectedInterests =>
            prevSelectedInterests.includes(interest) ? prevSelectedInterests.filter(i => i !== interest) : [...prevSelectedInterests, interest]
        );
    };

  const handleGoBack = (event) => {
		event.preventDefault();
		navigate('/login');
	};

  return (
      <div className="register-page">
          <div className="register-form-container">
              <h1 style={{color: "#1B4235"}}>CREATE ACCOUNT</h1>
              <p style={{color: "#1B4235"}}>Please complete all questions.</p>
              <form onSubmit={handleRegister}>
                  <h3>Login Information</h3>
                  <div className="form-section">
                      <div className="input-wrapper">
                          <input
                              id="user-name"
                              type="text"
                              className="register-input"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                          />
                          <label htmlFor="user-name">Username</label>
                      </div>
                      <div className="input-wrapper">
                          <input
                              id="pass-word"
                              type="password"
                              className="register-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          <label htmlFor="pass-word">Password</label>
                      </div>
                  </div>
                  <h3>Name</h3>
                  <div className="form-section">
                      <div className="input-wrapper">
                          <input
                              id="first-name"
                              type="text"
                              className="register-input"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                          />
                          <label htmlFor="first-name">First Name</label>
                      </div>
                      <div className="input-wrapper">
                          <input
                              id="last-name"
                              type="text"
                              className="register-input"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                          />
                          <label htmlFor="last-name">Last Name</label>
                      </div>
                  </div>
                  <h3>Contact Information</h3>
                  <div className="form-section">
                      <div className="input-wrapper">
                          <input
                              id="email-address"
                              type="email"
                              className="register-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          <label htmlFor="email-address">Email</label>
                      </div>
                      <div className="input-wrapper">
                          <input
                              id="contact-number"
                              type="tel"
                              className="register-input"
                              value={contact}
                              onChange={(e) => setContact(e.target.value)}
                              required
                          />
                          <label htmlFor="contact-number">Phone Number</label>
                      </div>
                  </div>
                  <div className="form-section">
                      <h3 style={{marginRight: "20px"}}>Location</h3>
                      <div className="input-wrapper">
                          <input
                              id="city-state"
                              type="text"
                              className="register-input"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required
                          />
                          <label htmlFor="contact-number">City, State(Abbv)</label>
                      </div>
                  </div>
                  <div className="form-section">
                      <div className="input-wrapper">
                          <input
                              id="user-age"
                              type="number"
                              min="1"
                              max="150"
                              className="register-input"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              required
                          />
                          <label htmlFor="user-age">Age</label>
                      </div>
                      <div className="input-wrapper">
                          <select id="gender-select" className="profile-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                              <option value="">Select Gender</option>
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                          </select>
                          <label htmlFor="gen-der">Gender</label>
                      </div>
                  </div>
                  <h3>Select at least one interest</h3>
                  <div className="interests-section">
                      {interests.map(interest => (
                          <div
                            key={interest.name}
                            className={`interest-item ${selectedInterests.includes(interest.name) ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest.name)}
                          >
                            <img src={`/images/${interest.id}.png`} alt={interest.name} className={'interests-icon'}/>
                            <span>{interest.name}</span>
                          </div>
                        ))}
                  </div>
                  <div className="button-container">
                      <button className="button" type="submit">Complete</button>
                      <button className="button" onClick={handleGoBack}>Return to signin</button>
                  </div>
              </form>
          </div>



      </div>
  );
}

export default RegisterPage;