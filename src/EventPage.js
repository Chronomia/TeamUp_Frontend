import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./EventPage.css";

function EventPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const [username, setUsername] = useState(location.state.username);
    const [eventID, setEventID] = useState(location.state.event_id);
    const event_tags = ["conference", "exhibition", "hackathon", "meetup", "panel discussion", "product launch", "seminar", "training", "webinar", "workshop"];
    const event_status = ["Cancelled", "Completed", "In Progress", "Scheduled"];

    const handleExplorePage = () =>{
        navigate('/explore', { state: { user: username,  groupCategory: " "} })
    };
    const [eventName, setEventName] = useState("");
    const [eventFounder, setEventFounder] = useState("jsumshon7");
    const [eventLocation, setEventLocation] = useState("");
    const [eventStatus, setEventStatus] = useState("");
    const [eventCapacity, setEventCapacity] = useState(0);
    const [eventTag2, setEventTag2] = useState("");
    const [eventCategory, setEventCategory] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventGroupOwn, setEventGroupOwn] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDuration, setEventDuration] = useState(15);
    const [organizerFirstName, setOrganizerFirstName] = useState("");
    const [organizerLastName, setOrganizerLastName] = useState("");
    const [organizerEmail, setOrganizerEmail] = useState("");
    const [eventComments, setEventComments] = useState([]);
    const [eventParticipants, setEventParticipants] = useState([]);
    const [currentParticipants, setParticipants] = useState(0);

    useEffect(() =>  {
        let url = `http://3.134.34.54:8011/api/events/${eventID}`;
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setEventStatus(data.status);
                setEventCapacity(data.capacity);
                setEventName(data.event_name);
                setEventDescription(data.description);
                setEventLocation(data.location);
                setEventTime(data.time);
                setEventGroupOwn(data.group_id);
                setEventCategory(data.tag_1);
                setEventTag2(data.tag_2);
                setEventDuration(data.duration)
                if(data.organizer_id){
                    setEventFounder(data.organizer_id);
                }
                console.log(data);
            })
            .catch(error => {
                console.log('Error fetching event info:', error);
            })
    }, []);

    useEffect(()=>{
        fetch(`http://ec2-44-219-26-13.compute-1.amazonaws.com:8000/users/name/${eventFounder}`)
            .then(response => response.json())
            .then(data => {
                setOrganizerFirstName(data.first_name);
                setOrganizerLastName(data.last_name);
                setOrganizerEmail(data.email);
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });
    }, [eventFounder]);

    useEffect(() =>  {
        let url = `http://3.134.34.54:8011/api/events/${eventID}/comments`;
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setEventComments(data);
                console.log(data);
            })
            .catch(error => {
                console.log('Error fetching event info:', error);
            })
    }, []);

    useEffect(() =>  {
        let url = `http://3.134.34.54:8011/api/events/${eventID}/members`;
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setEventParticipants(data);
                setParticipants(eventParticipants.length)
            })
            .catch(error => {
                console.log('Error fetching event info:', error);
            })
    }, []);

    const [isParticipant, setIsParticipant] = useState(false);

    useEffect(() => {
        if(eventParticipants.length > 0){
            setIsParticipant(eventParticipants.includes(username) && username !== eventFounder);
        }
    }, [eventParticipants, username]);

    const handleJoinEvent = () => {
        if(eventStatus in ["Complete", "Cancel"]){
            alert("Sorry, registration close.")
        }
        else if(eventCapacity === currentParticipants){
            alert("Sorry, no more slots.")
        }
        else{
            let url = `http://3.134.34.54:8011/api/events/${eventID}/members?user_id=${username}`;
            fetch(url, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.detail) {
                        alert(data.detail);
                    }
                    else{
                        console.log('Success:', data);
                        alert("Thank you for your join.")

                        navigate(0);
                    }
                })
                .catch(error => {
                    console.log('Error fetching event info:', error);
                })
        }


    };

    const handleLeaveEvent = () => {
        fetch( `http://3.134.34.54:8011/api/events/${eventID}/members?user_id=${username}`, {
            method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.detail) {
                        alert(data.detail);
                    }
                    else{
                        console.log('Success:', data);
                        alert("You left event successfully!")
                        navigate(0);
                    }

                })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDeleteEvent = () =>{
        fetch(`http://3.134.34.54:8011/api/events/${eventID}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert("Event deleted!")
            })
            .catch(error => {
                console.error('Error deleting user account:', error);
            });
        navigate('/explore', { state: { user: username,  groupCategory: " "} })
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };
    const handleEditGroup = () => {
        openEditModal();
    };

    const handleOutside = (e) => {
        if (e.target.id === "outside-edit") {
            closeEditModal();
        }
    };

    const handleCapacity = (e) => {
        const value = Math.max(1, Math.min(100, Number(e.target.value)));
        setEventCapacity(value);
    }

    const handleEditEvent = (event) => {
        event.preventDefault();
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_name?event_name=${eventName}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_duration?duration=${eventDuration}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_location?location=${eventLocation}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_time?duration=${eventLocation}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_capacity?capacity=${eventCapacity}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_status?status=${eventStatus}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_description?description=${eventDescription}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data)}).catch((error) => {console.error('Error:', error);});
        fetch(`http://3.134.34.54:8011/api/events/${eventID}/update_tag2?tag_2=${eventTag2}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => {console.log(data); alert(`Event update successfully!`); navigate(0);}).catch((error) => {console.error('Error:', error);});

    }


    const [activeTab, setActiveTab] = useState("about");

    return(
        <div className="event-page">
            <div className="event-container">
                <div className="upper-group-container">
                    <div className="upper-left-container">
                        <img src="/images/event-icon.jpg"></img>
                    </div>
                    <div className="upper-right-container">
                        <div className="event-info">
                            <h1>{eventName}</h1>
                            <img style={{cursor: "pointer"}} src="/images/backttoHome.png" alt="back" onClick={handleExplorePage}></img>
                        </div>
                        <div className="event-info">
                            <img src="/images/locate.png" alt="location"></img>
                            <p>{eventLocation}</p>
                        </div>
                        <div className="event-info">
                            <img src="/images/status.png" alt="member"></img>
                            <p>{eventStatus}</p>
                        </div>
                        <div className="event-info">
                            <img src="/images/organizer.png" alt="founder"></img>
                            <p>Hosted By {organizerFirstName} {organizerLastName}</p>
                        </div>
                        <div className="organizer-options">
                             {username === eventFounder ? (
                                 <>
                                     <button onClick={openEditModal}>Edit Event</button>
                                     <button onClick={handleDeleteEvent}>Delete Event</button>
                                     {isEditModalOpen && (
                                         <div id="outside-edit" className="outside-Edit" onClick={handleOutside}>
                                             <div className="window-content">
                                                 <span className="close-icon" onClick={closeEditModal}>&times;</span>
                                                 <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>You can change the information of the event here.</h3>
                                                 <form onSubmit={handleEditEvent}>
                                                    <div className="create-form-container">
                                                        <div className="create-new-wrapper">
                                                            <select
                                                                id="event-tag2"
                                                                value={eventTag2}
                                                                onChange={(e) => setEventTag2(e.target.value)}
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
                                                                value={eventCategory}
                                                                onChange={(e) => setEventCategory(e.target.value)}
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
                                                            <select
                                                                id="event-status"
                                                                value={eventStatus}
                                                                onChange={(e) => setEventStatus(e.target.value)}
                                                                required
                                                            >
                                                                {event_status.map((status) => (
                                                                    <option value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                            <label htmlFor="event-status">Event Status</label>
                                                        </div>
                                                    </div>
                                                    <div className="create-form-container">
                                                        <div className="create-new-wrapper">
                                                            <input
                                                                id="event-duration"
                                                                type="range"
                                                                value={eventDuration}
                                                                min="15"
                                                                max="150"
                                                                step="15"
                                                                onChange={(e) => setEventDuration(e.target.value)}
                                                                required
                                                            />
                                                            <label htmlFor="event-duration">Durations: {eventDuration} minutes</label>
                                                        </div>
                                                    </div>
                                                    <div className="create-form-container">
                                                        <div className="create-new-wrapper">
                                                            <input
                                                                id="event-capacity"
                                                                type="number"
                                                                className="input-number"
                                                                min={currentParticipants}
                                                                max="100"
                                                                value={eventCapacity}
                                                                onChange={handleCapacity}
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
                                                                value={eventName}
                                                                onChange={(e) => setEventName(e.target.value)}
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
                                                                value={eventLocation}
                                                                onChange={(e) => setEventLocation(e.target.value)}
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
                                                                value={eventTime}
                                                                onChange={(e) => setEventTime(e.target.value)}
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
                                                                value={eventDescription}
                                                                onChange={(e) => setEventDescription(e.target.value)}
                                                                required
                                                            />
                                                            <label htmlFor="event-description">Descriptions</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-buttons">
                                                        <button type="submit">Complete</button>
                                                        <button onClick={closeEditModal}>Close</button>
                                                    </div>
                                                </form>
                                             </div>
                                         </div>
                                     )

                                     }
                                 </>
                             ) : isParticipant  ? (
                            <button onClick={handleLeaveEvent}>Leave Event</button>
                            ) : (
                            <button onClick={handleJoinEvent}>Join Event</button>
                                )}
                        </div>
                    </div>
                </div>
            <div className="lower-group-container">
                    <div className="group-detail-navigator">
                        <button className={activeTab === 'about' ? 'active' : 'inactive'} onClick={() => setActiveTab('about')}>About</button>
                        <button className={activeTab === 'attendees' ? 'active' : 'inactive'} onClick={() => setActiveTab('attendees')}>Attendees</button>
                        <button className={activeTab === 'comments' ? 'active' : 'inactive'} onClick={() => setActiveTab('comments')}>Comments</button>

                    </div>
                    {activeTab === 'about' && (
                        <div className="group-text-details">
                            <h1>What we're about</h1>
                            <p>{eventDescription}</p>
                            <h2>What is the time for the event?</h2>
                            <p>{eventTime}</p>
                            <h2>Max number of attendees</h2>
                            <p>{eventCapacity}</p>
                            <h2>Event duration</h2>
                            <p>{eventDuration} minutes</p>
                            <h2>Event form</h2>
                            <p>{eventTag2}</p>
                        </div>
                    )}
                    {activeTab === 'attendees' && (
                        eventParticipants.length > 0 ? (
                            <div className="comment-container">
                                {eventParticipants.map((person) => (
                                    <div className="event-comments-container" key={person}>
                                        <img src="/images/haha.png" alt={person}></img>
                                        <div className="comment-text">Attendee: {person}</div>
                                    </div>
                                ))}
                            </div>

                            ) : (
                                <p>No attendees.</p>
                            )
                    )}
                    {activeTab === 'comments' && (
                        eventComments.length > 0 ? (
                            <div className="comment-container">
                                {eventComments.map((comment) => (
                                    <div className="event-comments-container" key={comment.comment_id}>
                                        <img src="/images/tom.jpeg" alt={comment.comment_id}></img>
                                        <div className="comment-text">{comment.text}</div>
                                    </div>
                                ))}
                            </div>

                            ) : (
                                <p>No comments.</p>
                            )
                    )}
                </div>

            </div>
        </div>
    );
}


export default EventPage;