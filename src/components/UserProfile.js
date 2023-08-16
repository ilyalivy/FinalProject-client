import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'
import loadingimage from '../images/loading.gif';

const UserProfile = () => {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [userSeries, setUserSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/user/${userId}`);
                console.log('resdata =>', res.data[0]);
                setProfileUser({...res.data[0], photo:res.data[0].location});
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserSeries = async () => {
            setLoading1(true);
            try {
                const res = await axios.get(`${BASE_URL}/profile/${userId}/tv_series`);
                setUserSeries(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading1(false);
            }
        };

        fetchUserData();
        fetchUserSeries();
    }, [userId]);

    if (!profileUser) return <div>Loading...</div>;

    return (
        <div>
            {loading ? (
                    <img
                        style={{ width: '65px', height: '65px' }}
                        src={loadingimage}
                        alt="Loading..."
                    />
                ) : (
            <div className="userinfo">
                <img src={profileUser.photo} alt="User Photo" className="user-photo"/>
                <p className="usertelegram">Telegram: {profileUser.username}</p>
            </div>)}
            
            <div className="usertvseries">
                <h2 className="titleuser">User tv series</h2>
                <div className="userusertvseries">
                    {loading1 ? (
                    <img
                        style={{ width: '65px', height: '65px' }}
                        src={loadingimage}
                        alt="Loading..."
                    />
                ) : userSeries.map(series => (
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
