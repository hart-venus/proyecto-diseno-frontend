import { useState, useEffect } from "react";

const professors = [
    {
        nombre: "John Doe",
        codigo: "JD123",
        correo: "john@example.com",
        telefonoOficina: "123-456-789",
        celular: "987-654-321",
        guiaPrincipal: true,
    },
    {
        nombre: "Jane Smith",
        codigo: "JS456",
        correo: "jane@example.com",
        telefonoOficina: "111-222-333",
        celular: "444-555-666",
        guiaPrincipal: false,
    },
    {
        nombre: "Alice Johnson",
        codigo: "AJ789",
        correo: "alice@example.com",
        telefonoOficina: "999-888-777",
        celular: "666-777-888",
        guiaPrincipal: true,
    }
];


function ProfessorForm() {

    const [professor, setProfessor] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const profName = urlParams.get('prof');

            if (profName) {
                const foundProfessor = professors.find(prof => prof.nombre === profName);
                if (foundProfessor) {
                    setProfessor(foundProfessor);
                }
            }
        }
    }, []);

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
                            placeholder={professor.nombre}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.correo}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telefono Oficina</label>
                        <input
                            type="tel"
                            id="Oficina"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.telefonoOficina}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input
                            type="tel"
                            id="Celular"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder={professor.celular}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Foto</label>
                        <input
                            type="image"
                            id="imagen"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                        />
                    </div>
                    <button
                        className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                        Editar
                    </button>
                </form>
            ) : (
                // Renderizar para agregar un profesor
                <form className="w-3/4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Correo"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telefono Oficina</label>
                        <input
                            type="tel"
                            id="Oficina"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Telefono de Oficina"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input
                            type="tel"
                            id="Celular"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
                            placeholder="Ingrese Celular"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Foto</label>
                        <input
                            type="image"
                            id="imagen"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-700"
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