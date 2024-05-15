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
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const newId = urlParams.get('id');
            setId(newId);
            window.sessionStorage.setItem('PLAN_ID', newId);

            const role = window.sessionStorage.getItem('USER_ROLE');
            setUserRole(role);
        }
    }, []);

    const handleActivity = (activity) => {
        window.location.href = `EventDetail?id=${encodeURIComponent(activity.id)}`;
    }

    const handleNew = () => {
        // Aquí puedes agregar la lógica para redirigir al usuario a la página de edición
        window.location.href = 'Activities';
    }

    const handleEdit = (activityId) => {
        // Aquí puedes agregar la lógica para redirigir al usuario a la página de edición
        window.location.href = `Activities?id=${activityId}`;
    }

    useEffect(() => {
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

    return (
        <div>
            <table className="table-auto w-full border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Semana</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Fecha</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Tipo</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Nombre</th>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-200">Ver</th>
                        {userRole === "coordinadora" && (
                            <>
                                <th className="px-4 py-2 bg-gray-100 border border-gray-200"></th>
                                <th className="px-4 py-2 bg-gray-100 border border-gray-200"></th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        plan.map((activity, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-gray-200">{activity.week}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.date}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.activity_type}</td>
                                <td className="px-4 py-2 border border-gray-200">{activity.name}</td>
                                <td className="px-4 py-2 border border-gray-200">
                                    <button onClick={() => handleActivity(activity)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-green-500 hover:bg-green-700">Ver</button>
                                </td>
                                {userRole === "coord" && (
                                    <>
                                        <td className="px-4 py-2 border border-gray-200">
                                            <button onClick={() => handleEdit(activity.id)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
                                        </td>
                                    </>
                                )}
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {userRole === "coord" && (
                <div className="text-center mt-4">
                    <button onClick={handleNew} className="text-white rounded-lg border-4 border-transparent font-bold p-2 bg-blue-500 hover:bg-blue-700">Nueva Actividad</button>
                </div>
            )}
            <div className="text-center mt-4">
                <ReturnButton title={'Regresar'} page={'ControlPanel'} client:load/>
            </div>
        </div>
    );
}

export default PlanDetails;
