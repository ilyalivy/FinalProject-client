import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import './TVSeriesFriends.css'
import loadingimage from '../images/loading.gif';

const TVSeriesFriends = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    const getFriends = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/tvseriesfriends/${user.id}`);
        // console.log(response.data);
        setFriends(response.data.rows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getFriends();
  }, [user]);

  return (
    <div className='tvfriends'>
    
      {loading? 
       <img 
          style={{width: '65px', height: '65px'}}
          src={loadingimage}
          alt='Loading...'
        /> : friends.map(friend => (
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
