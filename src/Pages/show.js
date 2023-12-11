import React, {useState, useEffect} from 'react';

import { Login } from '../Components/Form/form';

export const ShowPage = () => {
    
  const [outputText, setOutputText] = useState([]);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [userid, setUserid] = useState([])
  const [token, setToken] = useState(null);

  const getToken = (user, token) => {
    debugger
    setUserid(user);
    setToken(token);
  };

  function updateTextHandler() {
    setOutputText('Text was changed!');
  }

  useEffect(function () {
     // Set the username
    //const userid = 'peter@cde.com';
    // const username = userid;
    // Construct the basic authentication string
    //const token = 'sha256$bi7DWbEBHzAD5E23$aaa0b760dde776a8088f2bd92adb73c97ae7d1387b7d5b152961e0741bb21876' ; // Replace with your actual token
    // const token = token;
    debugger
    if (token) {
    const encodedCredentials = btoa(`${userid}:${token}`);
    // Create the headers object with the authorization header
    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
    };

    // Send the POST request
    const url = 'http://localhost:5000'; // Replace with your actual API URL
    fetch(`${url}/api/package/getAllPackages`, {
        method: 'POST',
        headers: headers,
    }).then(response => response.json())
      .then(message => {
        debugger
        setLoadedPosts(message.data)})}}, 
    [token, userid]);

  // debugger
  return (
    <>
        <button onClick={updateTextHandler}>Click to change text</button>
        <p>{outputText}</p>

        <ul>

            { !token &&
              <Login getToken={getToken}/>
            }

            { token && loadedPosts && loadedPosts.length > 0 && (
                <ul>
                {loadedPosts.map((post) => (
                    <li key={post.id}>{post.hotel_name}</li>
                ))}
                </ul>
            )}
                
        </ul>
    </>
  );
}