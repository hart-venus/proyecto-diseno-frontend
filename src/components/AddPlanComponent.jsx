import { useState } from "react";
import { API_URL } from "../constants";

function AddPlanComponent() {

    const [isActive, setIsActive] = useState(false);
    const [workPlan, setWorkPlan] = useState({
        start_date: null,
        end_date: null,
        campus: null,
        active: null
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        const userId = window.sessionStorage.getItem('USER_ID');

        // Formatear las fechas al formato "aaaa/mm/dd"
        const formattedStartDate = workPlan.start_date.split('-').reverse().join('/');
        const formattedEndDate = workPlan.end_date.split('-').reverse().join('/');

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_id": userId,
            "work_plan": {
                "start_date": formattedStartDate,
                "end_date": formattedEndDate,
                "campus": workPlan.campus,
                "active": isActive
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${API_URL}/work_plans`, requestOptions)
            .then((response) => response.text())
            .then((result) => {console.log(result); window.location.href = 'ControlPanel'})
            .catch((error) => console.error(error));
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setWorkPlan({
            ...workPlan,
            [id]: value
        });
    }

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha Inicio:</label>
                    <input
                        type="date"
                        id="start_date"
                        value={workPlan.start_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Ingrese Fecha de Inicio (aaaa-mm-dd)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha Final:</label>
                    <input
                        type="date"
                        id="end_date"
                        value={workPlan.end_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Ingrese Fecha de Final (aaaa-mm-dd)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Campus:</label>
                    <input
                        type="text"
                        id="campus"
                        value={workPlan.campus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Ingrese Campus (CA/SJ/LI/SC)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Activo?</label>
                    <input
                        type="checkbox"
                        id="active"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                        className="mr-2"
                    />
                    <label htmlFor="active" className="text-gray-700">Activar</label>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-green-600 hover:bg-green-600">
                    Registrar Plan
                </button>
            </form>
        </>
    )
}

export default AddPlanComponent