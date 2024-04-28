import React from "react";

function ProfessorList({ professors }) {

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
                        <tr>
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
                                <button className="size-auto mx-4 text-white rounded-lg border-4 border-transparent font-bold p-1 bg-yellow-500 hover:bg-yellow-700">Editar</button>
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