import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

function PersonalForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const userId = window.sessionStorage.getItem("USER_ID").replace(/"/g, '');;
        // Fetch personal data using GET endpoint
        const response = await axios.get(`${API_URL}/users/${userId}`);
        const personalData = response.data;

        // Update form data state with fetched data
        setFormData({
          name: personalData.full_name,
          email: personalData.email
        });
      } catch (error) {
        setError('Error al cargar los datos personales. Inténtelo de nuevo más tarde.');
        console.error('Error fetching personal data:', error);
      }
    };

    fetchPersonalData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Send PUT request to update personal data
      const userId = window.sessionStorage.getItem("USER_ID").replace(/"/g, '');;
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        { 
          full_name: formData.name,
          email: formData.email
        }
      );
      setSuccess(true);
      console.log('Personal data updated successfully:', response.data);
    } catch (error) {
      setError('Error al actualizar los datos personales. Inténtelo de nuevo más tarde.');
      console.error('Error updating personal data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Nombre:</label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <input type="submit" value="Guardar Cambios" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Datos personales actualizados con éxito.</p>}
    </form>
  );
}

export default PersonalForm;