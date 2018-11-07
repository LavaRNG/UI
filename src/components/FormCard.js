import React, { Component} from "react";
import "../App.css";
import { Input } from 'react-materialize'

class FormCard extends Component{

  constructor(props){
    super(props)
    this.state = {
      inputVal: "",
      outputVal: ""
    }
  }

  onChange(name, event) {
    this.setState({...this.state, [name]: event.target.value})
  }

  renderButton() {
    if (this.props.buttonText !== "Request"){
      return (
        <Input label="Enter Number" className="submitForm" onChange={e => this.onChange("inputVal", e) } value={this.state.inputVal} />
      )
    } else {
      return (
        <Input label="Your number will appear here." className="submitForm" id="customer" onChange={e => this.onChange("inputVal", e) } value={this.state.outputVal} />
      )
    }
  }

  handleAction(event) {
    this.props.action(this.state.inputVal);
  }

  render(){
    return(
      <div id="formCard" className="lavaCard">
        <h4>{this.props.title}</h4>
        <hr className="cardRule"></hr>
        <div id="cardContent" className="column">
          {this.renderButton()}
          <div id="button" className="lavaCard lavaRow" onClick={this.handleAction.bind(this)}>
            <h2 id="submitText">{this.props.buttonText}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCard;
