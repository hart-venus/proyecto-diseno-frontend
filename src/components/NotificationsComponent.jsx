import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import ReturnButton from "./ReturnButton";

function NotificationComponent() {

    const [student, setStudent] = useState(null)
    //Esto por mientras convierte mis notificaciones ficitcias a array para poder iterar
    const [notificationsArray, setNotificationsArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    //Obtener el estudiante actual
    useEffect(() => {
        const newStudentId = window.sessionStorage.getItem("STUDENT_ID")

        axios.get(`${API_URL}/students/${newStudentId}`)
            .then((response) => {
                const newStudent = response.data;
                setStudent(newStudent);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //Aqui se haria la llamada a la API para obtener las notificaciones
    useEffect(() => {

        if (student) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/student_inbox/${student.carne}`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setNotificationsArray(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [student])

    //Funcion para actualizar el estado de leida
    const handleSeen = (id) => {
        //Actualizar estado
        //Asumo que se recibira el id de la notificacion que vamos a actualizar
        console.log(id)

        // let config = {
        //     method: 'put',
        //     maxBodyLength: Infinity,
        //     url: `${API_URL}/student_inbox/${student.carne}/notifications/${id}{/mark_as_read`,
        //     headers: {}
        // };

        // axios.request(config)
        //     .then((response) => {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

    }

    const handleFilterChange = (filter) => {
        if (filter == 'all') {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/student_inbox/${student.carne}`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setNotificationsArray(response.data);
                })
                .catch((error) => {
                    if (error.response.statusText == 'Not Found') {
                        setNotificationsArray([])
                    }
                });
        } else if (filter == 'read') {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/student_inbox/${student.carne}/filter_by_status?status=READ`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setNotificationsArray(response.data);
                })
                .catch((error) => {
                    if (error.response.statusText == 'Not Found') {
                        setNotificationsArray([])
                    }
                });
        } else if (filter == 'unread') {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/student_inbox/${student.carne}/filter_by_status?status=UNREAD`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setNotificationsArray(response.data);
                })
                .catch((error) => {
                    if (error.response.statusText == 'Not Found') {
                        setNotificationsArray([])
                    }
                });
        }else{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/student_inbox/${student.carne}/fuzzy_search?query=${filter}`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setNotificationsArray(response.data);
                })
                .catch((error) => {
                    if (error.response.statusText == 'Not Found') {
                        setNotificationsArray([])
                    }
                });
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        student &&
        <>
            {/* Renderizar sección de comentarios solo si el USER_ROLE no es "admin" */}
            <div className="mt-8">
                <h1 className="text-left text-2xl font-bold">Notificaciones del Estudiante: {student.full_name}</h1>
                {/*Opciones de Busqueda*/}
                <label className="block text-gray-700">Filtros</label>
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`px-2 py-1 border rounded-md hover:bg-blue-300`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => handleFilterChange('read')}
                        className={`px-2 py-1 border rounded-md hover:bg-blue-300`}
                    >
                        Leidas
                    </button>
                    <button
                        onClick={() => handleFilterChange('unread')}
                        className={`px-2 py-1 border rounded-md hover:bg-blue-300`}
                    >
                        No Leidas
                    </button>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar..."
                    className="border px-2 py-1 rounded-md mx-2"
                />
                <button onClick={() => handleFilterChange(`${searchTerm}`)} className="px-2 py-1 border rounded-md bg-blue-500 text-white">
                    Buscar
                </button>
                {/* Mostrar notificaciones */}
                <div className="mt-4 overflow-y-auto h-96">
                    {notificationsArray.map(notification => (
                        <div key={notification.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                            <p className="text-lg">{notification.content}</p>
                            <p className="text-sm text-gray-500 mt-2">De: {notification.sender}</p>
                            <p className="text-sm text-gray-500 mt-2">{notification.created_at}</p>
                            {
                                notification.status == 'UNREAD' &&
                                <div className="flex gap-2">
                                    <p className="text-sm font-bold mt-2 text-red-600">No Leida</p>
                                    <button
                                        onClick={() => { handleSeen(notification.id) }}
                                        className="ml-2 px-2 py-1 rounded-lg bg-gray-200 hover:bg-red-500 focus:bg-gray-300 focus:outline-none"
                                    >
                                        X
                                    </button>
                                </div>
                            }
                        </div>
                    ))}
                </div>

            </div>

            <ReturnButton title={'Regresar'} page={'ControlPanel'} client:load></ReturnButton>
        </>
    );

}

export default NotificationComponent