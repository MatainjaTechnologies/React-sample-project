import React from 'react';
import { Link } from 'react-router-dom';
const Home = (props) =>(
    <div>
        <h1>Home</h1>
        <p><Link to={'/quiz1'}>Play Quiz1</Link></p>
        <p><Link to={'/quiz2'}>Play Quiz2</Link></p>
    </div>
);

export default Home;