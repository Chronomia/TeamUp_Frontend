import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { Link } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();

    const firstName = 'Jane';
    const lastName = 'Doe';
    const interests = ["Travel", "Food", "Gaming"];
    const gender = "Female";
    const email = "zz2983@columbia.edu";
    const birth = "11/22/2000";
    const location = "New Yor, NY";
    const username = 'zz2983';
    const phoneNumber = '(123)321-1234';
    const groups = [];
    const events = [];

    const [activeSection, setActiveSection] = useState('personal');
    const personalRef = useRef(null);
    const groupsRef = useRef(null);
    const eventsRef = useRef(null);
    const exploreRef = useRef(null);


    useEffect(() => {
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = [personalRef, groupsRef, eventsRef, exploreRef];
    sections.forEach(section => {
      if(section.current) {
        observer.observe(section.current);
      }
    });

    return () => observer.disconnect();
    }, []);

    const handleLogout = () => {
        navigate('/login');
};

    const handleNavigate = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const interestToImage = {
        "Travel": "travel.png",
        "Food": "food.png",
        "Health & Fitness": "health.png",
        "Gaming": "game.png",
        "Technology & Programming": "technology.png",
        "Arts & Creativity": "arts.png",
        "Movies & Entertainment": "movie.png",
        "Music": "music.png"
    };

    const getImageFilename = (interest) => {
        let imageName = interest.replace(/ & /g, '').replace(/\s+/g, '').toLowerCase();
        return interestToImage[interest] || `${imageName}.png`;
    };

    const handleSearchGroups = () => {
        console.log("Navigate to groups page");
    };


    return(
        <div className="home-page">
            <div className="user-container">
                <div className="sidebar">
                    <h2 className="welcome-heading">Welcome!</h2>
                    <div className={`sidebar-item ${activeSection === 'personal' ? 'active' : ''}`} onClick={() => handleNavigate(personalRef)}>View Profile</div>
                    <div className={`sidebar-item ${activeSection === 'groups' ? 'active' : ''}`} onClick={() => handleNavigate(groupsRef)}>Joined Groups</div>
                    <div className={`sidebar-item ${activeSection === 'events' ? 'active' : ''}`} onClick={() => handleNavigate(eventsRef)}>Joined Events</div>
                    <div className={`sidebar-item ${activeSection === 'explores' ? 'active' : ''}`} onClick={() => handleNavigate(eventsRef)}>Explore</div>
                    <div className="logout-section" onClick={handleLogout}>
                        <img src="/images/leave.png"></img>
                        <span>Log out</span>
                    </div>
                </div>
                <div className="main-content">
                    <div ref={personalRef} id="personal" style={{marginLeft:"10%"}} className="section">
                        <h1>{`${firstName}, ${lastName}`}</h1>
                        <div className="profile-content">
                            <div className="profile-detail">
                                <div className="detail-box">
                                    <img src={`/images/${gender}.png`} alt={"user-name"}></img>
                                    <p>{username}</p>
                                </div>
                                <div className="detail-box">
                                    <img src={`/images/email.png`} alt={"email-address"}></img>
                                    <p>{email}</p>
                                </div>
                                <div className="detail-box">
                                    <img src={`/images/smartphone.png`} alt={"phone-number"}></img>
                                    <p>{phoneNumber}</p>
                                </div>
                                <div className="detail-box">
                                    <img src={`/images/cake.png`} alt={"birth-date"}></img>
                                    <p>{birth}</p>
                                </div>
                                <div className="detail-box">
                                    <img src={`/images/location.png`} alt={"city-state"}></img>
                                    <p>{location}</p>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="top-right-content">
                                    <h3>Your Interests</h3>
                                    <div className="interest-section">
                                        {interests.map(interest => (
                                            <div key={interest} className={"interests-item"}>
                                            <img src={`/images/${getImageFilename(interest)}`} className={"interest-icon"} alt={interest} />
                                            <span>{interest}</span>
                                            </div>
                                            ))}
                                    </div>
                                </div>
                                <button className="edit-profile-button">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                    <div ref={groupsRef} id="groups" className="section">
                        <div className="groups-section">
                            <h2 className="section-title">Your groups ({groups.length})</h2>
                            {groups.length > 0 ? (
                                groups.map((group) => (
                                    <div key={group.id}>{group.name}</div>
                                ))
                            ) : (
                                <p>You haven't joined any groups.</p>
                            )}
                            <div className="search-more-container" onClick={handleSearchGroups}>
                                <div className="left-search">
                                    <button className="search-button">
                                        <img src="/images/search.png" alt="Search" />
                                    </button>
                                    <div className="search-text">
                                        <h2>Join more groups</h2>
                                        <p>Discover communities on our site.</p>
                                    </div>
                                </div>
                                <img src="/images/search-image.jpg" className="search-image" alt="Search-image" />
                            </div>
                        </div>
                    </div>
                    <div ref={eventsRef} id="events" className="section">
                        <div className="events-section">
                            <h2 className="section-title">Your Events ({groups.length})</h2>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <div key={event.id}>{event.name}</div>
                                ))
                            ) : (
                                <p>You haven't participate any events.</p>
                            )}
                        </div>
                        <div className="search-more-container" onClick={handleSearchGroups}>
                            <div className="left-search">
                                <button className="search-button">
                                    <img src="/images/search.png" alt="Search" />
                                </button>
                                <div className="search-text">
                                    <h2>Join more events</h2>
                                    <p>Discover more on our site.</p>
                                </div>
                            </div>
                            <img src="/images/search-image.jpg" className="search-image" alt="Search-image" />
                        </div>
                    </div>
                    <div ref={exploreRef} id="explores" className="section">
                        <h2 className="section-title">Explore all interests</h2>
                        <div className="interests-section">
                            {Object.entries(interestToImage).map(([interest, imageName]) => (
                              <div className="interest-item" key={interest}>
                                <img src={`/images/${imageName}`} className="explore-interest" alt={interest} />
                                <p>{interest}</p>
                              </div>
                            ))}
                        </div>
                        <h2 className="section-title">Explore all events</h2>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HomePage;