import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import QuizWithTimerSound from './pages/quiz-with-timer-sound';
import Quiz from './pages/quiz';
const Routerm = (props) =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/quiz1" component={Quiz} />
                <Route path="/quiz2" component={QuizWithTimerSound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routerm;