import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

function ProfessorList() {

    const [professors, setProfessors] = useState(null)

    const handleEdit = (prof) => {
        window.location.href = `Professor?prof=${encodeURIComponent(prof.full_name)}`;
    };

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
                    <th className="border border-slate-600">Codigo</th>
                    <th className="border border-slate-600">Correo</th>
                    <th className="border border-slate-600">Telefono Oficina</th>
                    <th className="border border-slate-600">Celular</th>
                    <th className="border border-slate-600">Guia Principal</th>
                    <th className="border border-slate-600">Activo</th>
                    <th className="border border-slate-600">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    professors && professors.map((prof) => (
                        <tr key={prof.nombre}>
                            <td className="border border-slate-700 p-2">{prof.full_name}</td>
                            <td className="border border-slate-700 p-2">{prof.code}</td>
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
                                <button onClick={() => handleEdit(prof)} className="size-auto mx-4 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
                                <button className="size-auto text-white rounded-lg border-4 border-transparent font-bold p-1 bg-red-600 hover:bg-red-800">Baja</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    );
}

export default ProfessorList