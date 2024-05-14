import ControlCard from "../PanelControlComponents/ControlCard";
import ControlButton from "../PanelControlComponents/ControlButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

const modules = [
    { title: "Modificar Cuenta" },
    { title: "Estudiantes" },
    { title: "Agregar Plan" },
    { title: "Profesores" }
];

function ControlPanelComponent() {

    const [guideTeam, setGuideTeam] = useState([])
    const [plans, setPlans] = useState([])
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
                if (response.data[0].coordinator === true) {
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
            url: `${API_URL}/work_plans`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            const newPlans = response.data
            setPlans(newPlans)
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])

    //Hacer logOut
    const handleLogOut = () => {
        window.sessionStorage.removeItem('role')
        window.sessionStorage.removeItem('USER_ID')
        window.location.href = 'login'
    }

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
                Vista de Planes Programados
            </p>

            <div className="grid grid-cols-3 gap-4">
                {
                    plans && plans.map((plan, index) => (
                        <ControlCard
                            key={index}
                            client:load
                            title={plan.campus}
                            description={`Fecha de Inicio: ${plan.start_date}`}
                            interactive={true}
                            id={plan.id}
                        />
                    ))
                }
            </div>
            <button onClick={handleLogOut}
                className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-red-500 hover:bg-red-700">
                Log Out
            </button>
        </div>
    )
}

export default ControlPanelComponent;