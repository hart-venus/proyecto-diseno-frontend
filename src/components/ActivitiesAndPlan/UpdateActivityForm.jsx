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
    const [announcementDays, setAnnouncementDays] = useState(7); // Valor por defecto
    const [remainder, setRemainder] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [mode, setMode] = useState('Presencial'); // Valor por defecto
    const [status, setStatus] = useState('PLANEADA'); // Por defecto, estado planeada
    const [poster, setPoster] = useState(null); // Para el poster, usaremos un estado de archivo
    const [activityData, setActivityData] = useState(null); // Estado para almacenar los datos de la actividad
    const [evidence, setEvidence] = useState(null);
    const workPlanId = window.sessionStorage.getItem("PLAN_ID");
    const activityId = new URLSearchParams(window.location.search).get("id");
    const [showEvidenceForm, setShowEvidenceForm] = useState(false); // Estado para mostrar el formulario de subir evidencia
    const [cancelReason, setCancelReason] = useState('');
    const [showCancelForm, setShowCancelForm] = useState(false);

    // Función para cargar los datos de la actividad
    const loadActivityData = async () => {
        try {
            const response = await axios.get(`${API_URL}/activities/${activityId}`);
            setActivityData(response.data); // Almacena los datos de la actividad en el estado
        } catch (error) {
            console.error('Error al obtener los datos de la actividad:', error);
        }
    };

    useEffect(() => {
        loadActivityData(); // Cargar datos de la actividad cuando el componente se monte
    }, []);

    // Actualizar los estados con los datos de la actividad cuando estén disponibles
    useEffect(() => {
        if (activityData) {
            const { week, date, time, name, responsible_ids, announcement_days, reminder_days, meeting_link, activity_type, is_remote, status, poster_url } = activityData;
            setWeek(week);
            setDate(date);
            setTime(time);
            setActName(name);
            setResponsible(responsible_ids[0]); // Supongo que solo hay un responsable en esta implementación
            setAnnouncementDays(announcement_days);
            setRemainder(reminder_days);
            setLink(meeting_link);
            setType(activity_type);
            setMode(is_remote ? 'Remota' : 'Presencial'); // Convertir booleano a string
            setStatus(status);
            // setPoster(poster_url); // Ajustar cuando manejes la carga del poster
        }
    }, [activityData]);

    const handleShowEvidenceForm = () => {
        if (status !== 'PLANEADA') {
            setShowEvidenceForm(true);
        } else {
            // Muestra un mensaje o realiza alguna acción para informar al usuario que no se puede marcar como realizada una actividad planeada
            console.log('No se puede marcar como realizada una actividad planeada.');
        }
    };

    // Función para notificar una actividad
    const notifyActivity = async () => {
        try {
            await axios.patch(`${API_URL}/activities/${activityId}/notify`);
            console.log('Actividad notificada exitosamente');
            // Actualizar estado o realizar otras acciones según sea necesario
        } catch (error) {
            console.error('Error al notificar la actividad:', error);
            // Manejar errores de solicitud
        }
    };

    // Función para marcar una actividad como realizada
    const markActivityAsDone = async () => {
        try {
            setShowEvidenceForm(false);
            const formData = new FormData();
            formData.append('id', activityId);
            if (evidence) {
                for (let i = 0; i < evidence.length; i++) {
                    formData.append('evidence_files[]', evidence[i]);
                }
            } else {
                throw new Error('Evidence files are required');
            }
            const response = await axios.post(`${API_URL}/activities/${activityId}/done`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar estado o realizar otras acciones según sea necesario
        } catch (error) {
            console.error('Error al marcar la actividad como realizada:', error);
            // Manejar errores de solicitud
        }
    };
    const handleShowCancelForm = () => {
        setShowCancelForm(true);
    };
    
    const handleConfirmCancel = async () => {
        try {
            await cancelActivity(cancelReason); // Pasa el motivo de cancelación a la función de cancelación
            // Ocultar el formulario de cancelación después de confirmar
            setShowCancelForm(false);
        } catch (error) {
            console.error('Error al cancelar la actividad:', error);
            // Manejar errores de solicitud
        }
    };
    // Función para cancelar una actividad
    const cancelActivity = async () => {
        try {
            await axios.post(`${API_URL}/activities/${activityId}/cancel`, {
                id: activityId,
                cancel_reason: cancelReason // Proporcionar la razón de cancelación
            });
            console.log('Actividad cancelada exitosamente');
            // Actualizar estado o realizar otras acciones según sea necesario
        } catch (error) {
            console.error('Error al cancelar la actividad:', error);
            // Manejar errores de solicitud
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Crear el objeto con los datos del formulario
        const formData = {
            id: activityId,
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
            is_remote: mode === 'Remota' ? "true" : "false",
            status,
            poster_url: null // Ajustar esto cuando manejes la subida del poster
        };

        try {
            // Enviar los datos al endpoint PUT usando Axios
            const response = await axios.put(`${API_URL}/activities/${activityId}`, formData);
            console.log(response.data); // Manejar la respuesta según sea necesario
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Manejar errores de solicitud
        }
    };

    // Para setear a la página que debe viajar
    const [page, setPage] = useState('');
    useEffect(() => {
        const newPage = window.sessionStorage.getItem('PLAN_ID');
        setPage(newPage);
    }, []);

    return (
        <>
            {activityData ? (
                <div>
                    <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={week}
                            onChange={(e) => setWeek(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Semana"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setActName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Actividad"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={responsible}
                            onChange={(e) => setResponsible(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Responsable"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            value={announcementDays}
                            onChange={(e) => setAnnouncementDays(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Días de anuncio"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            value={remainder}
                            onChange={(e) => setRemainder(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Recordatorio (días)"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enlace a reunión"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            required
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
                            required
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
                    <input
                        type="submit"
                        value="Guardar"
                        className="w-1/5 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    />
                </form>
                    <div>
                    {/* Formulario y otros elementos omitidos para mayor claridad... */}
                    
                    <div>
                        <div className="justify-center mb-4">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Acciones de actividad
                            </h1>
                            <button onClick={notifyActivity} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mr-2">Notificar actividad</button>
                            <button onClick={handleShowEvidenceForm} className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded mr-2">Marcar como realizada</button>
                            <button onClick={handleShowCancelForm} className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded">Cancelar actividad</button>
                        </div>
                        {/* Mostrar el formulario de subir evidencia solo si showEvidenceForm es true */}
                        {showEvidenceForm && (
                            <div className="mb-4">
                                <label htmlFor="evidenceInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                                    Subir evidencia
                                </label>
                                <input 
                                    id="evidenceInput" 
                                    type="file" 
                                    accept="image/*" // Solo acepta archivos de imagen
                                    onChange={(e) => setEvidence(e.target.files)} // Maneja el cambio de archivos seleccionados
                                    className="hidden" 
                                    multiple // Permite seleccionar múltiples archivos
                                />
                                <button onClick={markActivityAsDone} className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded-md mx-2 mt-2">Confirmar</button>
                            </div>
                        )}
                        {showCancelForm && (
                            <div className="mb-4">
                                <textarea
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    placeholder="Motivo de cancelación"
                                    required
                                />
                                <button onClick={handleConfirmCancel} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mt-2">Confirmar</button>
                            </div>
                        )}
                        <ReturnButton title={'Regresar'} page={`PlanActivities?id=${page}`} client:load />
                    </div>
                </div>
                </div>
                
) : (
                <p>Cargando datos de la actividad...</p>
            )}
        </>
    );
};

export default UpdateActivityForm;
