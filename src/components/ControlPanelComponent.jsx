import ControlCard from "./ControlCard";
import ControlButton from "./ControlButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";



const activities = [
    { title: "Reunion de Coordinacion", description: "10/05/2023" },
    { title: "Taller de Capacitacion", description: "15/05/2023" },
    { title: "Evaluacion de Proyectos", description: "20/05/2023" },
];

const modules = [
    { title: "Estudiantes" },
    { title: "Profesores" },
    { title: "Plan de Trabajo" },
    { title: "Modificar Cuenta" },
];

function ControlPanelComponent() {

    const [guideTeam,setGuideTeam] = useState([])

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/professors/search?query=true`,
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

    return (
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-left text-3xl font-bold my-4">Panel de Control</h1>
            <p className="text-left text-2xl font-bold my-4">
                Resumen del Equipo Guia
            </p>
            <div className="grid grid-cols-3 gap-4">
                {
                    guideTeam && guideTeam.map((member,index) => (
                        <ControlCard
                            key={index}
                            client:load
                            title={member.full_name}
                            description={"Coordinador"}
                            interactive={false}
                        />
                    ))
                }
            </div>

            <p className="text-left text-lg font-bold my-4">
                Navegacion a Modulos Especificos
            </p>

            <div className="grid grid-cols-6 gap-4">
                {
                    modules.map((module,index) => (
                        <ControlButton key={index} client:load title={module.title} />
                    ))
                }
            </div>

            <p className="text-left text-lg font-bold my-4">
                Vista de Actividades Programadas
            </p>

            <div className="grid grid-cols-3 gap-4">
                {
                    activities.map((activity,index) => (
                        <ControlCard
                        key={index}
                            client:load
                            title={activity.title}
                            description={activity.description}
                            interactive={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ControlPanelComponent;