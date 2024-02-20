// import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useState } from 'react';

export const LoginOM = ({getToken}) => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        
        event.preventDefault();

        debugger
        // new_host = "https://www.onemap.gov.sg"
        // url = f"{new_host}/api/auth/post/getToken"
        // payload = {
        //     "email": "paulwuhj@suss.edu.sg",
        //     "password": "09338cZZ!!!!"
        // }
        // token = requests.request("POST", url, json=payload)
        
        const url = "https://www.onemap.gov.sg"; // 
        console.log(typeof userid);
        console.log(typeof  password);
        // const userid1 = "paulwuhj@suss.edu.sg"
        // const password1 = "09338cZZ!!!!"
        const data = JSON.stringify({
            'email': userid,
            'password': password
        })
        console.log(data);
        fetch(`${url}/api/auth/post/getToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
            }).then( response => {
                debugger
                console.log(response);
                return response.ok ? response.json() : null
            }).then(message => {
                debugger
                if (message !== null) { 
                    console.log(message.access_token);
                    getToken(userid, message.access_token)
                }
            }).catch( error => console.log(error)) 
    }

    return (
        <div className="container">
            <div className="card mt-5 mx-auto mb-1 transparent-border" >
                <div className="card-body">
                <h1 className="display-4 text-center mb-3" style={{fontSize: '2rem'}}>Enter Credentials to Access <br /> OneMap APIs</h1>
                    <form onSubmit={handleSubmit} className="form-group" >
                        <div className="row align-items-center">
                            <label htmlFor="userid" className="col-sm-3 col-form-label">User ID:</label>
                            <div className="col-sm-9">
                                <input type="text" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="Userid OM" className="form-control" />
                            </div>
                        </div>
    
                        <div className="row align-items-center mt-3">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password:</label>
                            <div className="col-sm-9">
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password OM" className="form-control" />
                            </div>
                        </div>
    
                        <button type="submit" className="btn btn-secondary mt-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
    
}
