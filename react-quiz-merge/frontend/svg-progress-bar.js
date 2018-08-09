import React from 'react';
import './svg-progress-bar.css';

const SvgProgressBar = (props) => {
    const pct = ((props.cowndown)/60)*Math.PI*(30*2);

    return(
        <div id="cont" data-pct={props.cowndown}>
            <svg className="timer" width="76" height="76" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle" r="30" cx="40" cy="40" fill="transparent"  strokeDasharray="188.49555921538757" strokeDashoffset="0"
                    style={ props.cowndown > 15 ? {stroke: '#32CD32'} : {stroke: '#FF0000'} }
                ></circle>
                <circle className="circle" r="30" cx="40" fill="transparent" cy="40"  strokeDasharray="188.49555921538757" strokeDashoffset={pct}
                    style={ props.cowndown === 0 ? {stroke: '#FF0000'} : {stroke: '#d6d6d6'} }
                ></circle>
            </svg> 
        </div>
    );
};

export default SvgProgressBar;