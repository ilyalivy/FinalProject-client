import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'

const UserProfile = () => {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [userSeries, setUserSeries] = useState([]);

    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/${userId}`);
                setProfileUser(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUserSeries = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/profile/${userId}/tv_series`);
                setUserSeries(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
        fetchUserSeries();
    }, [userId]);

    if (!profileUser) return <div>Loading...</div>;

    return (
        <div>

            <div className="userinfo">
                <img src={profileUser.photo} alt="User Photo" className="user-photo"/>
                <p className="usertelegram">Telegram: {profileUser.username}</p>
            </div>
            
            <div className="usertvseries">
                <h2 className="titleuser">User tv series</h2>
                <div className="userusertvseries">
                    {userSeries.map(series => (
                        <div key={series.id} className="usereachtvseries">
                            <img src={series.image} alt={series.title} />
                            {/* <h4>{series.title}</h4> */}
                        </div>
                    ))}
                </div>
                
            </div>
            
        </div>
    );
};

export default UserProfile;
