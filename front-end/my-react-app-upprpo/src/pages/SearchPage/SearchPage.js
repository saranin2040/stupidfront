import React, { useState, useEffect } from 'react';
import '../../App.css';
import './SearchPage.css';
import profileIcon from '../../picture/bell.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Инициализируем useNavigate

  useEffect(() => {
    fetchUsers();
  }, []);


  const profileData = {
    photo: 'http://localhost:3000/1.jpg', // URL фотографии пользователя
    nickname: 'Nickname',
    description: 'This is a short bio or description of the. It could contain their interests, what they do, or a fun fact.',
    hobbies: ["Reading","Gaming","Hiking","Programming","Programming","Programming","Programming","Programming"],
    socialNetworks: 'Facebook, Twitter, Instagram'
  };
 
 

  async function getToken(username, password) {
    const url = 'http://localhost:8080/api/auth/authenticate';
    const requestData = {
        username: username,
        password: password
    };



    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        const accessToken = data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error while fetching token:', error.message);
        return null;
    }
}


  const fetchUsers = async () => {

    const username = 'saranin2040';
    const password = '12345678';
    
    let accessToken;
    
    getToken(username, password)
        .then(token => {
            if (token) {
                accessToken = token;
                localStorage.setItem("token", accessToken);
                //console.log('Received access token:', accessToken);
                // Дальнейшие действия с полученным токеном
            } else {
                console.log('Failed to get access token');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


    const tokens = localStorage.getItem("token"); 
  
    try {
      console.log("Token: " + tokens)
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      });

      setUsers(response.data); // Обновляем состояние пользователей
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  const handleCardClick = (userId) => {
    console.log("cool!");
    navigate(`/alien-profile/${userId}`); // Используем userId для динамического формирования URL
  };

  function calculateMaxHobbies() {
    const cardWidth = 300; // Предполагаемая ширина контейнера карточки в пикселях
    const averageHobbyWidth = 100; // Предполагаемая средняя ширина одного хобби с учетом отступов
    const maxHobbiesPerRow = Math.floor(cardWidth / averageHobbyWidth); // Максимальное количество хобби в одной строке
    const maxRows = 2; // Максимальное количество строк
  
    return maxHobbiesPerRow * maxRows-2; // Возвращаем максимальное количество хобби, которое может быть отображено в двух строках
  }
  


  const goToProfile = () => {
    navigate('/my-profile'); // Путь к странице профиля
  };

  return (
    <div className="SearchPage">
      <div className="header">
        <div className="logo-box">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
        </div>
        <button className="profile-button" onClick={goToProfile}>Мой профиль</button>
      </div>
      <div className="search-container">
        <h1 className="main-title">People's World</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Hinted search text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="user-cards-container">
        {users.map(user => (
          <div key={user.id} className="user-card" onClick={() => handleCardClick(user.user_id)}>
            <h2>{user.username}</h2>
            <img src={profileData.photo} alt={user.username} />
            <div className="user-description">{profileData.description}</div>
            <div className="user-hobbies-container">
              {profileData.hobbies.slice(0, calculateMaxHobbies()).map((hobby, index) => (
                <div key={index} className="user-hobby">{hobby}</div>
              ))}
              {profileData.hobbies.length > calculateMaxHobbies() && <div className="user-hobby">...</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
