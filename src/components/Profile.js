import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import UserContext from '../UserContext.js';
import './Profile.css';
import loadingimage from '../images/loading.gif';


const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [seriesList, setSeriesList] = useState([]);
    const [userSeries, setUserSeries] = useState([]);
    const [telegramUsername, setTelegramUsername] = useState('');
    const [photo, setPhoto] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState([]);
    // const [clientX,setClientX] = useState()
    // const [clientY,setClientY] = useState()
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL
    
    const listtvseriesRef = useRef();

    // console.log('profile user=>',user);


    const SeriesPoster = ({ series, onAdd, onDelete, isUserSeries }) => {
        const [animate, setAnimate] = useState(false);
        const [dim, setDim] = useState(false);

        
        const handleClick = async () => {
            setAnimate(true);
            if (isUserSeries || selectedSeries.includes(series.id)) {
                setDim(false);
            } else {
                setDim(true);
            }
            setTimeout(() => {
                if (isUserSeries) {
                    onDelete(series.id);
                } else {
                    if (selectedSeries.includes(series.id)) {
                        onDelete(series.id);
                    } else {
                        onAdd(series.id);
                    }
                }
            }, 1000);
        };
        
    
        return (
            <div
                key={series.id}
                onClick={handleClick}
                className={`eachtvseries ${animate ? 'flip-animation' : ''} ${dim ? 'dimmed' : ''}`}
            >
                <img src={series.image} alt={series.title} />
            </div>
        );
        
    }
    
    

    const inputRef = useRef(null);

    const getSeriesList = async () => {
        setLoading2(true);
        try {
            const res = await axios.get(`${BASE_URL}/tv_series`);
            setSeriesList(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading2(false);
        }
    };

    const getUserSeries = async () => {
        setLoading1(true);
        try {
            const res = await axios.get(
                `${BASE_URL}/profile/${user.id}/tv_series`
            );
            setUserSeries(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading1(false);
        }
    };

    const addSeriesToProfile = async (seriesId) => {
        console.log('ADD SERIES ID', seriesId);
        try {
            await axios.post(
                `${BASE_URL}/profile/${user.id}/tv_series`,
                { seriesId }
            );
            setSelectedSeries((prevSelected) => [...prevSelected, seriesId]);
            getUserSeries();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSeriesFromProfile = async (seriesId) => {
        console.log('DELETE SERIES ID', seriesId);
        try {
            await axios.delete(
                `${BASE_URL}/profile/${user.id}/tv_series/${seriesId}`
            );
            setSelectedSeries((prevSelected) =>
                prevSelected.filter((id) => id !== seriesId)
            );
            getUserSeries();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddSeries = async (seriesId) => {
       
          addSeriesToProfile(seriesId);
       
      };
      
      const handleDeleteSeries = async (seriesId) => {
        
          deleteSeriesFromProfile(seriesId);
   
      };
      

    const updateTelegramUsername = async () => {
        try {
            await axios.put(
                `${BASE_URL}/profile/${user.id}/updateUsername`,
                { username: telegramUsername }
            );
            setUser({ ...user, username: telegramUsername });
            localStorage.setItem('user', JSON.stringify({ ...user, username: telegramUsername }));

            setTelegramUsername('');
        } catch (error) {
            console.error('Failed to update Telegram username', error);
        }
    };

    const updateTelegramUsernameAndBlur = async (inputRef) => {
        await updateTelegramUsername();
        inputRef.current.blur();
    };

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);
        setLoading(true);

        if (selectedPhoto) {
            const formData = new FormData();
            formData.append('photo', selectedPhoto);

            // Теперь автоматически отправляем запрос на сервер для загрузки
            axios
                .post(
                    `${BASE_URL}/profile/${user.id}/uploadPhoto`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then((response) => {
                    console.log('upload', response.data);
                    const updatedUser = {
                        ...user,
                        location: response.data.location,
                    };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setLoading(false);
                })      
                .catch((error) => {
                    console.error('Error uploading photo:', error);
                    setLoading(false);
                });
        }
    };


    useEffect(() => {
        getSeriesList();
        getUserSeries();
    }, []);

    // console.log(userSeries);

   useEffect(() => {
        const seriesIds = userSeries.map((series) => series.id);
        setSelectedSeries(seriesIds);
    }, [userSeries]);


    return (
        <div>
            <div className="info">
                {loading ? '' : !user.location && (
                    <label htmlFor="fileInput" className="upload-label">
                        <h3 className='addphoto'>Add Photo</h3>
                    </label>
                )}
                <input
                    type="file"
                    id="fileInput"
                    className="hidden-input"
                    onChange={(e) => handlePhotoChange(e)}
                />
                {loading? 
                    <img 
                        style={{width: '65px', height: '65px'}}
                        src={loadingimage}
                        alt='Loading...'
                    /> : user.location && (
                    <label htmlFor="fileInput">
                        <img
                            src={user.location}
                            alt="User Photo"
                            className="profile-photo"
                        />
                    </label>
                )}

                {user.username}
                <p className="telegram">
                    Telegram:{' '}
                    <input
                        className='usernameinput'
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
            </div>

            <div className="tvseries">
                <h2 className="titleyour">Your tv series</h2>
                <div className="yourtvseries">
                    {loading1? 
                    <img 
                        style={{width: '65px', height: '65px'}}
                        src={loadingimage}
                        alt='Loading...'
                    /> : userSeries.map((series) => (
                        <SeriesPoster
                            key={series.id}
                            series={series}
                            onDelete={handleDeleteSeries}
                            isUserSeries={true}
                        />
                    ))}

                </div>

                {userSeries.length < 5 && (
                    <>
                        <h2 className="titlelist">Click on your 5 favorite tv series from list below</h2>
                        <div className="listtvseries" ref={listtvseriesRef}>
                            {loading2? 
                            <img 
                                style={{width: '65px', height: '65px'}}
                                src={loadingimage}
                                alt='Loading...'
                            /> : seriesList.map((series) => (
                            <div
                                key={series.id}
                                className={`eachtvseries ${selectedSeries.includes(series.id) ? 'dimmed' : ''}`}
                            >
                                <SeriesPoster
                                    series={series}
                                    onAdd={handleAddSeries}
                                    onDelete={handleDeleteSeries}
                                    isUserSeries={false}
                                />
                            </div>
                            ))}

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
