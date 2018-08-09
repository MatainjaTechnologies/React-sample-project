import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Grid, Paper, Divider, Button, Typography } from '@material-ui/core';
import { CheckSharp, Clear } from '@material-ui/icons';
import result from '../database/result';
import SvgProgressBar from '../svg-progress-bar';
const option_no = ["A","B","C","D","E"];
const styles = theme => ({
    sectionWithTimer: {
        padding: theme.spacing.unit * 2,
        overflow: 'auto',
        minHeight: '100px',
        height: `calc(100vh - 420px)`,
        color: theme.palette.text.secondary,
    },
    buttonWithOption: {
        padding: theme.spacing.unit * 2,
        overflow: 'auto',
        margin: '5px',
        justifyContent: 'initial',
        textAlign: 'left',
        textTransform: 'none',
        color: 'white',
        width: `calc(100% - 10px)`,
        fontSize: '14px',
    },
    timerBody: {
        width: '30px',
        height: '30px',
        border: '6px solid green',
        padding: '8px',
        borderRadius: '50%',
        textAlign: 'center',
        float: 'right',
    },
    timerBodyRed: {
        width: '30px',
        height: '30px',
        border: '6px solid red',
        padding: '8px',
        borderRadius: '50%',
        textAlign: 'center',
        float: 'right',
    },
    questionHeadeing: {
        fontSize: '15px',
        fontStyle: 'italic',
        textAlign: 'initial',
        padding: '10px',
    },
    timerText: {
        fontSize: '20px',
        lineHeight: '30px'
    },
    result: {
        position: 'absolute',
        backgroundColor: '#fff',
        height:'40px',
        width: '40px',
        borderRadius: '50%',
        right: 0,
        top:0,
        bottom: 0,
        margin: 'auto',
        marginRight: '10px',
        textAlign: 'center',
        varticalAlign: 'middle',
        opacity: 0
    },
    right: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 'auto',
        color: 'green',
    },
    wrong: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 'auto',
        color: 'red',
    }
  });
class DisplayQuizWithTimerSound extends Component {
    timer = null;
    audio = new Audio('./frontend/mp3/tick-sound.mp3');
    constructor(props){
        super(props);
        this.state = {
            cowndown: 60,
            answermsg: null,
            answered: false,
            option_id: null,
            bcColor: [],
            result: false,
            fadein: true,
        }
    }
    componentDidMount(props){
        this.timerFunction();
        this.setOptionsColor(this.props.quiz.options.length);
    }
    timerFunction = () =>{
        this.timer=setInterval(()=>{
            if(this.state.cowndown === 0){
                this.pauseAudio();
                this.clearInterval();
                this.setState({answered: true, result: true}); 
            }else{ 
                this.playAudio();
                this.setState(prevState=>({
                    randomColor: false,
                    cowndown: prevState.cowndown - 1
                }));
            }
        },1000);
    }
    clearInterval = () =>{
        clearInterval(this.timer);
    }
    componentWillReceiveProps(props){
        this.clearInterval();
        this.setOptionsColor(props.quiz.options.length);
        this.setState({
            cowndown: props.cowndown_prop,
            answermsg: null,
            answered: false,
            option_id: null,
            result: false,
            fadein: true,
        });
        this.timerFunction();
    }
    setOptionsColor = (noOfOption) => {
        let bcColor = [];
        let arr = []
        while(arr.length < noOfOption){
            var randomnumber = getRandomInt();
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        while(arr.length > 0){
            bcColor.push(getRandomColor(arr.pop()));
        }
        this.setState((prevState)=>({bcColor: bcColor}));
    }
    playAudio = () =>{
        if(this.audio)
            this.audio.play();
    }
    pauseAudio = () =>{
        if(this.audio)
            this.audio.pause();
    }
    checkAnswer = (quiz_id,option_id,option,answer) => {
        if(this.state.cowndown > 0){
            if(option === answer){
                this.setState((prevState)=>({option_id: option_id, result: true}));
                result.push({'question_id': quiz_id, answer: 'right'});
            }else{
                this.setState((prevState)=>({option_id: option_id, result: true}));
                result.push({'question_id': quiz_id, answer: 'wrong'});
            }
        }else{
            console.log('time over');
        }
        this.clearInterval();
        this.setState({answered: true}); 
    }
    componentWillUnmount(){
        this.audio = null;
        this.clearInterval();
    }
    render(){
        const { question_id, question, question_img, options, answer } = this.props.quiz;
        const { numbering, classes } = this.props;  
        const { cowndown, bcColor, answered, option_id, result} = this.state;
         
        return(
            <div style={{margin: '10px'}}>
                <Typography className={classes.questionHeadeing} variant="body2"><strong>{numbering}. </strong>{question}</Typography>
                <Divider />
                <section className={classes.sectionWithTimer}>
                    <SvgProgressBar cowndown={cowndown} />
                    {!cowndown ? <b style={{color: 'red'}}>Time Over!<br />Please Skip on Next Question.</b> : null }
                </section>
                <Grid container justify="center">
                    {
                        options.map((option,index)=>(
                            <Grid key={index} item xs={12} sm={6}>
                                <Paper component={Button}  
                                    className={classes.buttonWithOption} 
                                    style={!answered ? { backgroundColor: bcColor[index], opacity:1 }: option_id === index ? { backgroundColor: bcColor[index], opacity: 1, color: 'white' } : { backgroundColor: '#f5f5f5', color: '#a9a9a9', boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.0)', transition: 'all 0.50s ease-in'}}
                                    disabled={answered ? true : false}
                                    onClick={()=>{ if(!answered) this.checkAnswer(question_id, index, option, answer) }} 
                                >
                                    <strong>{option_no[index]}.</strong>&nbsp;{option}   
                                    
                                    <div className={classes.result} style={ result? {opacity:1, transition: 'opacity 0.4s 0.4s ease'} : styles.result}>
                                        { result ? option === answer ? <CheckSharp className={classes.right} /> : <Clear className={classes.wrong} /> : null}
                                    </div>
                                    
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        );
    }
};

DisplayQuizWithTimerSound.propTypes = {
    quiz: PropTypes.object.isRequired,
    numbering: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayQuizWithTimerSound);

const colors = [
	'#ff4000',
	'#ff8000',
	'#0040ff',
	'#4000ff',
	'#8000ff',
	'#ff00bf',
	'#ff0040',
	'#808080',
	'#cc3333',
	'#ff0000',
	'#9d2600',
	'#9d269b',
	'#3b269b',
	'#3b213b',
];

function getRandomColor(index){
    return colors[index];
}

function getRandomInt() {
    return Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0;
}