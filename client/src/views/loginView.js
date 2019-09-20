import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import LoginUser from '../components/userLogin'
import {Redirect} from 'react-router-dom'

const styles={
    paper:{
        margin:'50px',
        marginTop: '100px',
        minHeight:'100px',
        padding:'50px'
    }
}

export default class Login extends Component{
    isAuthenticated(){
        const token = localStorage.getItem('token')
        return token && token.length >10
    }
    handleSuccessfulLogin(){
        window.location.reload(false)
    }
    render(){
        const isAuthenticated = this.isAuthenticated()
        return(
            <div className="text-center">
                {isAuthenticated ? <Redirect to={{pathname:'/app/game'}} /> : (
                    <Paper style={styles.paper}>
                        <h3><strong>Login To Play Snake Game</strong></h3>
                        <LoginUser onSuccessfulLogin={this.handleSuccessfulLogin.bind(this)}/>
                    </Paper>
                )}
                
            </div>
        )
    }

}