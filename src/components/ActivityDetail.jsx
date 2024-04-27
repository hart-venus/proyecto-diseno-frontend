import { useState } from "react";
import { useEffect } from "react";
const activities = [
    {
        title: "Taller de Capacitacion",
        location: "Convention Center",
        name: "Science Conference 2024",
        type: "Conference",
        date: "2024-05-10",
        mode: "In-person",
        planned: true
    },
    {
        title: "Reunion de Coordinacion",
        location: "Photography Studio",
        name: "Creative Photography Workshop",
        type: "Workshop",
        date: "2024-06-15",
        mode: "Virtual",
        planned: true
    },
    {
        title: "Evaluacion de Proyectos",
        location: "Municipal Theater",
        name: "Live Jazz Night",
        type: "Concert",
        date: "2024-07-20",
        mode: "In-person",
        planned: false
    },
];


function ActivityDetail(){

    const [planeada, setPlaneada] = useState('No Planeada');
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const title = urlParams.get('title');
            const foundActivity = activities.find(act => act.title === title);

            // Verificar si se encontró la actividad
            if (foundActivity) {
                setActivity(foundActivity);
                setPlaneada(foundActivity.planned ? 'Planeada' : 'No Planeada');
            }
        }
    }, []); // <- Array vacío para que el useEffect se ejecute solo una vez

    if (!activity) {
        return <div className="text-left text-lg">Cargando...</div>;
    }

    return(
        <div>
            <span className={`rounded-lg border-4 border-transparent font-bold p-1 ${
                activity.planned ? `bg-green-500` : `bg-red-600`
            }`}>{planeada}</span>

            <h1 className="text-left text-2xl font-bold mt-4">{activity.title}</h1>
            <p className="text-left text-lg">Tipo: {activity.type}</p>
            <p className="text-left text-lg">Fecha: {activity.date}</p>
            <p className="text-left text-lg">Modalidad: {activity.mode}</p>
            <h1 className="text-left text-2xl font-bold mt-4">Foro de Comentarios</h1>

            <p>Comentarios...</p>
            
            <button
            className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                Enviar
            </button>

        </div>
    )
}

export default ActivityDetail