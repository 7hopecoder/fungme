import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class UserLogin extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errorMsg:'',
        }
        this.onChangeEmail=this.onChangeEmail.bind(this)
        this.onChangePassword=this.onChangePassword.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
        
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
       
    }
    submitForm(e){
        e.preventDefault()
        const user={
            email:this.state.email,
            password:this.state.password
        }

        fetch('http://localhost:5000/users/login', {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(response => response.json())
        .then(msgs => {
            if(msgs.token !== undefined){
                localStorage.setItem('token',msgs.token)
                this.props.onSuccessfulLogin()
            }else{
                this.setState({
                    errorMsg:msgs.message
                })
                if(msgs.message.includes('email')){
                    this.textInput.focus()
                }
                if(msgs.message.includes('password')){
                    this.passwordInput.focus()
                }

            }
            
        })
        .catch(err => this.setState({errorMsg:"authentication failed"}))
    }
    render(){       
        const messages = this.state.errorMsg  
        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <h5>{messages}</h5>
                    <div className="form-group">
                    <input 
                        type = "text"
                        placeholder = "Email" 
                        required
                        className="form-control"
                        value = {this.state.email}
                        onChange ={this.onChangeEmail }
                        ref={(input)=>{this.textInput=input}}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type = "password"
                            placeholder = "Password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            ref={(input)=>{this.passwordInput=input}}
                            />
                    </div>
                    <div>
                    <input type="submit" value="Login" className="btn btn-primary"/>{' '}
                     <Link to="/register"><input type="button" value="Register" className="btn btn-primary"/></Link>
                    </div>
                </form>
            </div>
        )
    }

}