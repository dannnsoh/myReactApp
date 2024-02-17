import React, { useState } from 'react';

let newHost = `https://www.onemap.gov.sg`; // replace with your host
let baseUrl = `${newHost}/api/common/elastic/search`;

function countWords(str) {
    const words = str.split(' ');
    const wordCount = {};
    for (let word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1;
    }
    return wordCount;
}

function sumMatches(inputTokens, sTokens) {
    let matches = 0;
    for (let token in inputTokens) {
        if (sTokens[token]) {
            matches += Math.min(inputTokens[token], sTokens[token]);
        }
    }
    return matches;
}

function mostMatchingString(inputString, stringList) {
    const inputTokens = countWords(inputString);
    let maxMatches = 0;
    let mostMatchingString = null;
    let mostMatchingTokens = null;
    let index = 0;

    for (let idx = 0; idx < stringList.length; idx++) {
        const s = stringList[idx];
        const sTokens = countWords(s);
        const matches = sumMatches(inputTokens, sTokens);
        if (mostMatchingString === null || (matches >= maxMatches && Object.keys(sTokens).length < Object.keys(mostMatchingTokens).length)) {
            maxMatches = matches;
            mostMatchingString = s;
            mostMatchingTokens = sTokens;
            index = idx;
        }
    }

    return [mostMatchingString, index];
}

export const SearchOM = ({getCoord}) => {

    const [hotelName, setHotelName] = useState('');

    const handleSubmit = (event) => {
        
        event.preventDefault();

        async function fetchData() {
            let queryResults = [];
            let i = 1;
            let keepFetching = true;
        
            while (keepFetching) {
                let url = `${baseUrl}?searchVal=${hotelName}&returnGeom=Y&getAddrDetails=Y&pageNum=${i}`;
                const response = await fetch(url);
                const data = await response.json();
                debugger
                if (data['results'].length === 0) {
                    keepFetching = false;
                } else {
                    i += 1;
                    for (let result of data['results']) {
                        queryResults.push(result);
                    }
                }
            }
        
            return queryResults;
        }
        
        fetchData().then(queryResults => {
            console.log(queryResults); // Logs the query results to the console
            debugger
            console.log(queryResults.length);
            if (queryResults.length === 0) {
                let coord = {'lat': 0, 'long': 0, 'hotelName': null};
                getCoord(coord);
                return;
            }
            let queryResultNames = queryResults.map(result => result['SEARCHVAL']);
            let [mostMatch, index] = mostMatchingString(hotelName, queryResultNames);
            
            console.log(mostMatch);
            console.log(queryResults[index]);
            console.log(queryResults[index]['LATITUDE'], queryResults[index]['LONGITUDE']);
            
            let lat = queryResults[index]['LATITUDE'];
            let long = queryResults[index]['LONGITUDE'];
            let coord = {'lat': lat, 'long': long, 'hotelName': mostMatch};
            getCoord(coord)});
        

    }
    
    return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="Search by Hotel" />
        <button type="submit">Search</button>
    </form>)
}
