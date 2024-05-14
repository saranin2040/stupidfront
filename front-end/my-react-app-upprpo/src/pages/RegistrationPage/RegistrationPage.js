import React, { useState } from 'react';
import './RegistrationPage.css'; // Подключаем файл со стилями
import backgroundImage from './picture/background.jpg'; // Подключаем изображение фона
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(prevState => !prevState);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(prevState => !prevState);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Добавьте здесь логику обработки отправки формы, например, отправку данных на сервер
    console.log('Form data:', formData);

    navigate('/search'); // куда перенаправлять
  };

  return (
    <div className="registration-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2 className="registration-title">Registration Page</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} className="form-input" />
          <button type="button" onClick={() => handleTogglePassword("password")} className="password-toggle-btn">{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" />
          <button type="button" onClick={() => handleTogglePassword("confirmPassword")} className="password-toggle-btn">{showConfirmPassword ? 'Hide' : 'Show'}</button>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
