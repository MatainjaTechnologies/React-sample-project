import React from 'react';
import quiz from '../database';
import result from '../database/result';

const QuizResult = (props) =>(
    <div>
        Test Submit
        <h1>Total Number of Attemp: {result.length}</h1>
        <h1>Total Number of correct Answer: {checkRightAnswer(result)}</h1>
        <h1>Total Number of incorrect Answer: {checkWrongAnswer(result)}</h1>
        <h1>Not Attemp: {quiz.length - result.length}</h1>
        <br />
        <h1><strong>Your Score: <i>{checkRightAnswer(result)*5}</i>&nbsp; points</strong></h1>
    </div>
);

export default QuizResult;


function checkRightAnswer(array){
    let count = 0;
    array.map((result)=>{
        if(result.answer === 'right')
            count ++;
    })
    return count;
}

function checkWrongAnswer(array){
    let count = 0;
    array.map((result)=>{
        if(result.answer === 'wrong')
            count ++;
    })
    return count;
}