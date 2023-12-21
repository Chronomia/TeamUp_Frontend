import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./HomePage.css";
import {v4 as uuidv4} from "uuid";
function HomePage() {
    const navigate = useNavigate();

    const { v4: uuidv4 } = require('uuid');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [interests, setInterests] = useState([]);
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(1);
    const [userLocation, setUserLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [id, setId] = useState("");
    const [displayInterests, setDisplayInterests] = useState([]);
    const [groups_own, setGroupsOwn] = useState([]);
    let groups = [];
    let events = [];
    const location = useLocation();
    const [username, setUsername] = useState(location.state?.username);

    useEffect(()=>{
        fetch(`http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/users/name/${username}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setPhoneNumber(data.contact);
                setUserLocation(data.location);
                setInterests(data.interests);
                setDisplayInterests(data.interests);
                setAge(data.age);
                setGender(data.gender);
                setId(data.id);
                setUsername(data.username);
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });
    }, [username]);



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
        navigate("/explore", { state: { user: username,  groupCategory: " "} })
    };

    const [isEditOpen, setIsEditOpen] = useState(false);
    const openEditWindow= () => {
        setIsEditOpen(true);
    };

    const closeEditWindow = () => {
        setIsEditOpen(false);
    };
    const [isGroupWindowOpen, setIsGroupWindowOpen] = useState(false);
    const openGroupWindow= () => {
        setIsGroupWindowOpen(true);
    };

    const closeGroupWindow = () => {
        setIsGroupWindowOpen(false);
    };

    const handleOutside = (e) => {
        if (e.target.id === "outside-window") {
            closeGroupWindow();
            closeEditWindow();
            closeEventWindow()
        }
    };

    const addInterests = (event) => {
        setInterests([...interests, event]);
    };

    const removeInterest = (event) => {
        setInterests(interests.filter((i) => i !== event));
    };

    const remainInterests = Object.keys(interestToImage).filter((remain) => !interests.includes(remain));


    const [group_name, setGroupName] = useState("");
    const [group_location, setGroupLocation] = useState("");
    const [group_interests, setGroupInterests] = useState("");
    const [group_intro, setGroupIntro] = useState("");
    const [group_policy, setGroupPolicy] = useState("");
    const [events_own, setEventOwn] = useState([]);

    const handleCreateGroup = (event) => {
        event.preventDefault();
        const group_data ={
            "group_id": uuidv4(),
            "group_name": group_name,
            "founder": "/users/name/" + `${username}`,
            "location": group_location,
            "category": group_interests,
            "intro": group_intro,
            "policy": group_policy
        };
        fetch('https://coms6156-f23-sixguys.ue.r.appspot.com/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(group_data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.detail) {
                    alert(data.detail);
                }
            else{
                alert(`Group created successfully!.`);
                setGroupsOwn([...groups_own, group_data]);
                clearForm();
                closeGroupWindow();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    const clearForm = () => {
        setGroupName("");
        setGroupLocation("");
        setGroupInterests("");
        setGroupIntro("");
        setGroupPolicy("");
    };



    const [event_name, setEventName] = useState("");
    const [event_capacity, setEventCapacity] = useState(1);
    const [event_description, setEventDescription] = useState("");
    const [event_location, setEventLocation] = useState("");
    const [event_time, setEventTime] = useState("");
    const [event_duration, setEventDuration] = useState(15);
    const [event_category, setEventCategory] = useState("");
    const [event_form, setEventForm] = useState("");
    const [event_group, setEventGroup] = useState("");
    const [event_tag2, setEventTag] = useState("");

    const [isGroupOrganizer, setGroupOrganizer] = useState(false);
    const [isEventWindowOpen, setIsEventWindowOpen] = useState(false);

    const openEventWindow = () => {
        setIsEventWindowOpen(true);
    }

    const closeEventWindow = () => {
        setIsEventWindowOpen(false);
    }
    const handleCapacity = (e) => {
        const value = Math.max(1, Math.min(100, Number(e.target.value)));
        setEventCapacity(value);
    }


    const clearEventForm = () => {
        setEventName("");
        setEventCapacity(1);
        setEventDescription("");
        setEventLocation("");
        setEventTime("");
        setEventDuration(15);
        setEventCategory("");
        setEventGroup("");
        setEventTag("");
    };

    const handleCreateEvent = (event) => {
        event.preventDefault();
        const event_data = {
            "event_id": uuidv4(),
            "status": "In Progress",
            "capacity": event_capacity,
            "event_name": event_name,
            "description": event_description,
            "location": event_location,
            "time": event_time,
            "group_id": event_group,
            "organizer_id": username,
            "tag_1": event_category,
            "tag_2": event_tag2,
            "duration": event_duration
        }
        fetch(`http://3.134.34.54:8011/api/${event_group}/events?user_id=${username}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event_data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.detail) {
                    alert(data.detail);
                }
                else{
                    alert(`Event created successfully!.`);
                    setEventOwn([...events_own, event_data])
                    clearEventForm();
                    closeEventWindow();
                }
            })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleEditProfile = (event) =>{
        event.preventDefault();
        const userData = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "contact": phoneNumber,
            "location": userLocation,
            "interests": interests,
            "age": age,
            "gender": gender,
            "_id": "string",
            "friends": [],
        }
        fetch( 'http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/users/'+ id + "/profile", {
            method: 'PUT',
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
                    navigate(0);
                }

            })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const directToGroups = (interest) => {
        navigate('/explore', { state: { user: username,  groupCategory: interest} })
    }

    const [deleteWindow, setDeleteWindow] = useState(false);
    const openDeleteWindow = () => {
        setDeleteWindow(true);
    }

    const closeDeleteWindow = () => {
        setDeleteWindow(false);
    }
    const handleDeleteAccount = () =>{
        fetch(`http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/users/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error deleting user account:', error);
            });
        navigate('/login');
    }

    useEffect(()=>{
        if(username){
            fetch(`https://coms6156-f23-sixguys.ue.r.appspot.com/groups?page=1&page_size=1100`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    const groups = data.filter(group => group.founder === `/users/name/${username}`);
                    setGroupsOwn(groups);
                    if(groups_own){
                        setGroupOrganizer(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [username]);

    const event_tags = ["conference", "exhibition", "hackathon", "meetup", "panel discussion", "product launch", "seminar", "training", "webinar", "workshop"];

    useEffect(()=>{
        if(username){
            fetch(`http://3.134.34.54:8011/api/events?limit=1000`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    const events = data.filter(event => event.organizer_id === username);
                    setEventOwn(events);
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [username]);
    return(
        <div className="home-page">
            <div className="user-container">
                <div className="sidebar">
                    <h2 className="welcome-heading">Welcome!</h2>
                    <div className={`sidebar-item ${activeSection === 'personal' ? 'active' : ''}`} onClick={() => handleNavigate(personalRef)}>View Profile</div>
                    <div className={`sidebar-item ${activeSection === 'groups' ? 'active' : ''}`} onClick={() => handleNavigate(groupsRef)}>Joined Groups</div>
                    <div className={`sidebar-item ${activeSection === 'events' ? 'active' : ''}`} onClick={() => handleNavigate(eventsRef)}>Joined Events</div>
                    <div className={`sidebar-item ${activeSection === 'explores' ? 'active' : ''}`} onClick={() => handleNavigate(eventsRef)}>Explore</div>
                    <div className="delete-section" onClick={openDeleteWindow}>
                        <img src="/images/delete.png" alt="delete account"></img>
                        <span>Delete account</span>
                    </div>
                    {deleteWindow && (
                        <div class="delete-modal">
                            <p>Are you sure you want to delete your account?</p>
                            <button onClick={handleDeleteAccount} className="delete-yes">Yes</button>
                            <button onClick={closeDeleteWindow} className="delete-no">No</button>
                        </div>
                    )};
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
                                    <p>{age}</p>
                                </div>
                                <div className="detail-box">
                                    <img src={`/images/location.png`} alt={"city-state"}></img>
                                    <p>{userLocation}</p>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="top-right-content">
                                    <h3>Your Interests</h3>
                                    <div className="interest-section">
                                        {displayInterests.map(interest => (
                                            <div key={interest} className={"interests-item"}>
                                            <img src={`/images/${getImageFilename(interest)}`} className={"interest-icon"} alt={interest} />
                                            <span>{interest}</span>
                                            </div>
                                            ))}
                                    </div>
                                </div>
                                <button className="edit-profile-button" onClick={openEditWindow}>Edit Profile</button>
                                {isEditOpen && (
                                    <div id="outside-window" className="outside-window" onClick={handleOutside}>
                                        <div className="edit-content">
                                            <span className="close-icon" onClick={closeEditWindow}>&times;</span>
                                            <h2>Edit Profile</h2>
                                            <form>
                                                <h3 className="input-header">Name</h3>
                                                <div className="form-section">
                                                    <div className="input-section">
                                                        <input
                                                            id="first-name"
                                                            type="text"
                                                            className="edit-input"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="first-name" className="input-label">First Name</label>
                                                    </div>
                                                    <div className="input-section">
                                                        <input
                                                            id="last-name"
                                                            type="text"
                                                            className="edit-input"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="last-name" className="input-label">Last Name</label>
                                                    </div>
                                                </div>
                                                <h3 className="input-header">Contact Information</h3>
                                                <div className="form-section">
                                                    <div className="input-section">
                                                        <input
                                                            id="email-address"
                                                            type="email"
                                                            className="edit-input"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="email-address" className="input-label">Email</label>
                                                    </div>
                                                    <div className="input-section">
                                                        <input
                                                            id="contact-number"
                                                            type="tel"
                                                            className="edit-input"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="contact-number" className="input-label">Phone Number</label>
                                                    </div>
                                                </div>
                                                <h3 className="input-header">Location</h3>
                                                <div className="form-section">
                                                    <div className="input-section">
                                                        <input
                                                            id="city-state"
                                                            type="text"
                                                            className="edit-input"
                                                            value={userLocation}
                                                            onChange={(e) => setUserLocation(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-section">
                                                    <div className="input-section">
                                                        <input
                                                            id="user-age"
                                                            type="number"
                                                            min="1"
                                                            max="150"
                                                            className="edit-input"
                                                            value={age}
                                                            onChange={(e) => setAge(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="user-age" className="input-label">Age</label>
                                                    </div>
                                                    <div className="input-section">
                                                        <select id="gender-select" className="edit-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option value="female">Female</option>
                                                            <option value="male">Male</option>
                                                        </select>
                                                        <label htmlFor="gen-der" className="input-label">Gender</label>
                                                    </div>
                                                </div>
                                                <div className="edit-interests-container">
                                                    <h3 className="input-header">Your interests</h3>
                                                    <div className="current-interests">
                                                        {interests.map((interest) => (
                                                            <div key={interest}>
                                                                <button className="interest-tag" onClick={() => removeInterest(interest)}>
                                                                    {interest}<img src="/images/remove.png" alt="Remove" className="remove-interest" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <h3 className="input-header">Add more interests</h3>
                                                    <div className="current-interests">
                                                        {remainInterests.map((interest) => (
                                                            <div key={interest} >
                                                                <button className="remain-interest" onClick={() => addInterests(interest)}>
                                                                    {interest}<img src="/images/add.png" alt="Add" className="remove-interest" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                                <div className="button-container">
                                                    <button className="edit-button" type="submit" onClick={handleEditProfile}>Complete</button>
                                                    <button className="edit-button" onClick={closeEditWindow}>Back</button>
                                                </div>

                                            </form>
                                        </div>
                                   </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div ref={groupsRef} id="groups" className="section">
                        <div className="groups-section">
                            <h2 className="section-title">Your Groups ({groups_own.length})</h2>
                            <div className="your-groups-container">
                                {groups_own.length > 0 ? (
                                    groups_own.map((group) => (
                                        <div className="ownGroups-container" key={group.group_id}>
                                            <img src="/images/group_icon.jpg" alt={group.group_name}></img>
                                            <div className="group-found-text">{group.group_name}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>You haven't created any groups.</p>
                                )}
                            </div>

                            <h2 className="section-title">Member - Joined Groups ({groups.length})</h2>
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
                            <h2 className="section-title">Your Events ({events_own.length})</h2>
                            {events_own.length > 0 ? (
                                    events_own.map((event) => (
                                        <div className="ownGroups-container" key={event.group_id}>
                                            <img src="/images/group_icon.jpg" alt={event.group_name}></img>
                                            <div className="group-found-text">{event.group_name}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>You haven't organized any events. To organize an event, you must be a founder of any group.</p>
                            )}
                        </div>
                        <div className="events-section">
                            <h2 className="section-title">Attendees - Joined Events ({groups.length})</h2>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <div key={event.id}>{event.name}</div>
                                ))
                            ) : (
                                <p>You haven't participated any events.</p>
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
                              <div className="interest-item" key={interest} onClick={() => directToGroups(interest)}>
                                <img src={`/images/${imageName}`} className="explore-interest" alt={interest} />
                                <p>{interest}</p>
                              </div>
                            ))}
                        </div>
                        <h2 className="section-title">Create your own groups/events</h2>
                        <div className="create-your-own-container">
                            <button className="create-button" onClick={openGroupWindow}>
                                <img src="/images/home-create.png" alt="create" style={{width:"20px", height: "20px", margin:"10px;"}}/>
                                <span style={{color: "#F1EBE5", marginLeft: "10px", fontWeight: "bold"}}>Create a group</span>
                            </button>
                            <button className="create-button" onClick={openEventWindow}>
                                <img src="/images/home-create.png" alt="create" style={{width:"20px", height: "20px", marginTop:"10px;"}}/>
                                <span style={{color: "#F1EBE5", marginLeft: "10px", fontWeight: "bold"}}>Create an event</span>
                        </button>
                        </div>
                        {isGroupWindowOpen && (
                            <div id="outside-window" className="outside-window" onClick={handleOutside}>
                                <div className="window-content">
                                    <span className="close-icon" onClick={closeGroupWindow}>&times;</span>
                                    <div className="events-groups-container">
                                        <div className="create-new-container">
                                            <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>Please complete all questions.</h3>
                                            <form onSubmit={handleCreateGroup}>
                                                <div className="create-form-container">
                                                    <div className="create-new-wrapper">
                                                        <input
                                                            id="group-founder"
                                                            type="text"
                                                            value={username}
                                                            //disabled={true}
                                                            required
                                                        />
                                                        <label htmlFor="group-founder">Founder</label>
                                                    </div>
                                                </div>
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
                                                    <button type="submit">Complete</button>
                                                    <button onClick={clearForm}>Clear All</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )};
                        {isEventWindowOpen && (
                            <div id="outside-window" className="outside-window" onClick={handleOutside}>
                                <div className="window-content">
                                    <span className="close-icon" onClick={closeEventWindow}>&times;</span>
                                    <div className="events-groups-container">
                                        <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>Please complete all questions.</h3>
                                        <form onSubmit={handleCreateEvent}>
                                            <div className="create-form-container">
                                                <div className="create-new-wrapper">
                                                    <select
                                                        id="group-select"
                                                        value={event_group}
                                                        onChange={(e) => setEventGroup(e.target.value)}
                                                        disabled={!isGroupOrganizer}
                                                        required
                                                    >
                                                        {groups_own.length > 0 ? (
                                                            groups_own.map((group) => (
                                                                <option key={group.group_id} value={group.group_id}>
                                                                    {group.group_name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">You haven't created any group yet.</option>
                                                        )}
                                                    </select>
                                                    <label htmlFor="event-group">Group</label>
                                                </div>
                                            </div>
                                            <div className="create-form-container">
                                                <div className="create-new-wrapper">
                                                    <select
                                                        id="event-tag2" value={event_tag2}
                                                        onChange={(e) => setEventTag(e.target.value)}
                                                        disabled={!isGroupOrganizer}
                                                        required
                                                    >
                                                        {event_tags.map((tag) => (
                                                            <option value={tag}>{tag}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="event-tag2">Event Form</label>
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
                                                    <label htmlFor="event-category">Related Categories</label>
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
                                                        id="event-name"
                                                        type="text"
                                                        value={event_name}
                                                        onChange={(e) => setEventName(e.target.value)}
                                                        disabled={!isGroupOrganizer}
                                                        required
                                                    />
                                                    <label htmlFor="event-name">Event Name</label>
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
                                            <div className="form-buttons">
                                                <button type="submit">Complete</button>
                                                <button onClick={clearEventForm}>Clear All</button>
                                            </div>
                                        </form>
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