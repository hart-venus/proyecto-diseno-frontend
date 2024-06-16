import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

function PersonalForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState(null)
  const [photo, setPhoto] = useState(null);

  //Setear el student id o profesor en caso de haberlo
  useEffect(() => {
    const newStudentId = window.sessionStorage.getItem("STUDENT_ID")
    if (newStudentId) {
      setStudentId(newStudentId)
    }
  }, [])

  //Obtener la info del student en caso de que lo sea
  useEffect(() => {
    if (studentId) {

      axios.get(`${API_URL}/students/${studentId}`)
        .then((response) => {
          const newStudent = response.data;
          //Convertir la url a la correcta
          if (newStudent.photo_url != "") {
            const firstURL = newStudent.photo_url;
            const bucketName = firstURL.split('/')[3];
            const objectPath = firstURL.split(`${bucketName}/`)[1];
            const newURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media`;
            newStudent.photo_url = newURL
          }
          //Setear el estudiante
          setFormData({
            name: newStudent.full_name,
            email: newStudent.email,
            phone: newStudent.phone
          })
          setStudent(newStudent);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }, [studentId])

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
      if (!student) {
        const response = await axios.put(
          `${API_URL}/users/${userId}`,
          {
            full_name: formData.name,
            email: formData.email
          }
        );
        setSuccess(true);
        console.log('Personal data updated successfully:', response.data);
      } else if (student) {

        const response = await axios.put(
          `${API_URL}/students/${studentId}`,
          {
            last_name1: formData.name.split(' ')[0],
            last_name2: formData.name.split(' ')[1],
            name1: formData.name.split(' ')[2],
            name2: formData.name.split(' ')[3],
            email: formData.email,
            phone: formData.phone
          }
        );
        setSuccess(true);
        console.log('Personal data updated successfully:', response.data);
      }

    } catch (error) {
      setError('Error al actualizar los datos personales. Inténtelo de nuevo más tarde.');
      console.error('Error updating personal data:', error);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    if (photo) {
      const data = new FormData();
      data.append('photo', photo);
      // Debe ser algo asi
      const requestOptions = {
        method: "PUT",
        body: data,
        redirect: "follow"
      };

      fetch(`${API_URL}/students/${studentId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { console.log(result); window.location.href = 'AccountConfig' })
        .catch((error) => console.error(error));
    }

  }

  return (
    <div className="flex flex-col place-content-between gap-10">
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
        {
          student &&
          <div className="mb-4">
            <label className="block text-gray-700">Celular</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
            />
          </div>
        }

        <input type="submit" value="Guardar Cambios" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Datos personales actualizados con éxito.</p>}
      </form>

      {/* Imagen si es que existe */}
      <div className='space-y-6'>
        {student &&
          <>
            {student.photo_url && <img className="border-8 border-blue-500 rounded-full w-80 h-72" src={student.photo_url} alt={``} />}
            <form className="mb-4 space-y-4" onSubmit={handleImageChange} encType="multipart/form-data">
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                accept="image/*"
              />
              <input type="submit" value="Cambiar Foto" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
            </form>
          </>
        }
      </div>
    </div>

  );
}

export default PersonalForm;