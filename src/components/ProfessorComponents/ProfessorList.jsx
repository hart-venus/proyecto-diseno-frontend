import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

function ProfessorList() {

    const [professors, setProfessors] = useState(null)
    const [adminCampus, setAdminCampus] = useState(null);

    const handleEdit = (prof) => {
        window.location.href = `Professor?prof=${encodeURIComponent(prof.full_name)}`;
    };

    const handleStatus = (prof) => {

        const userId = window.sessionStorage.getItem('USER_ID')

        const data = new FormData();
        if (prof.status == 'active') {
            data.append('status', 'inactive');
        } else {
            data.append('status', 'active');
        }
        data.append('modified_by_user_id', userId);

        const requestOptions = {
            method: "PUT",
            body: data,
            redirect: "follow"
        };

        fetch(`${API_URL}/professors/${prof.code}`, requestOptions)
            .then((response) => response.text())
            .then((result) => { console.log(result); })
            .catch((error) => console.error(error));
    }

    const handleCoordinator = (prof) => {

        const requestOptions = {
            method: "PUT",
            redirect: "follow"
        };

        fetch(`${API_URL}/professors/${prof.code}/toggle_coordinator`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if(JSON.parse(result).error) return
                const updatedProfessors = [...professors];
                const index = updatedProfessors.findIndex(p => p.code === prof.code);
                updatedProfessors[index].coordinator = !prof.coordinator;
                setProfessors(updatedProfessors);
            })
            .catch((error) => console.error(error));
    }

    //Obtener el campus de la administradora que esta realizando cambios
    useEffect(() => {

        const userId = window.sessionStorage.getItem('USER_ID')


        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${API_URL}/users/${userId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => { setAdminCampus(JSON.parse(result).campus) })
            .catch((error) => console.error(error));

    })

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setProfessors(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <table className="mt-6 w-full table-auto border-collapse border border-slate-500 border-spacing-x-3">
            <thead className="bg-neutral-200">
                <tr>
                    <th className="border border-slate-600">Nombre</th>
                    <th className="border border-slate-600">Campus</th>
                    <th className="border border-slate-600">Correo</th>
                    <th className="border border-slate-600">Telefono Oficina</th>
                    <th className="border border-slate-600">Celular</th>
                    <th className="border border-slate-600">Coordinador</th>
                    <th className="border border-slate-600">Activo</th>
                    <th className="border border-slate-600">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    professors && professors.map((prof, index) => (
                        <tr key={index}>
                            <td className="border border-slate-700 p-2">{prof.full_name}</td>
                            <td className="border border-slate-700 p-2">{prof.campus}</td>
                            <td className="border border-slate-700 p-2">{prof.email}</td>
                            <td className="border border-slate-700 p-2">{prof.office_phone}</td>
                            <td className="border border-slate-700 p-2">{prof.cellphone}</td>
                            <td className="border border-slate-700 p-2">
                                {prof.coordinator ? (
                                    <span className="text-xl" style={{ color: 'green' }}>Si</span> // Checkmark
                                ) : (
                                    <span className="text-xl" style={{ color: 'red' }}>No</span> // Cross
                                )}
                            </td>
                            <td className="border border-slate-700 p-2">
                                {prof.status === 'active' && (
                                    <span className="text-xl" style={{ color: 'green' }}>Si</span> // Checkmark
                                )}
                                {prof.status !== 'active' && (
                                    <span className="text-xl" style={{ color: 'red' }}>No</span> // Cross
                                )}
                            </td>
                            <td className="border border-slate-700 p-2">
                                <button onClick={() => handleEdit(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
                                <button onClick={() => handleStatus(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-red-600 hover:bg-red-800">Baja</button>
                                {adminCampus && adminCampus === 'CA' && prof.coordinator == true && (
                                    <button onClick={() => handleCoordinator(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-red-500 hover:bg-red-700">Coordinador</button>
                                )}
                                {adminCampus && adminCampus === 'CA' && prof.coordinator == false && (
                                    <button onClick={() => handleCoordinator(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-green-500 hover:bg-green-700">Coordinador</button>
                                )}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    );
}

export default ProfessorList