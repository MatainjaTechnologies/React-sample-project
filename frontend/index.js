import React from 'react';
import { render } from 'react-dom';
import Routerm from './routerm';
import SvgProgressBar from './svg-progress-bar';
const Index = () => {
    return(
         <Routerm />
        //<SvgProgressBar />
     );
};

render(<Index />,document.getElementById('index'));