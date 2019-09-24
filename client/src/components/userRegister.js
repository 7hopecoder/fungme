import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'

const styles={
    paper:{
        margin:'50px',
        minHeight:'100px',
        padding:'50px'
    }
}

export default class UserRegister extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            confirmpassword:'',
            highscore:0,
            errormsg:''
        }
        this.onUserNameChange=this.onUserNameChange.bind(this)
        this.onEmailChange=this.onEmailChange.bind(this)
        this.onPasswordChange=this.onPasswordChange.bind(this)
        this.onConfirmPasswordChange=this.onConfirmPasswordChange.bind(this)
        this.onConfirmPasswordBlur=this.onConfirmPasswordBlur.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    onUserNameChange(e){
        this.setState({
            username:e.target.value
        })
    }
    onEmailChange(e){
        this.setState({
            email:e.target.value
        })
    }
    onPasswordChange(e){
        this.setState({
            password:e.target.value
        })
    }
    onConfirmPasswordChange(e){
        this.setState({
            confirmpassword:e.target.value
        })
    }
    onConfirmPasswordBlur(){
        if(this.state.password !== this.state.confirmpassword){
            this.setState({
                errormsg:'Confirm password must match Password. Type again'
            })
            this.passwordInput.focus()
        }
    }
    submitForm(e){
        e.preventDefault()
        const user={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            highscore:this.state.highscore,
            confirmpassword:this.state.confirmpassword,
        }
        
        
        fetch('http://localhost:5000/users/register',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user),
        })
        .then(response => response.json())
        .then(msgs => {
            if (msgs.userId !== undefined){
                localStorage.setItem('token',msgs.token)
                localStorage.setItem('userId',msgs.userId)
                this.props.history.push(`/app/game`)
            }else{
                this.setState({
                    errormsg:msgs.message
                })
            }
        })
        .catch(err => console.log(err))            

    }

    render(){
        const messages= this.state.errormsg
        console.log(messages)
        return(
            <div>
                <Paper style={styles.paper}>
                <form onSubmit={this.submitForm}>
                <h3>User Registration</h3>
                <h3>{messages}</h3>
                <div className="form-group">
                    <input 
                        type = "text"
                        placeholder = "User Name" 
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange={this.onUserNameChange}
                        />
                    </div>
                    <div className="form-group">
                    <input 
                        type = "text"
                        placeholder = "Email" 
                        required
                        className="form-control"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type = "password"
                            placeholder = "Password"
                            required
                            className="form-control"
                            onChange={this.onPasswordChange}                            
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type = "password"
                            placeholder = "Confirm Password"
                            required
                            className="form-control"
                            onChange={this.onConfirmPasswordChange}
                            onBlur={this.onConfirmPasswordBlur}
                            ref={(input)=>{this.passwordInput=input}}
                            />
                    </div>
                    <div>
                        <input type="submit" className="btn btn-primary"/>                    
                    </div>
                </form>
                </Paper>
            </div>
        )
    }
}