function ProfessorForm(professor) {

    professor = null;

    return (
        <div>
            {professor ? (
                // Renderizar formulario para un profesor existente
                <div>
                    <h2>Editar Profesor</h2>
                    <p>Nombre: {professor.nombre}</p>

                </div>
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
                        class="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                        Agregar
                    </button>
                </form>
            )}
        </div>
    )
};

export default ProfessorForm