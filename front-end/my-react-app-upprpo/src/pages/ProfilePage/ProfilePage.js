import React from 'react';
import './ProfilePage.css'; // Убедитесь, что у вас есть CSS файл для стилей

function ProfilePage() {
  // Здесь вы можете подгрузить данные пользователя из базы данных или стейта
  const profileData = {
    photo: 'http://localhost:3000/1.jpg', // URL фотографии пользователя
    nickname: 'Nickname',
    description: 'This is a short bio or description of the user. It could contain their interests, what they do, or a fun fact.',
    hobbies: 'Reading, Gaming, Hiking, Programming',
    socialNetworks: 'Facebook, Twitter, Instagram'
  };

  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="profile-photo">
          {profileData.photo ? <img src={profileData.photo} alt="Profile" /> : <div className="photo-placeholder">ФОТО</div>}
        </div>
        <div className="profile-text">
          <div className="profile-nickname">{profileData.nickname}</div>
          <div className="profile-description">{profileData.description}</div>
        </div>
      </div>
      <button className="add-button">Добавить</button>
      <div className="profile-details">
        <h2>О себе:</h2>
        <p>{profileData.description}</p>
        <h2>Хобби:</h2>
        <p>{profileData.hobbies}</p>
        <h2>Соц. Сети:</h2>
        <p>{profileData.socialNetworks}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
