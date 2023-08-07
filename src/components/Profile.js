import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios';
import UserContext from "../UserContext.js";
import { Link } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const [seriesList, setSeriesList] = useState([]);
    const [userSeries, setUserSeries] = useState([]);
    const [telegramUsername, setTelegramUsername] = useState("");
    const [photo, setPhoto] = useState(null);


    const inputRef = useRef(null);

    const getSeriesList = async () => {
        try {
            const res = await axios.get('http://localhost:3030/tv_series');
            setSeriesList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserSeries = async () => {
        try {
            const res = await axios.get(`http://localhost:3030/profile/${user.id}/tv_series`);
            setUserSeries(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addSeriesToProfile = async (seriesId) => {
        console.log('ADD SERIES ID', seriesId);
        try {
            await axios.post(`http://localhost:3030/profile/${user.id}/tv_series`, {seriesId});
            getUserSeries();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteSeriesFromProfile = async (seriesId) => {
        console.log('DELETE SERIES ID', seriesId);
        try {
            await axios.delete(`http://localhost:3030/profile/${user.id}/tv_series/${seriesId}`);
            getUserSeries();
        } catch (error) {
            console.log(error);
        }
    }

    const updateTelegramUsername = async () => {
        try {
          await axios.put(`http://localhost:3030/profile/${user.id}/updateUsername`, { username: telegramUsername });
          setUser({ ...user, username: telegramUsername });
          setTelegramUsername("");
        } catch (error) {
          console.error("Failed to update Telegram username", error);
        }
    }

    const updateTelegramUsernameAndBlur = async (inputRef) => {
        await updateTelegramUsername();
        inputRef.current.blur();
    }

    const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);

    if (selectedPhoto) {
        const formData = new FormData();
        formData.append('photo', selectedPhoto);
        
        // Теперь автоматически отправляем запрос на сервер для загрузки
        axios.post(`http://localhost:3030/profile/${user.id}/uploadPhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            
            // Обновляем URL фотографии пользователя в состоянии приложения
            setUser(prevUser => ({ ...prevUser, photo: response.data.photo}));
            
        })
        .catch(error => {
            console.error("Error uploading photo:", error);
        });
    }
};


    useEffect(() => {
        getSeriesList();
        getUserSeries();
    }, []);

    // console.log(userSeries);


    return (
    <div>
        <h2>Profile</h2>
        <h2>Welcome, {user.email}</h2>

        <div>
            {!user.photo && (
                <label htmlFor="fileInput" className="upload-label">
                    <h3>Add Photo</h3> 
                </label>
            )}
            <input
                type="file"
                id="fileInput"
                className="hidden-input"
                onChange={(e) => handlePhotoChange(e)}
            />
            {user.photo && (
                <label htmlFor="fileInput">
                    <img src={user.photo} alt="User Photo" className="profile-photo"/>
                </label>
            )}
        </div>

        {user.username}
        <p>Telegram: 
        <input 
            ref={inputRef}
            type="text" 
            placeholder="@username" 
            value={telegramUsername} 
            onChange={(e) => setTelegramUsername(e.target.value)} 
            onBlur={updateTelegramUsername}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    updateTelegramUsernameAndBlur(inputRef);
                }
            }} 
        />
        </p>
        
        
      
        <h2>Your Series</h2>
        {userSeries.map(series => (
            <div key={series.id} onClick={() => deleteSeriesFromProfile(series.id)}>
                <img src={series.image} alt={series.title} />
                <h4>{series.title}</h4>
            </div>
        ))}
        {userSeries.length < 5 && (
          <>
            <h2>All Series</h2>
            {seriesList.map(series => (
                <div key={series.id} onClick={() => addSeriesToProfile(series.id)}>
                    <img src={series.image} alt={series.title} />
                    <h4>{series.title}</h4>
                </div>
            ))}
          </>
        )}
    </div>
    );
}

export default Profile;
