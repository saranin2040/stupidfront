import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlienProfilePage.css';
import { useParams } from 'react-router-dom';

function AlienProfilePage() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    photo: '',
    nickname: '',
    description: '',
    hobbies: '',
    socialNetworks: '',
    imageUrl: ''
  });

  // Задаем данные пользователя по умолчанию для демонстрации
  const defaultProfileData = {
    photo: 'http://localhost:3000/1.jpg', // URL фотографии пользователя
    nickname: 'Nickname',
    description: 'This is a short bio or description of the user. It could contain their interests, what they do, or a fun fact.',
    hobbies: 'Reading, Gaming, Hiking, Programming',
    socialNetworks: 'Facebook, Twitter, Instagram'
  };

  // Функция для получения токена
  async function getToken(username, password) {
    const url = 'http://localhost:8080/api/auth/authenticate';
    const requestData = {
        username: username,
        password: password
    };
    try {
      const response = await axios.post(url, requestData);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log('token:', token);
      return token;
    } catch (error) {
      console.error('Error while fetching token:', error);
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const tokens = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/api/userinfo/${id}`, {
          headers: {
            'Authorization': `Bearer ${tokens}`
          }
        });
        if (response.data) {
          setProfileData({
            //photo: response.data.photo || defaultProfileData.photo,
            nickname: response.data.name,
            imageUrl: response.data.path_to_photo,
            description: response.data.description,
            about: response.data.about
          });
        }
        console.log("555 ",response.data);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }

    //   const userInfoData1 = {
    //     name: "Alice Smith",
    //     description: "A brief bio of Alice Smith.",
    //     age: 25,
    //     height: 165,
    //     sex: "Female",
    //     zodiac_sign: "Libra",
    //     habitation: "Los Angeles",
    //     language: "English",
    //     about: "Passionate about photography and traveling.",
    //     path_to_photo: "alice.jpg"
    // };
    

    //   try {
    //     const response = await axios.put(`http://localhost:8080/api/userinfo/${id}`,userInfoData1, {
    //       headers: {
    //         'Authorization': `Bearer ${tokens}`,
    //         'Content-Type': 'application/json'
    //       }
    //     });

    //   } catch (error) {
    //     console.error('Ошибка запроса:', error);
    //   }

    }

    const username = 'saranin2040';
    const password = '12345678';

    // Заменим 'username' и 'password' на реальные значения
    getToken(username, password).then(() => {
      fetchUserData();
    });
  }, [id]); // зависимость от id для повторного запроса при изменении идентификатора пользователя

  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="profile-photo">
           <img src={"http://localhost:3000/"+profileData.imageUrl} alt="Profile" />
        </div>
        <div className="profile-text">
          <div className="profile-nickname">{profileData.nickname}</div>
          <div className="profile-description">{profileData.description || defaultProfileData.description}</div>
        </div>
      </div>
      
      <div className="profile-details">
        <h2>О себе:</h2>
        <p>{profileData.description || defaultProfileData.description}</p>
        <h2>Хобби:</h2>
        <p>{profileData.hobbies || defaultProfileData.hobbies}</p>
        <h2>Соц. Сети:</h2>
        <p>{profileData.socialNetworks || defaultProfileData.socialNetworks}</p>
      </div>

      <button className="add-button">Добавить</button>
    </div>
  );
}

export default AlienProfilePage;
