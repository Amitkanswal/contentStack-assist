import React, { Component } from 'react'
// import './AddAssist.css'
export default class AddAssist extends Component {
    // constructor(props){
    //     super(props);
    //     // this.close = this.close.bind(this)
    // }

    render() {
        console.log('inside AddAssist');
        
        return (
            <div className="addAsset">
                <div className="close"><button onClick={this.close}>X</button></div>
                
            </div>
        )
    }
}
