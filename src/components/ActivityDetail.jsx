import { useState } from "react";
import { useEffect } from "react";
import Messages from "./Messages";
import { API_URL } from "../constants";
import axios from "axios";


function ActivityDetail() {

    const [planeada, setPlaneada] = useState(false);
    const [id, setId] = useState(null);
    const [activity, setActivity] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const newId = urlParams.get('id');

            setId(newId)
        }
    }, []);

    //Efecto para cargar info de la actividad
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/activities/${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const newActivity = response.data
                setActivity(newActivity)

                if(newActivity.status == "PLANEADA"){
                    setPlaneada(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id])

    if (!activity) {
        return <div className="text-left text-lg">Cargando...</div>;
    }

    return (
        <div>

            <span className={`rounded-lg border-4 border-transparent font-bold p-1 ${planeada ? `bg-green-500` : `bg-red-600`
                }`}>{activity.status}
            </span>

            <h1 className="text-left text-2xl font-bold mt-4">{activity.name}</h1>
            <p className="text-left text-lg">Descripcion: {activity.description}</p>
            <p className="text-left text-lg">Fecha: {activity.date_time}</p>
            <p className="text-left text-lg">Localizacion: {activity.location}</p>
            <h1 className="text-left text-2xl font-bold mt-4">Foro de Comentarios</h1>

            <Messages activity={activity.title} />

        </div>
    )
}

export default ActivityDetail