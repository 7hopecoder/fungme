import React, {Component} from 'react'

class Prey extends Component{ 
    render(){
        console.log('from prey:')
        console.log(this.props)
        const preyLocation={
            left:`${this.props.prey[0]}%`,
            top: `${this.props.prey[1]}%`
        }
        return(          
            <div>  
                <div className="prey" style={preyLocation}>                    
                </div>      
            </div>      
        )    
    }

}

export default Prey