import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import './TVSeriesFriends.css'

const TVSeriesFriends = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/tvseriesfriends/${user.id}`);
        // console.log(response.data);
        setFriends(response.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    getFriends();
  }, [user]);

  return (
    <div className='tvfriends'>
    
      {friends.map(friend => (
        <div key={friend.id} >

          <Link to={`/profile/${friend.id}`} className='eachtvfriend link'>
            {friend.photo && <img src={friend.photo} alt="Friend Photo" className='tvfriends-photo'/>}

            <div className='username_matches'>
              <p className='username'>{friend.username ? `${friend.username}` : "No username set"}</p>
              <p className='matches'>{friend.matching_series} matches</p>
            </div>
            
          </Link>

          
        </div>
      ))}
    </div>
  );
};

export default TVSeriesFriends;
