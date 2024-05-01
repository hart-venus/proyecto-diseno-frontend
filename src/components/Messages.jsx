import React from "react";
import { act } from "react-dom/test-utils";
import { useState } from "react";

const messages = [
    {
        title: "Taller de Capacitacion",
        comments: [
            { usuario: 'Usuario 1', comentario: 'Muy bueno' },
            { usuario: 'Usuario 2', comentario: 'Excelente trabajo' },
            { usuario: 'Usuario 3', comentario: 'Me encanta' },
            // Puedes agregar más comentarios si lo deseas
        ]
    },
    {
        title: "Reunion de Coordinacion",
        comments: [
            { usuario: 'Usuario 4', comentario: 'Relajante y rejuvenecedor' },
            { usuario: 'Usuario 5', comentario: '¡Definitivamente volveré!' },
            // Puedes agregar más comentarios si lo deseas
        ]
    },
    // Puedes agregar más actividades con sus respectivos comentarios
];


function Messages({ activity }) {

    const [newComment, setNewComment] = useState(""); // Estado para almacenar el nuevo comentario

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = () => {
        console.log("Nuevo comentario:", newComment);
        setNewComment("");
    };

    return (
        <div>
            {
                messages.map(message => {
                    if (message.title === activity) {
                        return message.comments.map((comment, index) => (
                            <div className="my-2" key={index}>
                                <hr />
                                <h1 className="text-lg font-bold">{comment.usuario}</h1>
                                <p className="text-md">{comment.comentario}</p>
                                <hr />
                            </div>
                        ));
                    }
                    return null; // Si no se encuentra la actividad, devuelve null
                })
            }

            <div className=" grid grid-cols-1">
                <input
                className="border-2 border-slate-300 h-24"
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Agregar un comentario..."
                />
                <button
                    onClick={handleAddComment}
                    className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-blue-500 hover:bg-blue-700">
                    Enviar
                </button>
            </div>


        </div>
    )
}

export default Messages