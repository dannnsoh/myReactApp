
import React, { useState } from 'react';

export const Login = ({getToken}) => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        
        event.preventDefault();

        debugger
        // const encodedCredentials = btoa(`${userid}:${password}`);
        // const headers = {
        //     Authorization: `Basic ${encodedCredentials}`,
        // };
        const url = 'http://localhost:5000'; // Replace with your actual API URL
        fetch(`${url}/api/user/gettoken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': userid,
                'password': password
            })
            }).then( response => response.ok ? response.json() : null)
            .then(message => {
                debugger
                if (message !== null) { 
                    console.log(message);
                    getToken(userid, message.token.token)}
            }).catch( error => console.log(error)) 
    }
    return (   

            <div className="card mt-5 mx-auto mb-5 transparent-border" >
            <div className="card-body">
            <h1 className="display-4 text-center mb-4" style={{fontSize: '2rem'}}>Enter Crendtials to Access <br /> StaycationX APIs</h1>
            <form onSubmit={handleSubmit} class="needs-validation" novalidate>
            <div className="row align-items-center">
                <label htmlFor="userid" className="col-sm-3 col-form-label">User ID:</label>
                <div className="col-sm-9">
                    <input type="text" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="Userid" className="form-control" />
                </div>
            </div>
            <div className="row align-items-center mt-3">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password:</label>
                <div className="col-sm-9">
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3 mb-3">Login</button>
            </form>
            </div>
        </div>

    )

}

