import React, { useState } from 'react';

function PasswordForm() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement password change logic here
    console.log(passwordData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-gray-700">Contraseña actual:</label>
        <input
          id="currentPassword"
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={passwordData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
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
    </form>
  );
}

export default PasswordForm;