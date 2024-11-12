// import data from "./data.json"
import React, { useState, useEffect } from 'react';
import Content from './Content';

function App() {
 const [data, setData] = useState([]);

 useEffect(() => {
     fetch('/data.json') // Access the file by its URL
         .then((response) => response.json())
         .then((data) => {
             setData(data); // Store the data in the component's state
         })
         .catch((error) => console.error(error));
 }, []);

 return (
     <div className="App">
         <Content data={data} />
         {/* {data.map((item, index) => (
             <div className="card" key={index}>
                 <div>{item.номер}</div>
                 <div>{item.адрес}</div>
                 <div>{item.клиент}</div>
             <hr/>
             </div>
         ))} */}
     </div>
 );
}

export default App;
