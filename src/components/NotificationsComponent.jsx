import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import ReturnButton from "./ReturnButton";


const obj = {
    notifications: {
        0: {
            content: 'Hola',
            created_at: '15 de junio de 2024, 2:39:47 p.m. UTC-6',
            id: "430dd281-7a27-463e-9a7b-cad556fe596a",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        1: {
            content: 'Hola!',
            created_at: '15 de junio de 2024, 2:39:47 p.m. UTC-6',
            id: "6a2ae58a-ddf1-481e-942a-e5b05fac3ac4",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        2: {
            content: 'Notificación 3',
            created_at: '16 de junio de 2024, 10:20:15 a.m. UTC-6',
            id: "3e4a6b57-8b1c-4e31-9a55-fb79f4b13d5d",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        3: {
            content: 'Notificación 4',
            created_at: '16 de junio de 2024, 10:22:30 a.m. UTC-6',
            id: "b2b6f9d3-7f3a-47b5-b1a5-0c8e7d1fbf8d",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        4: {
            content: 'Notificación 5',
            created_at: '16 de junio de 2024, 10:25:45 a.m. UTC-6',
            id: "f193e9f1-51c3-4e29-9c50-7f3a1b634aff",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        5: {
            content: 'Notificación 6',
            created_at: '16 de junio de 2024, 10:28:10 a.m. UTC-6',
            id: "3b93e1e7-1f6e-4be1-8e68-401ae3e8b021",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        6: {
            content: 'Notificación 7',
            created_at: '16 de junio de 2024, 10:30:20 a.m. UTC-6',
            id: "c5a9ff08-4ba5-4e4e-9d64-9e59fa4f50c5",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        7: {
            content: 'Notificación 8',
            created_at: '16 de junio de 2024, 10:32:35 a.m. UTC-6',
            id: "0e92a21b-9c08-48f5-9445-3c33a7bbca3d",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        8: {
            content: 'Notificación 9',
            created_at: '16 de junio de 2024, 10:35:00 a.m. UTC-6',
            id: "29b50dab-6312-4b3f-af1c-428f9a9f5762",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        9: {
            content: 'Notificación 10',
            created_at: '16 de junio de 2024, 10:37:15 a.m. UTC-6',
            id: "12c3b8bf-88d3-4603-85f1-eb98ee45b3c4",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        10: {
            content: 'Notificación 11',
            created_at: '16 de junio de 2024, 10:39:30 a.m. UTC-6',
            id: "f5b0b00e-6c82-4c7a-a5d7-94e47e4b4bc8",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        11: {
            content: 'Notificación 12',
            created_at: '16 de junio de 2024, 10:41:45 a.m. UTC-6',
            id: "2eaf0b4b-924d-4d9f-9d8d-3b85a2b4601e",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        12: {
            content: 'Notificación 13',
            created_at: '16 de junio de 2024, 10:44:00 a.m. UTC-6',
            id: "fe56a2a3-9895-4a19-b278-c97b53126f0c",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        },
        13: {
            content: 'Notificación 14',
            created_at: '16 de junio de 2024, 10:46:15 a.m. UTC-6',
            id: "3c36d0f0-23e8-46a5-b4d6-7e70868c13a1",
            recipient_id: "20241111",
            sender: "mundo",
            status: "READ"
        },
        14: {
            content: 'Notificación 15',
            created_at: '16 de junio de 2024, 10:48:30 a.m. UTC-6',
            id: "b0f5ea71-2a43-4f61-b682-731f2eb128a3",
            recipient_id: "20241111",
            sender: "mundo",
            status: "UNREAD"
        }
    }
};

function NotificationComponent() {

    const [student, setStudent] = useState(null)
    //Esto por mientras convierte mis notificaciones ficitcias a array para poder iterar
    const notificationsArray = Object.values(obj.notifications);

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

    }, [])

    //Funcion para actualizar el estado de leida
    const handleSeen = (id) => {
        //Actualizar estado
        //Asumo que se recibira el id de la notificacion que vamos a actualizar
        console.log(id)
    }

    return (
        student &&
        <>
            {/* Renderizar sección de comentarios solo si el USER_ROLE no es "admin" */}
            <div className="mt-8">
                <h1 className="text-left text-2xl font-bold">Notificaciones del Estudiante: {student.full_name}</h1>
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
                                        onClick={() => {handleSeen(notification.id)}}
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