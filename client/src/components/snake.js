import React, {Component} from 'react';
import  '../styles/game.css';

class Snake extends Component{   
   
    render(){       
        const snakeLocation={
            left:`${this.props.body[0]}%`,
            top: `${this.props.body[1]}%`
        }                       
        return(            
            <div className="snakeframe" style={snakeLocation}>                   
            </div>         
        )
    }
}

export default Snake