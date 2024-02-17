import { useState, useEffect } from 'react';

export const ImageComponent = ({ blob, hotel}) => {
    
    const [url, setUrl] = useState(null);

    // Use useEffect to revoke the URL after unmounting
    useEffect(() => {
        setUrl(URL.createObjectURL(blob));
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [url, blob]);

    // Return the image element with conditional rendering
    return url ? (
        <>
            <h1>The Static Map of {hotel}</h1>
            <h2>Retrieved from OneMap API</h2>
            <img src={url} className="img-fluid" alt="Responsive image" />
        </>
    ) : null;
}