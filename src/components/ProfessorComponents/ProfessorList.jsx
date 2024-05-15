import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import ErrorPopup from "../ErrorPopup";

function ProfessorList() {

    const [professors, setProfessors] = useState(null)
    const [adminCampus, setAdminCampus] = useState(null);
    const [error, setError] = useState(false)

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
            .then((result) => {
                console.log(result);
                const updatedProfessors = [...professors];
                const index = updatedProfessors.findIndex(p => p.code === prof.code);
                if (prof.status == 'active') {
                    updatedProfessors[index].status = 'inactive';
                }
                else {
                    updatedProfessors[index].status = 'active';
                }
                setProfessors(updatedProfessors);
            })
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

                if (JSON.parse(result).error) { setError(true); return }
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
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //Convertir el formato url al que es
    const converPhotoUrl = (url) => {
        if (!url) return '';
        const bucketName = url.split('/')[3];
        const objectPath = url.split(`${bucketName}/`)[1];
        const newURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media`;
        return newURL;
    }

    return (
        <table className="mt-6 w-full table-auto border-collapse border border-slate-500 border-spacing-x-3">
            <thead className="bg-neutral-200">
                <tr>
                    <th className="border border-slate-600">Foto</th>
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
                            <td className="w-28 border border-slate-700">
                                {<img className="ms-10-1 border-slate-950 border-2 rounded-full w-28 h-28" src={converPhotoUrl(prof.photo_url)} alt='' />}
                            </td>
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
                            <td className="border border-slate-700 w-72">
                                <button onClick={() => handleEdit(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
                                {prof.status == 'active' && <button onClick={() => handleStatus(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-red-600 hover:bg-red-800">Baja</button>}
                                {prof.status == 'inactive' && <button onClick={() => handleStatus(prof)} className="size-auto ms-2 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-green-500 hover:bg-green-700">Alta</button>}
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

            {error && <ErrorPopup setError={setError} errorMessage={'Ya existe un coordinador en este campus'} />}
        </table>

    );
}

export default ProfessorList