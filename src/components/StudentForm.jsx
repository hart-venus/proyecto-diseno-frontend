import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function StudentForm() {
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [editedFields, setEditedFields] = useState({
        carne: '',
        full_name: '',
        email: '',
        phone: '',
        campus: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const studentId = params.get('id');

                const response = await axios.get(`${API_URL}/students/${studentId}`);
                setStudentData(response.data);
                setEditedFields({
                    carne: response.data.carne,
                    full_name: response.data.full_name,
                    email: response.data.email,
                    phone: response.data.phone,
                    campus: response.data.campus
                });
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchData();

    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditedFields(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.put(`${API_URL}/students/${studentData.carne}`, editedFields);
            setStudentData(response.data);
            setSuccess(true);
        } catch (error) {
            setError('Error updating student data.');
            console.error('Error updating student data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/students/${studentData.carne}`);
            setStudentData(null);
            setSuccess(true);
        } catch (error) {
            setError('Error deleting student.');
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <label htmlFor="carne" className="block text-gray-700">Carne:</label>
                    <input
                        id="carne"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        value={editedFields.carne}
                        readOnly={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700">Full Name:</label>
                    <input
                        id="full_name"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        value={editedFields.full_name}
                        onChange={handleChange}
                        required
                        readOnly={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        value={editedFields.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                    <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        value={editedFields.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input type="submit" value="Guardar cambios" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Cambios guardados con éxito.</p>}
            </form>
            <button onClick={handleDelete} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Delete</button>
        </div>   
    );
}

export default StudentForm;