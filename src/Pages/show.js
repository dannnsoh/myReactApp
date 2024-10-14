// import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect, useContext} from 'react';

import { Login } from '../Components/Form/form';
import { AuthContext } from '../context'; // Import the context

export const ShowPage = () => {
    
  const [loadedPosts, setLoadedPosts] = useState([]);
  // const [userid, setUserid] = useState([]);
  // const [token, setToken] = useState(null);
  const {token, setToken, userid, setUserid, om_userid, om_setUserid, om_token, om_setToken } = useContext(AuthContext);

  const getToken = (user, a_token) => {
    debugger
    setUserid(user);
    setToken(a_token);
  };

  function handleClick(hotel_name) {
    alert('You clicked on: ' + hotel_name);
  }

  useEffect(function () {
 
    console.log(token);
    debugger
    if (token) {
        const encodedCredentials = btoa(`${userid}:${token}`);
        // Create the headers object with the authorization header
        const headers = {
          Authorization: `Basic ${encodedCredentials}`,
        };

        // Send the POST request
	const serverAddress = window.location.hostname;
	const url = 'http://' +serverAddress+ ":5000";
        fetch(`${url}/api/package/getAllPackages`, {
            method: 'POST',
            headers: headers,
        }).then(response => response.json())
        .then(message => {
          console.log('API Response:', message);
              if (Array.isArray(message.data)) {
                  setLoadedPosts(message.data);
              } else {
                  console.error('Expected an array but got:', message.data);
                  setLoadedPosts([]);
              }
          })
          .catch(error => {
                console.error('Error fetching data:', error);
                setLoadedPosts([]);
            });
        }},
        [token, userid]);

  // debugger
  return (
    <>
        <div className="container">
            { 
              !token &&
              <Login getToken={getToken}/>
            }

            { token && loadedPosts && loadedPosts.length > 0 && (
              <div className="card-body text-center">
              <h1 className="display-4 mt-5 animate__animated animate__tada" style={{fontSize: '2rem'}}>Listing of All Packages</h1>
                <ul className="list-group mt-4 mb-4">
                  {loadedPosts.map((post) => (
                    <li key={post.id} className="list-group-item toBeClicked" onClick={() => handleClick(post.hotel_name)}>{post.hotel_name}</li>
                  ))}
                </ul>
              </div>

            )}
                
        </div>
    </>
  );
}
