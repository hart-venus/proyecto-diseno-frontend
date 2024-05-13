import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function PasswordForm() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [professorData, setProfessorData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return;
    }
  
    try {
      // Check if current password is correct
      const userId = window.sessionStorage.getItem("USER_ID").replace(/"/g, '');;
  
      // Proceed with updating the password
      const updateResponse = await axios.put(
        `${API_URL}/users/${userId}`,
        { password: newPassword }
      );
      setSuccess(true);
      console.log('Password changed successfully:', updateResponse.data);
    } catch (error) {
      setError('Error al cambiar la contraseña. Asegúrese de que la contraseña actual sea correcta.');
      console.error('Error changing password:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700">Nueva contraseña:</label>
        <input
          id="newPassword"
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={passwordData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmNewPassword" className="block text-gray-700">Confirmar nueva contraseña:</label>
        <input
          id="confirmNewPassword"
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={passwordData.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      <input type="submit" value="Cambiar contraseña" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Contraseña cambiada con éxito.</p>}
    </form>
  );
}

export default PasswordForm;