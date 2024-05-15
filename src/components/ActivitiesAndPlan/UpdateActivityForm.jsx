import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import ReturnButton from '../ReturnButton';

const UpdateActivityForm = () => {
    // Estados para almacenar los valores del formulario
    const [week, setWeek] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setActName] = useState('');
    const [responsible, setResponsible] = useState('');
    const [announcementDays, setAnnouncementDays] = useState(null); // Valor por defecto
    const [remainder, setRemainder] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [mode, setMode] = useState('Presencial'); // Valor por defecto
    const [status, setStatus] = useState('PLANEADA'); // Por defecto, estado planeada
    const [poster, setPoster] = useState(null); // Para el poster, usaremos un estado de archivo
    const workPlanId = window.sessionStorage.getItem("PLAN_ID");
    const [activity, setActivity] = useState([])
    const activityId = new URLSearchParams(window.location.search);

    useEffect(() => {
        const id = activityId.get("id")
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${API_URL}/activities/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => { setActivity(JSON.parse(result)) })
            .catch((error) => console.error(error));
    }, [])

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Crear el objeto con los datos del formulario
        console.log(activityId.get("id"))
        const formData = {
            id: activityId.get("id"),
            work_plan_id: workPlanId,
            week,
            date,
            time,
            name,
            responsible_ids: [responsible],
            announcement_days: announcementDays,
            reminder_days: remainder,
            meeting_link: link,
            activity_type: type,
            is_remote: mode == 'Remota', // Convertimos el modo a booleano
            status,
            poster_url: null // Ajustar esto cuando manejes la subida del poster
        };

        try {
            // Enviar los datos al endpoint POST usando Axios
            const response = await axios.put(`${API_URL}/activities/${activityId.get("id")}`, formData);
            console.log(response.data); // Manejar la respuesta según sea necesario

            // Limpiar el formulario después del envío exitoso
            setWeek('');
            setDate('');
            setTime('');
            setActName('');
            setResponsible('');
            setAnnouncementDays(7); // Restablecer el valor por defecto
            setRemainder('');
            setLink('-');
            setType('');
            setMode('Presencial'); // Restablecer el valor por defecto
            setStatus('PLANEADA'); // Restablecer el estado a planeada
            setPoster(null); // Limpiar el estado del poster

            window.location.href = `PlanActivities?id=${page}`
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Manejar errores de solicitud
        }
    };

    //Para setear a la pagina que debe viajar
    const [page, setPage] = useState('');
    useEffect(() => {
        const newPage = window.sessionStorage.getItem('PLAN_ID');
        setPage(newPage);
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <input
                        type="text"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={`Semana: ${activity.week}`}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setActName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={`Nombre: ${activity.name}`}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={responsible}
                        onChange={(e) => setResponsible(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={"Responsable"}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        value={announcementDays}
                        onChange={(e) => setAnnouncementDays(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={`Anuncio (días) ${activity.announcement_days}`}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        value={remainder}
                        onChange={(e) => setRemainder(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={`Recordatorio (días)  ${activity.reminder_days}`}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder={`Enlace a reunión: ${activity.meeting_link}`}

                    />
                </div>
                <div className="mb-4">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"

                    >
                        <option value="">Seleccionar tipo de actividad</option>
                        <option value="Orientadoras">Orientadoras</option>
                        <option value="Motivacionales">Motivacionales</option>
                        <option value="De apoyo a la vida estudiantil">De apoyo a la vida estudiantil</option>
                        <option value="De orden técnico">De orden técnico</option>
                        <option value="De recreación">De recreación</option>
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"

                    >
                        <option value="Presencial">Presencial</option>
                        <option value="Remota">Remota</option>
                    </select>
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
                    <button onClick={() => setStatus('PLANEADA')} className={`bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded mr-2 ${status === 'PLANEADA' ? 'bg-green-700' : ''}`}>Planeada</button>
                    <button onClick={() => setStatus('NOTIFICADA')} className={`bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-2 rounded mr-2 ${status === 'NOTIFICADA' ? 'bg-yellow-700' : ''}`}>Notificada</button>
                    <button onClick={() => setStatus('REALIZADA')} className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded mr-2 ${status === 'REALIZADA' ? 'bg-blue-700' : ''}`}>Realizada</button>
                    <button onClick={() => setStatus('CANCELADA')} className={`bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ${status === 'CANCELADA' ? 'bg-red-700' : ''}`}>Cancelada</button>
                </div>
                <input
                    type="submit"
                    value="Guardar"
                    className="w-1/5 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
                <ReturnButton title={'Regresar'} page={`PlanActivities?id=${page}`} client:load />
            </form>
        </>
    );
};

export default UpdateActivityForm;