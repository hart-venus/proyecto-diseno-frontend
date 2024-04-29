import React from "react";

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

function ProfessorList() {

    const handleEdit = (prof) => {
        window.location.href = `Professor?prof=${encodeURIComponent(prof.nombre)}`;
    };

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
                    <th className="border border-slate-600">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    professors.map((prof) => (
                        <tr key={prof.nombre}>
                            <td className="border border-slate-700 p-2">{prof.nombre}</td>
                            <td className="border border-slate-700 p-2">{prof.codigo}</td>
                            <td className="border border-slate-700 p-2">{prof.correo}</td>
                            <td className="border border-slate-700 p-2">{prof.telefonoOficina}</td>
                            <td className="border border-slate-700 p-2">{prof.celular}</td>
                            <td className="border border-slate-700 p-2">
                                {prof.guiaPrincipal ? (
                                    <span className="text-xl" style={{ color: 'green' }}>Si</span> // Checkmark
                                ) : (
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