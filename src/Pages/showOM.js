import React, {useState, useEffect} from 'react';

import { LoginOM } from '../Components/Form/formOM';
import { SearchOM } from '../Components/Form/searchOM';
import { ImageComponent } from '../Components/Form/imageComp';

export const ShowPageOM = () => {
    
  const [userid, setUserid] = useState([])
  const [token, setToken] = useState(null);
  const [pngdata, setPngdata] = useState(null);    
  const [lat, setLat] = useState(null);   
  const [long, setLong] = useState(null);   
  const [hotelName, setHotelName] = useState('');

  const getToken = (user, token) => {
    debugger
    setUserid(user);
    setToken(token);
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
    if (token && lat && long) {

        const encodedCredentials = btoa(`${userid}:${token}`);
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
        [userid, token, lat, long]);

  debugger
  return (
    <>
        <ul>

            { !token &&
              <LoginOM getToken={getToken}/>
            }

            { token &&
              <SearchOM getCoord={getCoord}/>
            }

            { pngdata && hotelName &&
                <ImageComponent blob={pngdata} hotel={hotelName}/>
            }

            { pngdata && !hotelName &&
                <h1>Place Not Found</h1>
            }
                
        </ul>
    </>
  );
}