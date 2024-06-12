// import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useContext, useEffect} from 'react';
// import { Button, Modal } from 'react-bootstrap';

import { LoginOM } from '../Components/Form/formOM';
import { SearchOM } from '../Components/Form/searchOM';
import { ImageComponent } from '../Components/Form/imageComp';
import { AuthContext } from '../context'; // Import the context

export const ShowPageOM = () => {

  // const [userid, setUserid] = useState([])
  // const [token, setToken] = useState(null);
  const [pngdata, setPngdata] = useState(null);    
  const [lat, setLat] = useState(null);   
  const [long, setLong] = useState(null);   
  const [hotelName, setHotelName] = useState('');
  const {token, setToken, userid, setUserid, om_userid, om_setUserid, om_token, om_setToken } = useContext(AuthContext);

  const getToken = (user, a_token) => {
    debugger
    om_setUserid(user);
    om_setToken(a_token);
  };

  const getCoord = (coord) => {
    debugger
    setLat(coord.lat);
    setLong(coord.long);
    setHotelName(coord.hotelName);
  };

  useEffect(function () {

    // url = f"https://www.onemap.gov.sg/api/staticmap/getStaticImage?\
    //     layerchosen=default&latitude={lat}&longitude={long}&\
    //     points=[{lat},{long}]&postal=&zoom=17&width=400&height=512&fillColor=0,255,0"
    // headers = {"Authorization": record["access_token"]}
    // response = requests.request("GET", url, headers=headers)
    // print(response.content)

    debugger
    if (om_token && lat && long) {

        const encodedCredentials = btoa(`${om_userid}:${om_token}`);
        // Create the headers object with the authorization header
        
        const headers = {
          Authorization: `Basic ${encodedCredentials}`,
        };

        // Send the POST request
        const url = 'https://www.onemap.gov.sg/api/staticmap/getStaticImage?'; 
        // Shangari-La Singapore: 1.31122438238089 103.826788133417
        // const lat = 1.31122438238089; 
        // const long = 103.826788133417; 
        const query_string = `layerchosen=default&latitude=${lat}&longitude=${long}&points=[${lat},${long}]&postal=&zoom=17&width=400&height=512&fillColor=0,255,0`;

        fetch(`${url}${query_string}`, {
            method: 'GET',
            headers: headers,
        }).then(response => {
            debugger;
            console.log(response);
            return response.blob()
        }).then(message => {
            debugger
            setPngdata(message)})}}, 
        [om_userid, om_token, lat, long]);

  debugger
  return (
    <>

            { !om_token &&
              <LoginOM getToken={getToken}/>
            }

            { om_token && 
              <SearchOM getCoord={getCoord}/>
            }

            { pngdata && hotelName &&
              <ImageComponent blob={pngdata} hotel={hotelName}/>
            }

            { pngdata && !hotelName &&
                <h1 className="display-4 mt-5 animate__animated animate__tada">Place Not Found</h1>
            }

    </>
  );
}