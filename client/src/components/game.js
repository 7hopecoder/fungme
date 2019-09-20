import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import '../styles/game.css'

const styles={
    paper:{
        margin:'0px',
        minHeight:'100px',
        padding:'50px'
    }
}

export default class Game extends Component{
    constructor(){
        super()
        this.state={


        }    
    }    
    render(){
        return(
            <div>
                <Paper style={styles.paper}>
                   <div className="gridarea"></div>
                </Paper>
            </div>
        )
    }
}