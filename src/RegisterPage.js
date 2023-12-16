import React, { useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [selectedInterests, setSelectedInterests] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();


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
      prevSelectedInterests.includes(interest)
        ? prevSelectedInterests.filter(i => i !== interest)
        : [...prevSelectedInterests, interest]
    );
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
                              id="birth-date"
                              type="date"
                              value={birthDate}
                              onChange={(e) => setBirthDate(e.target.value)}
                              required
                          />
                          <label htmlFor="birth-date">Birth Date</label>
                      </div>
                      <div className="input-wrapper">
                          <select id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                              <option value="">Select Gender</option>
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                          </select>
                          <label htmlFor="gen-der">Gender</label>
                      </div>
                  </div>
                  <h3>Select at least one interest</h3>
                  <div className="interests-section">
                      {interests.map(interest => (
                          <div
                            key={interest.id}
                            className={`interest-item ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest.id)}
                          >
                            <img src={`/images/${interest.id}.png`} alt={interest.name} className={'interests-icon'}/>
                            <span>{interest.name}</span>
                          </div>
                        ))}
                  </div>
                  <div className="button-container">
                      <button className="button" type="submit">Complete</button>
                  </div>
              </form>
          </div>



      </div>
  );

};

export default RegisterPage;