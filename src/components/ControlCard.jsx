
import React from 'react';

function ControlCard({ title, description, interactive}) {

    const handleClick = () => {
        if(interactive){
            window.location.href = `EventDetail?title=${encodeURIComponent(title)}`;
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