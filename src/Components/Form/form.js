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
        <form onSubmit={handleSubmit}>
            <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="Userid" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}

