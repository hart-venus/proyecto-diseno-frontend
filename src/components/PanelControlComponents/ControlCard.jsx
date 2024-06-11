
function ControlCard({ title, description, interactive, id, tipo}) {

    const handleClick = () => {
        if(interactive && tipo =='Plan'){
            window.location.href = `PlanActivities?id=${encodeURIComponent(id)}`;
        }else{
            window.location.href = `ProfessorDetail?id=${encodeURIComponent(id)}`;
        }
    }

    return (
        <div className={`bg-neutral-200 rounded-lg shadow-md p-4 ${interactive ? 'cursor-pointer' : ''}`} onClick={handleClick}>
            <h1 className='font-bold text-lg'>{title}</h1>
            <p className='text-lg'>{description}</p>
        </div>
    );
}

export default ControlCard;