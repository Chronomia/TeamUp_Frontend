import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
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
        navigate("/explore");
    };

    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const openWindow= () => {
        setIsWindowOpen(true);
    };

    const closeWindow = () => {
        setIsWindowOpen(false);
    };

    const handleOutside = (e) => {
        if (e.target.id === "outside-window") {
            closeWindow();
        }
    };

    const [activeTab, setActiveTab] = useState('groups');

    const [group_name, setGroupName] = useState("");
    const [group_location, setGroupLocation] = useState("");
    const [group_interests, setGroupInterests] = useState("");
    const [group_intro, setGroupIntro] = useState("");
    const [group_policy, setGroupPolicy] = useState("");

    const handleCreate = (event) => {
        event.preventDefault();

    }

    const clearForm = () => {
        setGroupName("");
        setGroupLocation("");
        setGroupInterests("");
        setGroupIntro("");
        setGroupPolicy("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const mock_group = ["Group1", "Group2", "Group3"]

    const [event_name, setEventName] = useState("");
    const [event_capacity, setEventCapacity] = useState(1);
    const [event_description, setEventDescription] = useState("");
    const [event_location, setEventLocation] = useState("");
    const [event_time, setEventTime] = useState("");
    const [event_duration, setEventDuration] = useState(15);
    const [event_category, setEventCategory] = useState("");
    const [event_form, setEventForm] = useState("");
    const [setEventOrganizer] = useState("");
    const [event_group, setEventGroup] = useState("");

    const [isGroupOrganizer, setGroupOrganizer] = useState(false);

    const handleCheckUser = (e) => {
        setGroupOrganizer(true);
        setEventOrganizer(e.target.value);
    };

    const handleCapacity = (e) => {
        const value = Math.max(1, Math.min(100, Number(e.target.value)));
        setEventCapacity(value);
    }


    const clearEventForm = () => {
        setEventName("");
        setEventCapacity("");
        setEventDescription("");
        setEventLocation("");
        setEventTime("");
        setEventDuration("");
        setEventCategory("");
        setEventOrganizer("");
        setEventGroup("");
        setGroupOrganizer(false);
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
                        <img src="/images/leave.png" alt="log out"></img>
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
                            <h2 className="section-title">Joined groups ({groups.length})</h2>
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
                                <img src="/images/search-image.jpg" className="search-image" alt="Search-icon" />
                            </div>
                        </div>
                    </div>
                    <div ref={eventsRef} id="events" className="section">
                        <div className="events-section">
                            <h2 className="section-title">Joined Events ({groups.length})</h2>
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
                            <img src="/images/search-image.jpg" className="search-image" alt="Search-icon" />
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
                        <h2 className="section-title">Create your own groups/events</h2>
                        <button className="create-button" onClick={openWindow}>
                            <img src="/images/home-create.png" alt="create" style={{width:"30px", height: "30px", marginTop:"10px;"}}/>
                            <h3>Create New</h3>
                        </button>
                        {isWindowOpen && (
                            <div id="outside-window" className="outside-window" onClick={handleOutside}>
                                <div className="window-content">
                                    <span className="close-icon" onClick={closeWindow}>&times;</span>

                                    <div className="events-groups-container">
                                    <div className="select-to-view">
                                        <button className={activeTab === 'groups' ? 'active' : 'inactive'} onClick={() => setActiveTab('groups')}>Group</button>
                                        <button className={activeTab === 'events' ? 'active' : 'inactive'} onClick={() => setActiveTab('events')}>Event</button>
                                    </div>
                                    {activeTab === 'events' && (
                                        <div className="create-new-container">
                                            <div>
                                                <h3>Please enter your username below</h3>
                                                <input
                                                    id="event-username"
                                                    type="text"
                                                    value={group_name}
                                                    onChange={(e) => setGroupName(e.target.value)}
                                                    required
                                                />
                                                <button onClick={handleCheckUser}>Check</button>
                                            </div>
                                            <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>Please complete all questions.</h3>
                                            <form onSubmit={handleCreate}>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <select
                                                            id="group-select"
                                                            value={event_group}
                                                            onChange={(e) => setEventGroup(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        >
                                                            {mock_group.map((group, index) => (
                                                                <option key={index} value={group}>
                                                                    {group}
                                                                </option>
                                                            ))}
                                                    </select>
                                                        <label htmlFor="event-group">Group</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-name"
                                                            type="text"
                                                            value={event_name}
                                                            onChange={(e) => setEventName(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-name">Name</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-capacity"
                                                            type="number"
                                                            className="input-number"
                                                            min="1"
                                                            max="100"
                                                            value={event_capacity}
                                                            onChange={handleCapacity}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-capacity">Capacity</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-location"
                                                            type="text"
                                                            value={event_location}
                                                            onChange={(e) => setEventLocation(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-location">Location</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-time"
                                                            type="datetime-local"
                                                            className="input-number"
                                                            value={event_time}
                                                            onChange={(e) => setEventTime(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-time">Time</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-duration"
                                                            type="range"
                                                            value={event_duration}
                                                            min="15"
                                                            max="150"
                                                            step="15"
                                                            onChange={(e) => setEventDuration(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-duration">Durations: {event_duration} minutes</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-description"
                                                            type="text"
                                                            value={event_description}
                                                            onChange={(e) => setEventDescription(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-description">Descriptions</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <select
                                                            id="event-category"
                                                            value={event_category}
                                                            onChange={(e) => setEventCategory(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="Travel">Travel</option>
                                                            <option value="Food">Food</option>
                                                            <option value="Health & Fitness">Health & Fitness</option>
                                                            <option value="Gaming">Gaming</option>
                                                            <option value="Technology & Programming">Technology & Programming</option>
                                                            <option value="Arts & Creativity">Arts & Creativity</option>
                                                            <option value="Movies & Entertainment">Movies & Entertainment</option>
                                                            <option value="Music">Music</option>
                                                        </select>
                                                        <label htmlFor="event-interest">Related Categories</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="event-form"
                                                            type="text"
                                                            value={event_form}
                                                            onChange={(e) => setEventForm(e.target.value)}
                                                            disabled={!isGroupOrganizer}
                                                            required
                                                        />
                                                        <label htmlFor="event-capacity">Capacity</label>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="form-buttons">
                                                    <button onClick={clearEventForm}>Clear All</button>
                                                    <button onClick={handleSubmit}>Complete</button>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'groups' && (
                                        <div className="create-new-container">
                                            <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>Please complete all questions.</h3>
                                            <form onSubmit={handleCreate}>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="group-name"
                                                            type="text"
                                                            value={group_name}
                                                            onChange={(e) => setGroupName(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="email-address">Name</label>
                                                    </div>
                                                </div>

                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="group-location"
                                                            type="text"
                                                            value={group_location}
                                                            onChange={(e) => setGroupLocation(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="email-address">Location</label>
                                                    </div>
                                                </div>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="group-intro"
                                                            type="text"
                                                            value={group_intro}
                                                            onChange={(e) => setGroupIntro(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="email-address">Introduction</label>
                                                    </div>
                                                </div>

                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="group-policy"
                                                            type="text"
                                                            value={group_policy}
                                                            onChange={(e) => setGroupPolicy(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="email-address">Policy</label>
                                                    </div>
                                                </div>

                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <select
                                                            id="group-interest"
                                                            value={group_interests}
                                                            onChange={(e) => setGroupInterests(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="Travel">Travel</option>
                                                            <option value="Food">Food</option>
                                                            <option value="Health & Fitness">Health & Fitness</option>
                                                            <option value="Gaming">Gaming</option>
                                                            <option value="Technology & Programming">Technology & Programming</option>
                                                            <option value="Arts & Creativity">Arts & Creativity</option>
                                                            <option value="Movies & Entertainment">Movies & Entertainment</option>
                                                            <option value="Music">Music</option>
                                                        </select>
                                                        <label htmlFor="group-interest">Related Categories</label>
                                                    </div>
                                                </div>
                                                <div className="form-buttons">
                                                    <button onClick={clearForm}>Clear All</button>
                                                    <button onClick={handleSubmit}>Complete</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HomePage;