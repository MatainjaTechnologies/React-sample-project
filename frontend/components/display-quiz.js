import React, { Component } from 'react';
import {withStyles, Grid, Paper, Divider, Button, Typography } from '@material-ui/core';
import { CheckSharp, Clear } from '@material-ui/icons';

const option_no = ["A","B","C","D","E"];
const styles = theme => ({
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperWithTimer: {
        padding: theme.spacing.unit * 2,
        overflow: 'auto',
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
        varticalAlign: 'middle'
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
class DisplayQuiz extends Component {
    timer = null;
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
    componentDidMount(){
        this.timerFunction();
        this.setOptionsColor(this.props.quiz.options.length);
    }
    timerFunction = () =>{
        this.timer=setInterval(()=>{
            if(this.state.cowndown === 0){
                this.setState({answered: true, result: true}); 
                this.clearInterval();
            }else{
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
    checkAnswer = (option_id,option,answer) => {
        if(this.state.cowndown > 0){
            if(option === answer){
                this.setState((prevState)=>({option_id: option_id, result: true}));
            }else{
                this.setState((prevState)=>({option_id: option_id, result: true}));
            }
        }else{
            console.log('time over');
        }
        this.clearInterval();
        this.setState({answered: true}); 
    }
    render(){
        const { question_id, question, question_img, options, answer } = this.props.quiz;
        const { numbering, classes } = this.props;  
        const { cowndown, bcColor, answered, option_id, result} = this.state; 
        return(
            <div> 
                
                <Paper className={classes.paper}>
                    <Typography className={classes.questionHeadeing} variant="body2"><strong>{numbering}. </strong>{question}</Typography>
                </Paper>
                <Divider />
                <Paper className={classes.paperWithTimer}>
                    <div className={cowndown > 15 ? classes.timerBody : classes.timerBodyRed}>
                        <strong className={classes.timerText}>{cowndown}</strong>
                    </div>
                    {!cowndown ? <b style={{color: 'red'}}>Time Over!<br />Please Skip on Next Question.</b> : null }
                </Paper>
                <Paper className={classes.paperWithTimer}>
                    <Grid container justify="center">
                        {
                            options.map((option,index)=>(
                                <Grid key={index} item xs={12} sm={6}>
                                    <Paper component={Button}  
                                        className={classes.buttonWithOption} 
                                        style={!answered ? { backgroundColor: bcColor[index], opacity:1 }: option_id === index ? { backgroundColor: bcColor[index], opacity: 1, color: 'white' } : { backgroundColor: '#f5f5f5', color: '#a9a9a9', boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.0)'}}
                                        disabled={answered ? true : false}
                                        onClick={()=>{ if(!answered) this.checkAnswer(index,option,answer) }} 
                                    >
                                        
                                        <strong>{option_no[index]}.</strong>&nbsp;{option}
                                        
                                        {result ? 
                                        <div className={classes.result}>
                                            { option === answer ? <CheckSharp className={classes.right} /> : <Clear className={classes.wrong} />}
                                        </div>
                                        : null }
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>
               
            </div>
        );
    }
};

export default withStyles(styles)(DisplayQuiz);

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