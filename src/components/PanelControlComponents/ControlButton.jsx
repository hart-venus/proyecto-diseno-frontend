function ControlButton({ title, role }) {
    const handleClick = () => {
        if (title === 'Profesores' && role === 'admin') {
            window.location.href = 'ProfessorManagement';
        } else if (title === 'Modificar Cuenta') {
            window.location.href = 'AccountConfig';
        } else if (title === 'Plan de Trabajo' && role !== 'admin') {
            window.location.href = 'Planning';
        } else if (title === 'Estudiantes') {
            window.location.href = 'StudentList';
        }
    };

    // Conditional rendering based on title and role
    if (
        (title === 'Profesores' && role === 'admin') ||
        title === 'Modificar Cuenta' ||
        (title === 'Plan de Trabajo' && role !== 'admin') ||
        title === 'Estudiantes'
    ) {
        return (
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-md text-lg">
                {title}
            </button>
        );
    } else {
        return null; // Hide the button if conditions are not met
    }
}

export default ControlButton;