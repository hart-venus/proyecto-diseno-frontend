function ControlButton({title}) {

    const handleClick = () => {
        if (title == 'Profesores') {
            window.location.href = 'ProfessorManagement'
        }else if(title == 'Modificar Cuenta'){
            window.location.href = 'AccountConfig'
        }else if(title == 'Plan de Trabajo'){
            window.location.href = 'Planning'
        }
    }

    return (
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-md
            text-lg">
            {title}
        </button>
    )
}

export default ControlButton;