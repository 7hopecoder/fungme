import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import '../styles/game.css';
import Prey from './prey';
import Snake from './snake';
import ProgressBar from './progressbar'


const styles={
    paper:{        
        minHeight:'100px',
        padding:'10px'
    }
}

const NORTH = [0, -3]
const SOUTH = [0, 3]
const EAST = [3, 0]
const WEST = [-3, 0]

var now;
var then = Date.now()
var delta
var fps =30
let isGameOver = false
let stopId


const getRandomPrey = () => {
    let min = 3;
    let max = 96;
    let x =  Math.floor((Math.random() * (max-min+1)+ min)/3)*3;
    let y =  Math.floor((Math.random() * (max-min+1)+ min)/3)*3;

    return [x, y];
}

export default class Game extends Component{
    constructor(){
        super()
        this.state={
            snakeBody:[[9,51],[12,51],[15,51]],
            preyLocation:getRandomPrey(),
            score:0,
            direction:'',
            interval: 5000 / fps,
            userName:'',
            highscore:0,
            
        }    
        this.handleSnakemove=this.handleSnakemove.bind(this)
        this.getDirection=this.getDirection.bind(this)
    }    

    getInitialState = () => {
        this.setState({
            snakeBody:[[9,51],[12,51],[15,51]],
            preyLocation:getRandomPrey(),
            score:0,
        })
        window.location.reload(false)
    }
    componentDidMount(){  
        let userId = localStorage.getItem('userId')
        fetch('http://localhost:5000/users/'+userId,{
            method:'get',
            headers:{
                'Content-Type': 'application/json'
            },
            
        })
        .then(response => response.json())
        .then(msgs => {            
            if (msgs.userId !== ''){
                this.setState({
                    userName:msgs.username,
                    highscore:msgs.highscore
                })
            }
        })
        .catch(err => console.log(err))   
        document.addEventListener('keydown',this.getDirection,false)          
    }

    componentDidUpdate(){        
        this.handleCatchPrey()
        this.handleSnakeCrash()       
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.getDirection, false)
    }

    getDirection = (e) =>{
        isGameOver =false
        e.preventDefault()
        switch(e.which){
            case 37:                
                if(this.state.direction !== 'EAST'){
                    this.setState({direction:'WEST'})                
                }                
                break;
            case 38:
                if(this.state.direction !== 'SOUTH'){
                    this.setState({direction:'NORTH'})
                    this.handleSnakemove()
                }                                  
                break;
            case 39:
                if(this.state.direction !== 'WEST'){
                    this.setState({direction:'EAST'})         
                    this.handleSnakemove()       
                }                
                break;
            case 40:
                if(this.state.direction !== 'NORTH'){
                    this.setState({direction:'SOUTH'})
                    this.handleSnakemove()               
                }                 
                break;
            default:           
                
        }
    }
    handleSnakemove=() =>{
        stopId = requestAnimationFrame(this.handleSnakemove)

        now = Date.now()
        delta = now - then
        if(!isGameOver){
            if (delta > this.state.interval){
                then = now - (delta % this.state.interval)
    
                let snakeBodyParts = [...this.state.snakeBody]     
                let snakeHead = snakeBodyParts[snakeBodyParts.length -1]
                switch(this.state.direction){
                    case 'WEST':
                        snakeHead = [(snakeHead[0] + WEST[0])< 0 ? 96 : (snakeHead[0] + WEST[0]), snakeHead[1]+ WEST[1]]
                        break;
                    case 'NORTH':
                        snakeHead = [snakeHead[0] + NORTH[0], (snakeHead[1]+ NORTH[1])< 0 ? 96 : (snakeHead[1]+ NORTH[1]) ]
                        break;
                    case 'EAST':
                        snakeHead = [(snakeHead[0] + EAST[0]) % 99, snakeHead[1]+ EAST[1]]
                        break;
                    case 'SOUTH':
                        snakeHead = [snakeHead[0] + SOUTH[0], (snakeHead[1]+ SOUTH[1])% 99]
                        break;
                    default:
                }
    
                snakeBodyParts.push(snakeHead)
                snakeBodyParts.shift(snakeHead[0])
                this.setState({
                    snakeBody:snakeBodyParts
                })
            }
        }else{
            cancelAnimationFrame(stopId)
        }

    }

    handleCatchPrey = () => {
        let snakeBodyParts = [...this.state.snakeBody]     
        let snakeHead = snakeBodyParts[snakeBodyParts.length -1]
        let prey = this.state.preyLocation          
        
        if(snakeHead[0]===prey[0] && snakeHead[1]===prey[1]){
            snakeBodyParts.unshift([])
            this.setState({
              snakeBody:snakeBodyParts,
              score: this.state.score +1,
              preyLocation: getRandomPrey()
            })               
        }
    }

    handleSnakeCrash = () => {        
        let snakeBodyParts = [...this.state.snakeBody]     
        let snakeHead = snakeBodyParts[snakeBodyParts.length -1]
        snakeBodyParts.pop()
        console.log(snakeHead[0])
        console.log(snakeBodyParts[0])
        let userId = localStorage.getItem('userId')
        const highscore ={
            highscore:this.state.score
        }
        for(let i = 0; i<snakeBodyParts.length-1; i++){
            if(snakeHead[0]===snakeBodyParts[i][0] && snakeHead[1]===snakeBodyParts[i][1]){
                isGameOver = true  
                fetch('http://localhost:5000/users/update/'+userId,{
                    method:'post',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(highscore)       
                })
                .then(response => response.json())
                .then(msgs => console.log(msgs.message))
                .catch(err => console.log(err))   

                alert('Oops! game over')
                this.getInitialState()                 
                break
            }
        }       
            
    }

    render(){
        const snakeBodyParts=this.state.snakeBody.map((bodyPart, i) => <Snake key = {i} body={bodyPart}/>)
       
        return(            
            <div>
                <Paper style={styles.paper}>
                    <div className="center"> 
                        <div>
                            <span>Welcome! <strong>{this.state.userName}</strong> </span>
                            {' '}<span>Highscore: <strong>{this.state.highscore}</strong></span>
                        </div>
                        <div className="gridarea"> 
                            {snakeBodyParts}
                            <Prey prey={this.state.preyLocation} score={this.state.score}/>
                        </div>           
                        <div className="result">    
                            <div className="score"><h4>Score: <strong>{this.state.score}</strong></h4></div>
                            <ProgressBar score={this.state.score}/>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}