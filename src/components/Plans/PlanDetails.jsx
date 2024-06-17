import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
import ReturnButton from "../ReturnButton";

function PlanDetails() {
    const [planeada, setPlaneada] = useState(false);
    const [id, setId] = useState(null);
    const [plan, setPlan] = useState(null);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const newId = urlParams.get('id');
        setId(newId);
        window.sessionStorage.setItem('PLAN_ID', newId);

        const role = window.sessionStorage.getItem('USER_ROLE');
        setUserRole(role);
    }, []);

    const handleActivity = (activity) => {
        window.location.href = `EventDetail?id=${encodeURIComponent(activity.id)}`;
    }

    const handleNew = () => {
        window.location.href = 'NewActivities';
    }

    const handleEdit = (activityId) => {
        window.location.href = `EditActivities?id=${activityId}`;
    }

    useEffect(() => {
        console.log(id)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/activities?work_plan_id=${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const newPlan = response.data;
                setPlan(newPlan);
                console.log(newPlan);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    if (!plan) {
        return <div className="text-left text-lg">Cargando...</div>;
    }

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <div className="max-h-80 overflow-y-auto">
                <table className="table-auto w-full border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Semana</th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Fecha</th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Tipo</th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Nombre</th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Ver</th>
                            {userRole === "coord" && (
                                <>
                                    <th className="px-4 py-2 bg-gray-100 border border-gray-200">Editar</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            plan.sort((a, b) => new Date(a.realization_date) - new Date(b.realization_date)).map((activity, index) => (
                                activity.status === 'CANCELADA'  && (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border border-gray-200">{activity.week}</td>
                                        <td className="px-4 py-2 border border-gray-200">{formatDate(activity.realization_date)}</td>
                                        <td className="px-4 py-2 border border-gray-200">{activity.activity_type}</td>
                                        <td className="px-4 py-2 border border-gray-200">{activity.name}</td>
                                        <td className="px-4 py-2 border border-gray-200">
                                            <button onClick={() => handleActivity(activity)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-green-500 hover:bg-green-700">Ver</button>
                                        </td>
                                        {userRole === "coord" && activity.status !== 'REALIZADA' && (
                                            <>
                                                <td className="px-4 py-2 border border-gray-200">
                                                    <button onClick={() => handleEdit(activity.id)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
                                                </td>
                                            </>
                                        )}

                                    </tr>
                                )))
                        }
                    </tbody>
                </table>
            </div>
            {userRole === "coord" && (
                <div className="text-center mt-4">
                    <button onClick={handleNew} className="text-white rounded-lg border-4 border-transparent font-bold p-2 bg-blue-500 hover:bg-blue-700">Nueva Actividad</button>
                </div>
            )}
            <div className="text-center mt-4">
                <ReturnButton title={'Regresar'} page={'ControlPanel'} client:load />
            </div>
        </div>

    );
}

export default PlanDetails;
