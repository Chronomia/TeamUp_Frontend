import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./GroupPage.css";

function GroupPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const [username, setUsername] = useState(location.state.username);
    const [groupID, setGroupID] = useState(location.state.group_id);
    const [groupName, setGroupName] = useState("");
    const [groupFounder, setGroupFounder] = useState("jsumshon7");
    const [groupCity, setGroupCity] = useState("");
    const [groupState, setGroupState] = useState("");
    const [groupCategory, setGroupCategory] = useState("");
    const [groupIntro, setGroupIntro] = useState("");
    const [groupPolicy, setGroupPolicy] = useState("");
    const [groupMember, setGroupMember] = useState([]);
    const [organizerFirstName, setOrganizerFirstName] = useState("");
    const [organizerLastName, setOrganizerLastName] = useState("");
    const [organizerEmail, setOrganizerEmail] = useState("");
    const [groupEvents, setGroupEvents] = useState([]);

    useEffect(() =>  {
        let url = `https://coms6156-f23-sixguys.ue.r.appspot.com/groups/${groupID}`
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setGroupName(data[0].group_name);
                setGroupFounder(data[0].founder);
                setGroupCity(data[0].city);
                setGroupState(data[0].state);
                setGroupCategory(data[0].category);
                setGroupIntro(data[0].intro);
                setGroupPolicy(data[0].policy);
                console.log(data);
            })
            .catch(error => {
                console.log('Error fetching groups info:', error);
            })
    }, []);

    useEffect(() =>  {
        let url = `https://coms6156-f23-sixguys.ue.r.appspot.com/group_member_rel/group/${groupID}`
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGroupMember(data);
            })
            .catch(error => {
                console.log('Error fetching groups:', error);
            })
    }, []);

    useEffect(()=>{
        fetch(`http://ec2-44-219-26-13.compute-1.amazonaws.com:8000${groupFounder}`)
            .then(response => response.json())
            .then(data => {
                setOrganizerFirstName(data.first_name);
                setOrganizerLastName(data.last_name);
                setOrganizerEmail(data.email);
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });
    }, [groupFounder]);

    const [activeTab, setActiveTab] = useState("about");

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if(groupMember.length > 0){
            const memberUsernames = groupMember.map(member => member.username);
            setIsMember((`/users/name/${username}`) !== groupFounder && memberUsernames.includes(`/users/name/${username}`));
        }
    }, [groupMember, username]);

    const handleJoinGroup = () => {
        const userData = {
            "group_id": groupID,
            "username": `${username}`
        }
        fetch('https://coms6156-f23-sixguys.ue.r.appspot.com/group_member_rel/join', {
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
                        alert("Thank you for join our group.")
                        setGroupMember([...groupMember, data])
                        navigate(0);
                    }
                })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleLeaveGroup = () => {
        fetch( `https://coms6156-f23-sixguys.ue.r.appspot.com/group_member_rel/leave/${groupID}/${username}`, {
            method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.detail) {
                        alert(data.detail);
                    }
                    else{
                        console.log('Success:', data);
                        alert("You left group successfully!")
                        navigate(0);
                    }

                })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

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

    const handleEditGroupDetails = (event) => {
        event.preventDefault();
        const group_data ={
            "group_name": groupName,
            "founder": groupFounder,
            "city": groupCity,
            "state": groupState,
            "category": groupCategory,
            "intro": groupIntro,
            "policy": groupPolicy
        };
        fetch(`https://coms6156-f23-sixguys.ue.r.appspot.com/groups/update/${groupID}`, {
            method: 'PUT',
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
                alert(`Group update successfully!.`);
                navigate(0);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    const handleDeleteGroup = () =>{
        fetch(`https://coms6156-f23-sixguys.ue.r.appspot.com/groups/delete/${groupID}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error deleting user account:', error);
            });

        navigate('/explore', { state: { user: username,  groupCategory: " "} })
    }

    const handleExplorePage = () => {
        navigate('/explore', { state: { user: username,  groupCategory: " "} })
    };


    return(
        <div className="group-page">
            <div className="group-container">
                <div className="upper-group-container">
                    <div className="upper-left-container">
                        <img src="/images/group_icon.jpg"></img>
                    </div>
                    <div className="upper-right-container">
                        <div className="event-info">
                            <h1>{groupName}</h1>
                            <img style={{cursor: "pointer"}} src="/images/backttoHome.png" alt="back" onClick={handleExplorePage}></img>
                        </div>

                        <div className="event-info">
                            <img src="/images/locate.png" alt="location"></img>
                            <p>{groupCity}, {groupState}</p>
                        </div>
                        <div className="event-info">
                            <img src="/images/members.png" alt="member"></img>
                            <p>{groupMember.length} members</p>
                        </div>
                        <div className="event-info">
                            <img src="/images/organizer.png" alt="founder"></img>
                            <p>Organized By {organizerFirstName} {organizerLastName}</p>
                        </div>
                        <div className="organizer-options">
                            { `/users/name/${username}` === groupFounder ? (
                            <>
                                <button onClick={handleEditGroup}>Edit Group</button>
                                <button onClick={handleDeleteGroup}>Delete Group</button>
                                {isEditModalOpen && (
                                    <div id="outside-edit" className="outside-Edit" onClick={handleOutside}>
                                        <div className="window-content">
                                            <span className="close-icon" onClick={closeEditModal}>&times;</span>
                                            <div className="events-groups-container">
                                                <div className="create-new-container">
                                                    <h3 style={{color: "#1B4235", textAlign: "left", marginLeft:"5%"}}>You can change the information of group here.</h3>
                                                    <form onSubmit={handleEditGroupDetails}>
                                                        <div className="create-form-container">
                                                            <div className="create-new-wrapper">
                                                                <input
                                                                    id="group-founder"
                                                                    type="text"
                                                                    value={username}
                                                                    disabled={true}
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
                                                                    value={groupName}
                                                                    onChange={(e) => setGroupName(e.target.value)}
                                                                    required
                                                                />
                                                                <label htmlFor="group-name">Group Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="create-form-container">
                                                            <div className="create-new-wrapper">
                                                                <input
                                                                    id="group-city"
                                                                    type="text"
                                                                    value={groupCity}
                                                                    onChange={(e) => setGroupCity(e.target.value)}
                                                                    required
                                                                />
                                                                <label htmlFor="group-city">City</label>
                                                            </div>
                                                            <div className="create-new-wrapper">
                                                                <input
                                                                    id="group-state"
                                                                    type="text"
                                                                    value={groupState}
                                                                    onChange={(e) => setGroupState(e.target.value)}
                                                                    required
                                                                />
                                                                <label htmlFor="group-state">State</label>
                                                            </div>
                                                        </div>
                                                        <div className="create-form-container">
                                                            <div className="create-new-wrapper">
                                                                <input
                                                                    id="group-intro"
                                                                    type="text"
                                                                    value={groupIntro}
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
                                                                    value={groupPolicy}
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
                                                                    value={groupCategory}
                                                                    onChange={(e) => setGroupCategory(e.target.value)}
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
                                                            <button onClick={closeEditModal}>Close</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                            ) : isMember  ? (
                            <button onClick={handleLeaveGroup}>Leave Group</button>
                            ) : (
                            <button onClick={handleJoinGroup}>Join Group</button>
                                )}
                            </div>
                    </div>
                </div>
                <div className="lower-group-container">
                    <div className="group-detail-navigator">
                        <button className={activeTab === 'about' ? 'active' : 'inactive'} onClick={() => setActiveTab('about')}>About</button>
                        <button className={activeTab === 'events' ? 'active' : 'inactive'} onClick={() => setActiveTab('events')}>Events</button>
                        <button className={activeTab === 'member' ? 'active' : 'inactive'} onClick={() => setActiveTab('member')}>Members</button>
                    </div>
                    {activeTab === 'about' && (
                        <div className="group-text-details">
                            <h1>What we're about</h1>
                            <p>{groupIntro}</p>
                            <h2>What is our policy</h2>
                            <p>{groupPolicy}</p>
                        </div>
                    )}
                    {activeTab === 'events' && (
                        groupEvents.length > 0 ? (
                            <div className="group-events-details">
                                {groupEvents.map((event) => (
                                <div className="ownGroups-container" key={event.event_id}>
                                    <img src="/images/event-icon.jpg" alt={event.event_name}></img>
                                    <div className="group-found-text">{event.event_name}</div>
                                </div>
                                ))}
                            </div>

                            ) : (
                                <p>This group has not organized any event at this point.</p>
                            )
                    )}
                    {activeTab === 'member' && (
                        groupMember.length > 0 ? (
                            <div>
                                {groupMember.map((member) => (
                                <div>{member.username}</div>

                                ))}
                            </div>
                            ) :(<p>No one join the group yet.</p>)
                    )}
                </div>
            </div>
        </div>
    );
}

export default GroupPage;