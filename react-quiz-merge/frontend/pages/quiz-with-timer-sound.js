import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import quiz from '../database';
import DisplayQuizWithTimerSound from '../components/display-quiz-with-timer-sound';
import { withStyles, Grid, Paper, Divider, Button, Typography } from '@material-ui/core';
import FadeIn from 'react-fade-in';
import QuizResult from '../components/quiz-result';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit*2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      overflow: 'auto'
    },
    button: {
       margin: theme.spacing.unit,
       float: 'right',
    },
    title: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: '25px',
        padding: '15px',
    }
  });
  
class QuizWithTimerSound extends Component {
    constructor(props){
        super(props);
        this.state = {
            question_no: 0,
            testSubmit: false,
        };
    }
    next = () => {
        this.setState(prevState => ({
            question_no: prevState.question_no + 1,
        }));
    }
    submit = () => {
        this.setState(()=>({ testSubmit: true }));
    }
    
    render(){
        const { question_no, testSubmit } = this.state;
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container justify="center" style={{padding: '10px'}}>
                    <Grid  item xs={12} sm={12}>
                        <Paper className={classes.paper}>  
                            <Typography className={classes.title} variant="title">Quiz Test</Typography>
                            <Divider />
                            {!testSubmit ?
                                <div>
                                    <FadeIn>
                                        <DisplayQuizWithTimerSound 
                                            quiz={quiz[question_no]} 
                                            numbering={question_no + 1} 
                                            cowndown_prop={60}
                                        />  
                                    </FadeIn>
                                    <Divider />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.button} 
                                        onClick={()=>{
                                            question_no + 1 === quiz.length ? this.submit() : this.next(); 
                                        }}
                                    >
                                        {question_no + 1 === quiz.length ? 'Submit' : 'Next' }
                                    </Button>
                                </div>
                            :
                                <div>
                                    <QuizResult />
                                    <Divider />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.button} 
                                        component={Link}
                                        to={'/'}
                                    >
                                        Finish
                                    </Button>
                                </div>
                            } 
                            
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }  
};
export default withStyles(styles)(QuizWithTimerSound);

