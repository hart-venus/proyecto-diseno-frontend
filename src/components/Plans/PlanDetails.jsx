import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import axios from "axios";

function PlanDetails() {
    const [planeada, setPlaneada] = useState(false);
    const [id, setId] = useState(null);
    const [plan, setPlan] = useState(null)

    const handleActivity = (activity) => {
        window.location.href = `EventDetail?id=${encodeURIComponent(activity.id)}`;
    }

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
            url: `${API_URL}/activities?work_plan_id=:${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const newPlan = response.data
                setPlan(newPlan)
                console.log(newPlan)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id])

    if (!plan) {
        return <div className="text-left text-lg">Cargando...</div>;
    }

    return (
        <div>
            <table class="table-auto w-full border border-gray-200">
                <thead>
                    <tr>
                    <th class="px-4 py-2 bg-gray-100 border border-gray-200">Semana</th>
                        <th class="px-4 py-2 bg-gray-100 border border-gray-200">Fecha</th>
                        <th class="px-4 py-2 bg-gray-100 border border-gray-200">Tipo</th>
                        <th class="px-4 py-2 bg-gray-100 border border-gray-200">Nombre</th>
                        <th class="px-4 py-2 bg-gray-100 border border-gray-200">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        plan && plan.map((activity, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-gray-200">{activity.week}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.date}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.activity_type}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.name}</td>
                                <td className="px-4 py-2 border border-gray-200">
                                <button onClick={() => handleActivity(activity)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-green-500 hover:bg-green-700"></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default PlanDetails