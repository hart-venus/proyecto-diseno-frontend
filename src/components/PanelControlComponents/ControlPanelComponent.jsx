import ControlCard from "../PanelControlComponents/ControlCard";
import ControlButton from "../PanelControlComponents/ControlButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";



// const activities = [
//     { title: "Reunion de Coordinacion", description: "10/05/2023" },
//     { title: "Taller de Capacitacion", description: "15/05/2023" },
//     { title: "Evaluacion de Proyectos", description: "20/05/2023" },
// ];

const modules = [
    { title: "Modificar Cuenta" },
    { title: "Estudiantes" },
    { title: "Plan de Trabajo" },
    { title: "Profesores" }
];

function ControlPanelComponent() {

    const [guideTeam, setGuideTeam] = useState([])
    const [activities, setActivities] = useState([])
    const [role, setRole] = useState('')

    //Use Effect para obtener rol del usuario y saber que renderizar
    useEffect(() => {

        const userId = window.sessionStorage.getItem('USER_ID').replace(/"/g, '')

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/users/${userId}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const newRole = response.data.role
                const newCampus = response.data.campus
                window.sessionStorage.setItem('USER_ROLE', newRole)
                window.sessionStorage.setItem('USER_CAMPUS', newCampus)
                setRole(newRole)
                console.log(role)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [])

    //Use Effect para ver si el usuario es profesor coordinador
    useEffect(() => {

        const userId = window.sessionStorage.getItem('USER_ID')
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=${userId}`,
        };
    
        axios.request(config)
            .then((response) => {
                console.log(response.data[0].coordinator)
                if (response.data[0].coordinator === true){
                    window.sessionStorage.setItem('USER_ROLE', 'coord')
                    setRole('coord')
                    console.log(role)
                }
            })
    }, [])

    //Use effect para obtener profesores guía y coordinadores que son los principales que se mostraran
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const newGuideTeam = response.data
                setGuideTeam(newGuideTeam);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    //Use effect para cargar las actividades y mostrarlas
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/activities`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            const newActivities = response.data;
            setActivities(newActivities);
          })
          .catch((error) => {
            console.log(error);
          });
          
    },[])

    return (
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-left text-3xl font-bold my-4">Panel de Control</h1>
            <p className="text-left text-2xl font-bold my-4">
                Resumen del Equipo Guia
            </p>
            <div className="grid grid-cols-3 gap-4">
                {
                    guideTeam && guideTeam.map((member, index) => (
                        member.status == "active" && (
                            <ControlCard
                                key={index}
                                client:load
                                title={member.full_name}
                                description={member.coordinator ? "Coordinador" : "Profesor Guía"}
                                interactive={false}
                            />
                        )
                    ))
                }
            </div>

            <p className="text-left text-lg font-bold my-4">
                Navegacion a Modulos Especificos
            </p>

            <div className="grid grid-cols-6 gap-4">
                {
                    modules.map((module, index) => (
                        <ControlButton key={index} client:load title={module.title} role={role} />
                    ))
                }
            </div>

            <p className="text-left text-lg font-bold my-4">
                Vista de Actividades Programadas
            </p>

            <div className="grid grid-cols-3 gap-4">
                {
                    activities && activities.map((activity, index) => (
                        <ControlCard
                            key={index}
                            client:load
                            title={activity.name}
                            description={`Semana: ${activity.week}`}
                            interactive={true}
                            id={activity.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ControlPanelComponent;