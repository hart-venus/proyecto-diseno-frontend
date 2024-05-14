import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import axios from "axios";

function ActivitiesCalendar() {


    const [activities, setActivities] = useState(null)

    //Use effect para cargar las actividades y mostrarlas
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/activities`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const newActivities = response.data;
                setActivities(newActivities);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <div className="w-2/3 bg-white rounded-lg shadow-md p-6 mb-4 items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Calendario de actividades
            </h1>
            <h1 className="text-gray-900 mb-4">
                Visualización por semanas con actividades planeadas
            </h1>
            <table className="table-auto w-full border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Fecha</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Actividad</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {activities && activities.map((activity) => (
                        <tr key={activity.id}>
                            <td className="px-4 py-2 border border-gray-200">{activity.date_time}</td>
                            <td className="px-4 py-2 border border-gray-200">{activity.name}</td>
                            <td className="px-4 py-2 border border-gray-200">{activity.activity_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default ActivitiesCalendar