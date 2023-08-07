import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'

const UserProfile = () => {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [userSeries, setUserSeries] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/user/${userId}`);
                setProfileUser(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUserSeries = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/profile/${userId}/tv_series`);
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
            <h2>User Profile</h2>
            <img src={profileUser.photo} alt="User Photo" className="tvfriend-photo"/>
            <p>{profileUser.email}</p>
            <p>Telegram: {profileUser.username}</p>
            <h2>User Series</h2>
            {userSeries.map(series => (
                <div key={series.id}>
                    <img src={series.image} alt={series.title} />
                    <h4>{series.title}</h4>
                </div>
            ))}
        </div>
    );
};

export default UserProfile;
