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
    <div>
      <h2>TV Series Friends</h2>
      {friends.map(friend => (
        <div key={friend.id}>
          <Link to={`/profile/${friend.id}`}>
            {friend.photo && <img src={friend.photo} alt="Friend Photo" className='tvfriends-photo'/>}
            <p>{friend.email ? `${friend.email}` : "No username set"}</p>
            <p>{friend.matching_series} matches</p>
          </Link>

          
        </div>
      ))}
    </div>
  );
};

export default TVSeriesFriends;
