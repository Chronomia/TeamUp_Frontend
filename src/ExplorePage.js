import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./ExplorePage.css";

function ExplorePage() {
    const navigate = useNavigate();

    const location = useLocation();
    let [groups, setGroups] = useState([]);
    let [events, setEvents] = useState([]);


    const interests = ["Travel", "Food", "Health & Fitness", "Gaming", "Technology & Programming", "Arts & Creativity", "Movies & Entertainment", "Music"];
    const username = location.state.user;
    let [category, setCategory] = useState(location.state?.groupCategory);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroups, setCurrentGroups] = useState([]);

    const [currentEventPage, setCurrentEventPage] = useState(1);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleBackToHome = () => navigate('/home', { state: { username: username } });

    const [activeTab, setActiveTab] = useState('groups');
    useEffect(() =>  {
        let url = 'https://coms6156-f23-sixguys.ue.r.appspot.com/groups?'
        if (category!==" "){
            let encodedCategory = encodeURIComponent(category);
            url += `category=${encodedCategory}`
        }
        fetch(url+"&page_size=1100", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCurrentPage(1);
                slideGroup(data)
                setGroups(data);
            })
            .catch(error => {
                console.log('Error fetching groups:', error);
            })
    }, [category]);

    const slideGroup = (groups)=>{
        const groupsPerPage = 10;
        const indexOfLastGroup = currentPage * groupsPerPage;
        const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
        setCurrentGroups(groups.slice(indexOfFirstGroup, indexOfLastGroup));
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        slideGroup(groups);
    }
    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(groups.length / 10); i++) {
            pageNumbers.push(i);
        }
    const handleCategoryFilter = (interest) => {
        setCategory(interest);
    };

    useEffect(() =>  {
        let url = 'http://3.134.34.54:8011/api/events?limit=10000'
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCurrentPage(1);
                setEvents(data);
                sliceEvent(data)
            })
            .catch(error => {
                console.log('Error fetching events:', error);
            })
    }, []);

    const sliceEvent= (events)=>{
        const eventsPerPage = 10;
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvents = indexOfLastEvent - eventsPerPage;
        setCurrentEvents(events.slice(indexOfFirstEvents, indexOfLastEvent));
    };
    const paginateEvent = (pageNumber) => {
        setCurrentEventPage(pageNumber);
        sliceEvent(events);
    }
    const eventNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / 10); i++) {
        eventNumbers.push(i);
    }

    const toGroupPage = (group_id) => {
        navigate('/group', { state: { username: username, group_id: group_id } })
    }
    const toEventPage = (event_id) => {
        navigate('/event', { state: { username: username, event_id: event_id } })
    }


    return(
        <div className="explore-page">
            <div className="explore-container">
                <button className="home-button" onClick={handleBackToHome}>
                    <img src="/images/backttoHome.png" style={{width:"50px;", height:"50px"}} alt={"back home page"}></img>
                </button>
                <div className="events-groups-container">
                    <div className="select-to-view">
                        <button className={activeTab === 'groups' ? 'active' : 'inactive'} onClick={() => setActiveTab('groups')}>Groups</button>
                        <button className={activeTab === 'events' ? 'active' : 'inactive'} onClick={() => setActiveTab('events')}>Events</button>
                    </div>
                    {activeTab === 'events' && (
                        <div className="detail-content">
                            {currentEvents.map(event => (
                                <div className="group-card"  onClick={() => toEventPage(event.event_id)}>
                                    <div className="group-card-left">
                                        <img src="/images/group_icon.jpg" className="group-card-image" alt={event.event_name}></img>
                                    </div>
                                    <div className="group-card-right">
                                        <h1 className="group-card-title">{event.event_name}</h1>
                                        <p className="group-card-location">Location: {event.location}</p>
                                        <p className="group-card-location">Description: {event.description}</p>
                                        <p className="group-card-intro">{event.status}</p>
                                    </div>
                                </div>
                            ))}
                            <div className='pagination'>
                                <button onClick={() => paginateEvent(currentEventPage - 1)} className="pageNumber" disabled={currentEventPage === 1}>
                                    &lt; Previous
                                </button>
                                <p className="page-text">{currentEventPage}</p>
                                <button
                                    onClick={()=>paginateEvent(currentEventPage + 1)} className="pageNumber" disabled={currentEventPage === eventNumbers.length}>
                                    Next &gt;
                                  </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'groups' && (
                        <div className="detail-content">
                            <div className="group-filter-section">
                                <select
                                    value={category}
                                    onChange={(e)=>handleCategoryFilter(e.target.value)}
                                    className="group-filter"
                                >
                                    <option value=" ">Any category</option>
                                    {interests.map((interest) => (
                                        <option key={interest} value={interest}>
                                            {interest}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {currentGroups.map(group => (
                                <div className="group-card" key={group.id} onClick={() => toGroupPage(group.group_id)}>
                                    <div className="group-card-left">
                                        <img src="/images/group_icon.jpg" className="group-card-image" alt={group.group_name}></img>
                                    </div>
                                    <div className="group-card-right">
                                        <h1 className="group-card-title">{group.group_name}</h1>
                                        <p className="group-card-location">Location: {group.city}, {group.state}</p>
                                        <p className="group-card-intro">{group.intro}</p>
                                    </div>
                                </div>
                            ))}
                            <div className='pagination'>
                                <button onClick={() => paginate(currentPage - 1)} className="pageNumber" disabled={currentPage === 1}>
                                    &lt; Previous
                                </button>
                                <p className="page-text">{currentPage}</p>
                                <button
                                    onClick={()=>paginate(currentPage + 1)} className="pageNumber" disabled={currentPage === pageNumbers.length}>
                                    Next &gt;
                                  </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ExplorePage;