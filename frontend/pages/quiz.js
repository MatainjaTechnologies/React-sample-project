import React, { Component } from 'react';
import quiz from '../database';
import DisplayQuiz from '../components/display-quiz';
import { withStyles, Grid, Paper, Divider, Button, Typography } from '@material-ui/core';
import FadeIn from 'react-fade-in';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
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
    }
  });
  
class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            question_no: 0,
        };
    }
    next = () => {
        this.setState(prevState => ({
            question_no: prevState.question_no === quiz.length - 1 ? 0 : prevState.question_no + 1,
        }));
    }
    render(){
        const { question_no } = this.state;
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container justify="center" style={{padding: '10px'}}>
                    <Grid  item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.title} variant="title">Quiz Test</Typography>
                        </Paper>
                        <Divider />
                        <FadeIn>
                            <DisplayQuiz quiz={quiz[question_no]} numbering={question_no + 1} cowndown_prop={60}/>  
                        </FadeIn> 
                        <Divider />
                        <Paper className={classes.paper}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.next}>Next</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }  
};
export default withStyles(styles)(Quiz);