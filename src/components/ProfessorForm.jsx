import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import FormData from "form-data";

function ProfessorForm() {

    const [professor, setProfessor] = useState(null);
    const [profName, setProfName] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        office_phone: '',
        cellphone: '',
        status: '',
        campus: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const newProfName = urlParams.get('prof');

            if (newProfName) {
                setProfName(newProfName);
            }
        }
    }, []);

    useEffect(() => {
        if (!profName) return

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=${profName}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const newProfessor = response.data[0];
                setProfessor(newProfessor)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [profName])

    const handleAddProfessor = (e) => {

        e.preventDefault();

        const data = new FormData();
        data.append('full_name', formData.name);
        data.append('email', formData.email);
        data.append('office_phone', formData.office_phone);
        data.append('cellphone', formData.cellphone);
        if(formData.status == 'Activo'){
           data.append('Status', true); 
        }else{data.append('Status', false);}

        data.append('campus', formData.campus);

        const requestOptions = {
            method: "POST",
            body: data,
            redirect: "follow"
          };
          
          fetch(`${API_URL}/professors`, requestOptions)
            .then((response) => response.text())
            .then((result) => {console.log(result); window.location.href = 'ProfessorManagement'})
            .catch((error) => console.error(error));
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    }

    return (
        <div>
            {professor ? (
                // Renderizar formulario para un profesor existente
                <form className="w-3/4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.full_name}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.email}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telefono Oficina</label>
                        <input
                            type="tel"
                            id="Oficina"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.office_phone}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input
                            type="tel"
                            id="Celular"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.cellphone}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Foto</label>
                        <input
                            type="file"
                            id="imagen"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            accept="image/*"
                        />
                    </div>
                    <button
                        className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                        Editar
                    </button>
                </form>
            ) : (
                // Renderizar para agregar un profesor
                <form className="w-3/4" onSubmit={handleAddProfessor}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Nombre Completo"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Correo"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telefono Oficina</label>
                        <input
                            type="tel"
                            id="office_phone"
                            value={formData.office_phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Telefono de Oficina"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input
                            type="tel"
                            id="cellphone"
                            value={formData.cellphone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Celular"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <input
                            type="text"
                            id="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Activo/Desactivo"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Campus</label>
                        <input
                            type="text"
                            id="campus"
                            value={formData.campus}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Campus"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Foto</label>
                        <input
                            type="file"
                            id="imagen"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            accept="image/*"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                        Agregar
                    </button>
                </form>
            )}
        </div>
    )
};

export default ProfessorForm