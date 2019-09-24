import React, {Component} from 'react'

export default class ProgressBar extends Component{
  
    render(){
        const styles = {
            width: this.props.score * 2 + '%'
        }
     return(
         <div className='progress-box'>
             <div className='progress-bar' style={styles}> </div>

         </div>
     )   
    }
}