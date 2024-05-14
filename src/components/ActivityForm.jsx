import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

const ActivityForm = () => {
    // Estados para almacenar los valores del formulario
    const [week, setWeek] = useState('');
    const [actName, setActName] = useState('');
    const [responsible, setResponsible] = useState('');
    const [remainder, setRemainder] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [mode, setMode] = useState('');

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto con los datos del formulario
        const formData = {
            week,
            actName,
            responsible,
            remainder,
            link,
            type,
            mode
        };

        try {
            // Enviar los datos al endpoint POST usando Axios
            const response = await axios.post(`${API_URL}/activities`, formData);
            console.log(response.data); // Manejar la respuesta según sea necesario

            // Limpiar el formulario después del envío exitoso
            setWeek('');
            setActName('');
            setResponsible('');
            setRemainder('');
            setLink('');
            setType('');
            setMode('');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Manejar errores de solicitud
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
                <input
                    id="week"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Semana"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="actName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Actividad"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="responsible"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Responsable"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="remainder"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Recordatorio"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="link"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Enlace a reunión"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="type"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Tipo de actividad"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    id="mode"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Modalidad"
                    required
                />
            </div>
            <div id="poster" className="mb-4">
                <label htmlFor="photoInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    Subir poster
                </label>
                <input id="photoInput" type="file" accept="image/*" className="hidden" />
            </div>
            <div className="justify-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Estado de actividad
                </h1>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded mr-2">Planeada</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-2 rounded mr-2">Notificada</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded mr-2">Realizada</button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded">Cancelada</button>
            </div>
            <div id="evidence" className="mb-4">
                <label htmlFor="photoInput" className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700">
                    Subir evidencia
                </label>
                <input id="photoInput" type="file" accept="image/*" className="hidden" />
            </div>
            <input
                type="submit"
                value="Guardar"
                className="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
        </form>
    );
};

export default ActivityForm;