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
        <form onSubmit={handleSubmit}>
            <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="Userid OM" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password OM" />
            <button type="submit">Login</button>
        </form>
    );
}
