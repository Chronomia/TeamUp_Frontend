import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./ExplorePage.css";

function ExplorePage() {
    const navigate = useNavigate();
    const handleBackToHome = () => navigate('/home');

    const [activeTab, setActiveTab] = useState('groups');

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
                            <p>All events will be listed here...</p>
                        </div>
                    )}
                    {activeTab === 'groups' && (
                        <div className="detail-content">
                            <p>All groups will be listed here...</p>
                        </div>
                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
}
export default ExplorePage;