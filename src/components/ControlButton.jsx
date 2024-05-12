function ControlButton({title}) {

    const handleClick = () => {
        if (title == 'Profesores') {
            window.location.href = 'ProfessorManagement'
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