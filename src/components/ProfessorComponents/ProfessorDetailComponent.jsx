import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import ReturnButton from "../ReturnButton";

function ProfessorDetailComponent() {
    const [professor, setProfessor] = useState({});
    const [url, setUrl] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const newId = urlParams.get('id');

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=${newId}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setProfessor(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (!professor.photo_url) return;
        const imageUrl = professor.photo_url;
        const bucketName = imageUrl.split('/')[3];
        const objectPath = imageUrl.split(`${bucketName}/`)[1];
        const newURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media`;
        setUrl(newURL);
    }, [professor]);

    return (
        <div className="flex place-content-between gap-6">
            {/* Renderizar formulario para un profesor existente */}
            <div className="w-3/4">
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre Completo</label>
                    <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700">
                        {professor.full_name}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Correo Electronico</label>
                    <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700">
                        {professor.email}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Telefono Oficina</label>
                    <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700">
                        {professor.office_phone}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Celular</label>
                    <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700">
                        {professor.cellphone}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Campus</label>
                    <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700">
                        {professor.campus}
                    </p>
                </div>
                <ReturnButton title={'Regresar'} page={'ControlPanel'} client:load />
            </div>

            {/* Imagen si es que existe */}
            {
                professor.photo_url &&
                <img className="border-8 border-blue-500 rounded-full w-80 h-72" src={url} alt={`Image for ${professor.full_name}`} />
            }
        </div>
    )
}

export default ProfessorDetailComponent;
