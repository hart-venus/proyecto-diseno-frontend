import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import ReturnButton from '../ReturnButton';

const NewActivityForm = () => {
    // Estados para almacenar los valores del formulario
    const [week, setWeek] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setActName] = useState('');
    const [responsible, setResponsible] = useState('');
    const [publicationDays, setPublicationDays] = useState(null); // Valor por defecto
    const [remainderFrequencyDays, setRemainderFrequencyDays] = useState('');
    const [link, setLink] = useState("");
    const [type, setType] = useState('');
    const [mode, setMode] = useState('Presencial'); // Valor por defecto
    const [poster, setPoster] = useState(null); // Para el poster, usaremos un estado de archivo
    const workPlanId = window.sessionStorage.getItem("PLAN_ID");
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Crear el objeto con los datos del formulario
        let data = JSON.stringify({
            "work_plan_id": workPlanId,
            "week": parseInt(week),
            "activity_type": type,
            "name": name,
            "realization_date": date,
            "realization_time": time,
            "responsible_ids": [
                responsible
            ],
            "publication_days_before": parseInt(publicationDays),
            "reminder_frequency_days": parseInt(remainderFrequencyDays),
            "is_remote": mode === 'Remota' ? true : false,
            "meeting_link": link,
            "poster_file": photo
        });
        console.log(photo)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_URL}/activities`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.href = `PlanActivities?id=${workPlanId}`
            })
            .catch((error) => {
                console.log(error);
            });

        // Limpiar el formulario después del envío exitoso
        setWeek('');
        setDate('');
        setTime('');
        setActName('');
        setResponsible('');
        setPublicationDays(null); // Restablecer el valor por defecto
        setRemainderFrequencyDays('');
        setLink('-');
        setType('');
        setMode('Presencial'); // Restablecer el valor por defecto
        setPoster(null); // Limpiar el estado del poster

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
                        type="number"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Semana"
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
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setActName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Nombre"
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
                        value={publicationDays}
                        onChange={(e) => setPublicationDays(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Notificada (En cuantos días se notificara)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        value={remainderFrequencyDays}
                        onChange={(e) => setRemainderFrequencyDays(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Recordatorio (Frecuencia días)"
                        required
                    />
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
                <div className="mb-4">
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enlace a reunión"

                    />
                </div>
                <div id="poster" className="mb-4">
                    <label htmlFor="photoInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                        Subir poster
                    </label>
                    <input id="photoInput" type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files[0])}/>
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

export default NewActivityForm;