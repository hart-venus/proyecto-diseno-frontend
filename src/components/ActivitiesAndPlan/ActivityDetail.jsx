import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import ReturnButton from "../ReturnButton";
import EvidencesViewer from "../EvidencesViewer";

function ActivityDetail() {
    const [planeada, setPlaneada] = useState(false);
    const [id, setId] = useState(null);
    const [activity, setActivity] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const USER_ROLE = window.sessionStorage.getItem('USER_ROLE');

    useEffect(() => {
        // Fetch activity ID from URL query params
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const newId = urlParams.get('id');
            setId(newId);
        }
    }, []);

    useEffect(() => {
        // Fetch activity details
        if (id) {
            axios.get(`${API_URL}/activities/${id}`)
                .then((response) => {
                    const newActivity = response.data;
                    setActivity(newActivity);
                    setPlaneada(newActivity.status === "PLANEADA");
                    console.log(newActivity)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        // Fetch comments when activity is loaded
        if (activity) {
            axios.get(`${API_URL}/comments/${activity.id}/base_comments`)
                .then((response) => {
                    setComments(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [activity]);

    const handleCommentSubmit = () => {
        // Submit a new comment
        const newComment = {
            activity_id: activity.id,
            user_id: window.sessionStorage.getItem("USER_ID"), // Replace with actual user ID
            content: commentContent,
            parent_comment_id: null
        };

        axios.post(`${API_URL}/comments/${activity.id}`, newComment)
            .then((response) => {
                // Refresh comments after successful submission
                setComments([...comments, response.data]);
                setCommentContent("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {/* Activity details */}
            <span className={`rounded-lg border-4 border-transparent font-bold p-1 ${planeada ? `bg-green-500` : `bg-red-600`}`}>
                {activity ? activity.status : "Cargando..."}
            </span>
            {/* Display other activity details */}
            <h1 className="text-left text-2xl font-bold mt-4">{activity && activity.name}</h1>
            <p className="text-left text-lg">Tipo: {activity && activity.activity_type}</p>
            <p className="text-left text-lg">Fecha: {activity && activity.date}</p>
            <p className="text-left text-lg">Hora: {activity && activity.time}</p>
            {activity && activity.is_remote === 'false' && <p className="text-left text-lg">Presencial</p>}
            {activity && activity.is_remote === 'true' && (
                <span>
                    <p className="text-left text-lg">Remota</p>
                    <p className="text-left text-lg">Link: {activity.meeting_link}</p>
                </span>
            )}

            {/* Render comment section only if USER_ROLE is not admin */}
            {USER_ROLE !== "admin" && USER_ROLE !== "student" &&(
                <div className="mt-8">
                    <h1 className="text-left text-2xl font-bold">Foro de Comentarios</h1>
                    {/* Display existing comments */}
                    <div className=" mt-4 overflow-y-auto h-60">
                        {comments.map(comment => (
                            <div key={comment.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                                <p className="text-lg">{comment.content}</p>
                                <p className="text-sm text-gray-500 mt-2">Por: {comment.professor_name}</p>
                                <p className="text-sm text-gray-500 mt-2">{comment.created_at}</p>
                            </div>
                        ))}
                    </div>
                    {/* Add comment form */}
                    <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }} className="mt-4">
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Escribe tu comentario aquí..."
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Enviar Comentario
                        </button>
                    </form>
                </div>
            )}

            {/* Return button */}
            <ReturnButton title={'Regresar'} page={`PlanActivities?id=${window.sessionStorage.getItem('PLAN_ID')}`} client:load />



            {activity && activity.evidences && <h1 className="font-bold text-4xl">Evidencias</h1>}
            <div className="grid grid-cols-3">
                {
                    activity && activity.evidences && activity.evidences.map((url) => (
                        <EvidencesViewer imageUrl={url} />
                    ))
                }
            </div>


        </div>
    );
}

export default ActivityDetail;
