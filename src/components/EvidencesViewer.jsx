import { useEffect, useState } from "react";


function EvidencesViewer({imageUrl}) {

    const [url, setUrl] = useState('')

    //Convertir el formato url al que es
    useEffect(() => {
        if (!imageUrl) return '';
        const bucketName = imageUrl.split('/')[3];
        const objectPath = imageUrl.split(`${bucketName}/`)[1];
        const newURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media`;
        setUrl(newURL);
    },[])


    return (
        <div>
            <img src={url} alt="Evidencia" className="w-48 h-48" />
        </div>
    );
};

export default EvidencesViewer;

