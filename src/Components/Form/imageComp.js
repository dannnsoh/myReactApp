import React, { useState, useEffect } from 'react';

export const ImageComponent = ({ blob, hotel}) => {
    
    const [url, setUrl] = useState(null);

    // Use useEffect to revoke the URL after unmounting
    useEffect(() => {
        setUrl(URL.createObjectURL(blob));
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [blob]);

    // Return the image element with conditional rendering
    return url ? (
    <>
        <div className="container" >
        <div className="card" >
            <div className="card-body mt-5 mx-auto mb-5 transparent-border" >
                <h1 className="display-4 text-center mb-4" style={{fontSize: '2rem'}}>The Static Map of {hotel}</h1>
                <h1 className="display-4 text-center mb-4" style={{fontSize: '2rem'}}>Retrieved from OneMap API</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{width: '80%', height: 'auto' }}>
                <img src={url} className="img-fluid" alt="Responsive image" style={{width: '100%', height: 'auto'}} />
                </div>
                </div>
            </div>
        </div>
        </div>
    </>
    ) : null;
}