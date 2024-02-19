import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5555/');
        const jsonData = await response.json();
        setData(jsonData.message);
        console.log(jsonData.message)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      {!data ? <p>Connecting to server...</p> : data}
      {/* <h6>Hello {}</h6> */}
    </div>
  );
};

export default Home